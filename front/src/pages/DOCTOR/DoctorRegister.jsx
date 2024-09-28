import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Button from "../../components/Button";
import axios from "axios";
import Loader from "../../components/Loader";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    position: "",
    password: "",
    available: false,
    email: "",
    doctorImage: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const imageRef = useRef();
  const navigate = useNavigate();

  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const positions = ["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Cardiologist", "Neurologist", "Gastroenterologist"];

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];
    
    if (file && validTypes.includes(file.type)) {
      setProfileImage(file);
      uploadImage();
    } else {
      toast.error("Please select a valid image file (JPEG, PNG, SVG, JPG)");
    }
  };

  const uploadImage = async () => {
    if (!profileImage) {
      toast.error("Please select an image to upload");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("upload_preset", uploadPreset);

      const response = await axios.post("https://api.cloudinary.com/v1_1/dv5tddhyx/image/upload", formData);
      setFormData(prev => ({ ...prev, doctorImage: response.data.secure_url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(`Error uploading image: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const requiredFields = ['username', 'email', 'position', 'password'];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5750/doctor/createDoctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      toast.success(data.message);
      setTimeout(() => navigate("/doctor/login"), 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full my-auto mt-12">
      <Toaster position="top-left" />
      <form onSubmit={handleRegister} className="shadow-xl rounded-lg flex flex-col gap-y-5 items-start p-4">
        <h2 className="text-2xl mx-auto font-bold uppercase tracking-wide">Register as a Doctor</h2>

        {["username", "email", "password"].map(field => (
          <div key={field} className="w-96 flex flex-col gap-2 p-2">
            <label className="mx-2 font-bold capitalize">{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field === "email" ? "someone@example.com" : `Enter your ${field}`}
              className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]"
            />
          </div>
        ))}

        <select name="" id="" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })}  className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]">
          <option value="Select a position" disabled >Select a position</option>
          {
            positions.map((item,index)=>(<option value={item} key={index}>{item}</option>))
          }
        </select>

        <div className="flex justify-between items-center w-full">
          <div className="w-fit flex items-center gap-2 p-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-card"
            />
            <label className="font-bold">Available</label>
          </div>
          <button type="button" onClick={() => imageRef.current?.click()} className="text-sm bg-hover p-3 rounded-sm hover:rounded-lg text-white">
            Select Image
          </button>
        </div>

        {uploadingImage && <Loader text={"Uploading image..."}></Loader> }

        <div className="w-fit flex flex-col gap-2 p-2">
          <label className="mx-2 font-bold">Doctor Image URL</label>
          <input
            type="file"
            ref={imageRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <input
            type="text"
            value={formData.doctorImage}
            readOnly
            placeholder="Image URL will appear here"
            className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]"
          />
        </div>

        <Link to="/doctor/login" className="text-card">
          <span className="mx-2 text-black">Already have an account?</span>Login
        </Link>
        <Button
          text={loading ? "Processing..." : "Register Doctor"}
          clickFunction={handleRegister}
          hoverBG="black"
          hoverTEXT="white"
        />

        {loading && (
          <div className="flex justify-center items-center bg-card text-white space-x-2">
            <Loader text={"Register user. Please wait..."}></Loader>
          </div>
        )}
      </form>
    </div>
  );
};

export default DoctorRegister;
