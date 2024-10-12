import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button"
import { ImSpinner6 } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from 'axios'
import toast,{ Toaster } from "react-hot-toast";

const Profile = () => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const imageRef = useRef(null);
    const patientUser = useSelector((state) => state.patientData.value || {});

    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;

    const [formData, setFormData] = useState({
      name: patientUser.username || "Guest",
      email: patientUser.email || "",
      phone: "+254700000000",
      address: "Address",
      gender: "Select Gender",
      dateOfBirth: null,
      profileImage: ""
    });

    const maxDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (patientUser) {
            setFormData((prev) => ({
                ...prev,
                name: patientUser?.username || "Guest",
                email: patientUser?.email || null,
                phone: patientUser?.phone || null,
                address: patientUser?.address || null,
                gender: patientUser?.gender || null,
                dateOfBirth: patientUser?.dateOfBirth || null,
                userImage: patientUser?.profileImage || ""
            }));
        }
    }, [patientUser]);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/svg+xml" || file.type === "image/jpg")) {
        setProfileImage(file);
        setPreviewImage(URL.createObjectURL(file));
      } else {
        toast.error("Please select a valid image file (JPEG, PNG, SVG, JPG)");
      }
    };

    const handleClick = () => {
      if (imageRef.current) {
        imageRef.current.click();
      }
    };

    const uploadImage = async (e) => {
      e.preventDefault();

      if (!profileImage) {
        toast.error("Please select an image to upload");
        return;
      }

      setImageUploadLoading(true);

      try {
        const form_Data = new FormData();
        form_Data.append("file", profileImage);
        form_Data.append("upload_preset", upload_preset);

        const response = await axios.post("https://api.cloudinary.com/v1_1/dv5tddhyx/image/upload", form_Data);
        const imageURL = response.data.secure_url;

        setProfileImage(imageURL);
        // setPreviewImage(null); // Reset the preview
        setImageUploadLoading(false);
        toast.success(`Image uploaded successfully`);
        console.log(imageURL);
      } catch (error) {
        toast.error("Error uploading image:", error.message);
        setImageUploadLoading(false);
      }finally{
        setImageUploadLoading(false);
      }
    };

    const uploadData = async (e) => {
      e.preventDefault();
      setEdit(false);

      const updatedData = {
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        userImage: profileImage, 
        gender: formData.gender,
      };

      try {
        const response = await fetch(`http://localhost:5750/api/patient/updatePatientById/${patientUser.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          alert("Profile updated successfully");
        }
      } catch (error) {
        console.log("Error updating profile:", error.message);
      }
    };

  useEffect(() => {
  const fetchPatientData = async () => {
    try {
      const response = await fetch(`http://localhost:5750/api/patient/findById/${patientUser.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient data');
      }
      const data = await response.json();
      console.log(data);
      setFormData({
        ...formData,
        name: data.user.username || "Guest",
        email: data.user.email || "",
        phone: data.user.phone || "+254700000000",
        address: data.user.address || "Address",
        gender: data.user.gender || "Select Gender",
        dateOfBirth: data.user.dateOfBirth || null,
        profileImage: data.user.userImage || ""
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (patientUser.id) {
    fetchPatientData();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [patientUser.id]);

const backToHome = (e) => {
  e.preventDefault();
  navigate('/')
}

const bookDoctor = (e)=>{
  e.preventDefault();
  navigate('/booking/doctor');
}

const manageBookings = (e)=>{
  e.preventDefault();
  navigate("/patient/managePersonalBookings");
}


    return (
      <div className="flex justify-evenly m-8 relative">
        <Toaster position="top-left"></Toaster>
        <div className="card flex flex-col gap-5 rounded-lg py-4 shadow-lg p-3">
          <img src={formData.profileImage || ""} alt="Click to Add image" className="size-20 rounded-full border m-auto cursor-pointer" />
          <input type="file" ref={imageRef} className="hidden" onChange={handleImageChange} />
          <p className="text-lg font-medium uppercase tracking-wider">{patientUser?.username || "Guest"}</p>
          <hr />
          <div className="contactInfo flex flex-col gap-5">
            <h1 className="underline font-medium text-lg">CONTACT INFORMATION</h1>
            <div className="grid grid-cols-2 gap-2">
              <p>Email</p>
              <p>{patientUser.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Phone Number</p>
              <p>{formData.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Address</p>
              <p>{formData.address}</p>
            </div>
          </div>
          <div className="basicInfo flex flex-col gap-5">
            <h1 className="underline font-medium text-lg">BASIC INFORMATION</h1>
            <div className="grid grid-cols-2 gap-2">
              <p>Gender</p>
              <p>{formData.gender === "Male"?"Male":"Female"}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Birthday</p>
              <p>{formData.dateOfBirth}</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button text={"Edit Information"} clickFunction={() => setEdit(!edit)} />
          </div>
        </div>

        <div className="flex gap-x-5 h-fit w-fit items-start p-5 justify-start">
          <Button clickFunction={manageBookings} text={"Manage Appointments"}></Button>
          <Button clickFunction={bookDoctor} text={"Book Appointment"}></Button>
          <Button clickFunction={backToHome} text={"Back to Home"}></Button>
        </div>

        {edit && (
          <div className="card absolute top-5 right-12 flex flex-col gap-5 rounded-lg py-4 shadow-lg p-3">
            <h1 className="font-medium text-lg text-center">EDIT YOUR DETAILS HERE</h1>
            <hr />
            <img
              src={previewImage}
              alt="Profile"
              className="size-16 rounded-full mx-auto border object-cover cursor-pointer"
              onClick={handleClick}
            />
            {imageUploadLoading && <div><p>Uploading Image</p><ImSpinner6 className="animate-spin text-lg" /></div>}
            <div className="flex justify-between p-2">
              <button onClick={handleClick} className="text-sm bg-green-500 text-white p-2 rounded">Add Image</button>
              <button onClick={uploadImage} className="text-sm bg-blue-500 text-white p-2 rounded">Upload Image</button>
            </div>
            <div className="contactInfo flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-2">
                <p>Email</p>
                <input type="email" name="email" value={formData.email} className="border p-1" readOnly />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p>Phone Number</p>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border p-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p>Address</p>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="border p-1 outline-1 outline-hover"
                  autoSave="off"
                  autoComplete="off"

                />
              </div>
            </div>
            <div className="basicInfo flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-2">
                <p>Gender</p>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="border p-1"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p>Birthday</p>
                <input
                  type="date"
                  name="birthday"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="border p-1"
                  max={maxDate}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button text={"Submit Information"} clickFunction={uploadData} />
            </div>
          </div>
        )}
      </div>
    )
}

export default Profile
