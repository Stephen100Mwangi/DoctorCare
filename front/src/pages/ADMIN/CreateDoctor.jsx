import { useState } from "react"
import Button from "../../components/Button"
import toast, { Toaster } from 'react-hot-toast'
import { FaSpinner } from "react-icons/fa6"

const CreateDoctor = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("Null");
    const [available, setAvailability] = useState(false);

    const HandleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !position || available === null) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5750/doctor/createDoctor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, available, position })
            });

            const data = await response.json(); // Add await here
            if (!response.ok) {
                toast.error(data.message || "Doctor creation failed");
                return;
            } else {
                toast.success("Doctor created successfully");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("An error occurred. Please try again later");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center w-full my-auto mt-12">
            <form onSubmit={HandleRegister} className="shadow-xl flex justify-center flex-col border-[.5px] rounded-lg gap-y-5 items-center p-4">
                <Toaster position="top-left"></Toaster>
                <div className="w-fit flex flex-col gap-2 p-2">
                    <label className="mx-2 font-bold">Username</label>
                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" name="username" placeholder="username" className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]" />
                </div>
                <div className="w-fit flex flex-col gap-2 p-2">
                    <label className="mx-2 font-bold">Email</label>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" placeholder="someone@gmail.com" className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]" />
                </div>
                <div className="w-fit flex flex-col gap-2 p-2">
                    <label className="mx-2 font-bold">Position</label>
                    <select value={position} onChange={(e) => setPosition(e.target.value)} className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]">
                        <option value="">Select Position</option> {/* Add a default value */}
                        <option value="General Physician">General Physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                        <option value="Neurologist">Neurologist</option>
                    </select>
                </div>
                <div className="w-fit flex flex-col gap-2 p-2">
                    <label className="mx-2 font-bold">Availability</label>
                    <select value={available} onChange={(e) => setAvailability(e.target.value === "true")} className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]">
                        <option value="">Select Availability</option> {/* Add a default value */}
                        <option value={true}>Available</option>
                        <option value={false}>Unavailable</option>
                    </select>
                </div>
                {
                    loading && <div className="flex justify-center bg-card items-center space-x-2 text-white"><p>Loading</p><FaSpinner className="animate-spin"></FaSpinner></div>
                }
                <Button clickFunction={HandleRegister} text={"Create doctor"}></Button>
            </form>
        </div>
    )
}

export default CreateDoctor
