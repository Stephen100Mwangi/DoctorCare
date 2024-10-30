import { useState } from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import Select from "react-select";
import Calendar from "react-calendar";

const Patient_Register = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const localUrl = import.meta.env.VITE_LOCAL_URL;
  const apiURL = import.meta.env.VITE_API_URL;
  const baseUrl = localUrl || apiURL;

  const postalAddresses = [
    {
      value: "00100",
      label: "Kenya Postal Corporation, P.O. Box 34567, Nairobi, 00100",
    },
    {
      value: "00100",
      label: "Nairobi Central Post Office, P.O. Box 30050, Nairobi, 00100",
    },
    {
      value: "00100",
      label: "University of Nairobi, P.O. Box 30197, Nairobi, 00100",
    },
    {
      value: "20100",
      label: "Nakuru County Government, P.O. Box 2870, Nakuru, 20100",
    },
    {
      value: "20100",
      label: "Nakuru Post Office, P.O. Box 20100, Nakuru, 20100",
    },
    {
      value: "30100",
      label: "Eldoret Post Office, P.O. Box 112, Eldoret, 30100",
    },
    {
      value: "30100",
      label: "University of Eldoret, P.O. Box 1125, Eldoret, 30100",
    },
    {
      value: "40100",
      label: "Kisumu Post Office, P.O. Box 40100, Kisumu, 40100",
    },
    { value: "40105", label: "Maseno University, P.O. Box 333, Maseno, 40105" },
    { value: "60200", label: "Meru Post Office, P.O. Box 10, Meru, 60200" },
    {
      value: "60200",
      label:
        "Meru University of Science and Technology, P.O. Box 972, Meru, 60200",
    },
    {
      value: "80100",
      label: "Mombasa County Government, P.O. Box 10400, Mombasa, 80100",
    },
    {
      value: "80100",
      label: "Mombasa Post Office, P.O. Box 80300, Mombasa, 80100",
    },
    { value: "90200", label: "Kitui Post Office, P.O. Box 100, Kitui, 90200" },
    {
      value: "90100",
      label: "Machakos Post Office, P.O. Box 333, Machakos, 90100",
    },
    {
      value: "20200",
      label: "Kericho Post Office, P.O. Box 100, Kericho, 20200",
    },
    { value: "10300", label: "Nyeri Post Office, P.O. Box 10, Nyeri, 10100" },
    {
      value: "10100",
      label: "Nyeri County Government, P.O. Box 90, Nyeri, 10100",
    },
  ];
  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const HandleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordStrong = passwordRegex.test(password);

    if (!passwordStrong) {
      toast.error(
        "Password must contain at least 8 characters with a lowercase,uppercase,special character and a number"
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password confirmation must match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/patient/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = response.json();
      if (!response.ok) {
        toast.error(data.message || "User creation failed");
        return;
      } else {
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/login/patient");
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred.Please try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center w-full my-auto mt-12">
      <form
        onSubmit={HandleRegister}
        className="shadow-xl flex justify-center flex-col border-[.5px] rounded-lg gap-y-5 items-center p-4"
      >
        <h1 className="uppercase text-2xl font-bold tracking-widest break-words text-black">
          Register as <span className="text-hover">Visitor</span>
        </h1>
        <Toaster position="top-left" />
        <div className="w-fit flex flex-col gap-2 p-2">
          <label className="mx-2 font-bold">Username</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="username"
            className="p-2 px-4 outline-card border focus:outline focus:outline-card w-full sm:w-[300px]"
          />
        </div>
        <div className="w-fit flex flex-col gap-2 p-2">
          <label className="mx-2 font-bold">Email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="someone@gmail.com"
            className="p-2 px-4 outline-card border focus:outline focus:outline-card w-full sm:w-[300px]"
          />
        </div>
        <div className="w-fit flex flex-col gap-2 p-2">
          <label className="mx-2 font-bold">Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="********"
            className="p-2 px-4 flex-grow outline-card border focus:outline focus:outline-card w-full sm:w-[300px]"
          />
        </div>
        <div className="w-fit flex flex-col gap-2 p-2">
          <label className="mx-2 font-bold">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
            name="confirmPassword"
            placeholder="********"
            className="p-2 px-4 outline-card border focus:outline focus:outline-card w-full sm:w-[300px]"
          />
        </div>
        <div className="w-fit flex flex-col gap-2 p-2">
          <label className="mx-2 font-bold">Phone Number</label>
          <div className="flex gap-2">
            <input
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="p-2 px-4 border outline-card sm:w-[100px] w-full"
              placeholder="Country Code"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="p-2 px-4 border outline-card sm:w-[200px] w-full"
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="w-fit flex flex-col gap--y-4 p-4">
          <button
            onClick={() => setShowCalendar((prev) => !prev)}
            className="p-2 px-4 w-full border focus:outline focus:outline-card sm:w-[300px]"
          >
            Select Date of Birth
          </button>
          {showCalendar && (
            <Calendar
              className={
                "rounded-md p-3 shadow-sm m-2 bg-hover h-fit w-[500px]"
              }
            />
          )}
        </div>
        <Select
          options={gender}
          className="w-full sm:w-[300px]"
          placeholder="Select your gender"
        />
        <Select
          options={postalAddresses}
          className="w-full sm:w-[300px]"
          placeholder="Select your postal address"
        />
        {loading ? (
          <div className="animate-spin text-center">
            <FaSpinner />
          </div>
        ) : (
          <Button type="submit" text="Register" />
        )}
        <p className="text-center mx-2">
          Already have an account?{" "}
          <Link to="/login/patient" className="text-hover">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Patient_Register;
