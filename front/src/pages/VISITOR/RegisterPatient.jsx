import { useState } from "react"
import Button from "../../components/Button"
import { Link, useNavigate } from "react-router-dom"
import toast, {Toaster} from 'react-hot-toast'
import { FaSpinner } from "react-icons/fa6"

const Patient_Register = () => {

    const [loading,setLoading] = useState(false);
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const navigate = useNavigate();

    const HandleRegister = async (e)=>{
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const passwordStrong = passwordRegex.test (password);

        if (!passwordStrong){
            toast.error("Password must contain at least 8 characters with a lowercase,uppercase,special character and a number")
            return
        }

        if (password !== confirmPassword) {
            toast.error("Password confirmation must match")
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5750/patient/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username,email,password,confirmPassword})
        })

        const data = response.json();
        if (!response.ok) {
           toast.error(data.message || "User creation failed") 
           return
        }else{
            toast.success("User created successfully")
            setTimeout(() => {
            navigate("/login/visitor")
            }, 2000);

        }
        } catch (error) {
            console.log(error.message);            
            toast.error("An error occurred.Please try again later")
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className="flex justify-center items-center w-full my-auto mt-12">
        <form onSubmit={HandleRegister} className="shadow-xl flex justify-center flex-col border-[.5px] rounded-lg gap-y-5 items-center p-4">
             <h1 className="uppercase text-2xl font-bold tracking-widest break-words text-black">Register as <span className="text-hover">Visitor</span></h1>
            <Toaster position="top-left"></Toaster>
            <div className="w-fit flex flex-col gap-2 p-2">
                <label className="mx-2 font-bold">Username</label>
                <input value={username} onChange={(e)=>{setUsername(e.target.value)}}  type="text" name="username" placeholder="username" className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]"/>
            </div>
            <div className="w-fit flex flex-col gap-2 p-2">
                <label className="mx-2 font-bold">Email</label>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}}  type="email" name="email" placeholder="someone@gmail.com" className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]"/>
            </div>
            <div className="w-fit flex flex-col gap-2 p-2">
                <label className="mx-2 font-bold">Password</label>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name="username" placeholder="********" className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]"/>
            </div>
            <div className="w-fit flex flex-col gap-2 p-2">
                <label className="mx-2 font-bold">Confirm Password</label>
                <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" name="username" placeholder="********" className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]"/>
            </div>
            {
              loading && <div className="flex justify-center p-2 bg-card items-center space-x-2 text-white"><p>Loading</p><FaSpinner className="animate-spin"></FaSpinner></div>
            }
            <Link to={"/login/visitor"} className="text-card"><span className="mx-2 text-black">Already have an account</span>Login Here</Link>
            <Button clickFunction={HandleRegister} text={"Create account"}></Button>
        </form>
    </div>
  )
}

export default Patient_Register
