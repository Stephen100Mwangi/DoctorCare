import Button from "../../components/Button"
import { Link } from "react-router-dom"
import { loginDoctor } from "../../features/doctor/DoctorSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import toast,{Toaster} from 'react-hot-toast'
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"

const Doctor_Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const HandleLogin = async(e)=>{
    e.preventDefault();
    if (!email) {
      toast.error("Email field is required")
    }
    if (!password) {
      toast.error("Email field is required")
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5750/doctor/loginDoctor",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message)
      setLoading(false)
    }

    // toast.success("User authentication successful")
    const user = data.user;

    if (user) {
      dispatch(loginDoctor({ email: user.email, username: user.username, id: user.id,isLoggedIn:true }));
      toast.success(data.message + " Login Successful.");
      setTimeout(() => {
        navigate("/doctor/personalPage")
      }, 2000);
    }
      
    } catch (error) {
      console.log("Error logging in doctor",error.message);      
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
    
  }
  return (
    <div className="flex justify-center items-center w-full my-auto mt-12">
      <Toaster position="top-left"></Toaster>
        <form onSubmit={HandleLogin} className="shadow-xl rounded-lg flex justify-center flex-col gap-y-5 items-center p-4">
            <h1 className="uppercase text-2xl font-bold tracking-widest break-words text-black">Login as <span className="text-hover">Doctor</span></h1>
            <div className="w-fit flex flex-col gap-2 p-2">
                <label className="mx-2 font-bold">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="" placeholder="someone@gmail.com" className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]"/>
            </div>
            <div className="w-fit flex flex-col gap-2 p-2">
                <label className="mx-2 font-bold">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="username" id="" placeholder="********" className="p-2 px-4 outline-card border focus:outline focus:outline-card sm:w-80 w-[300px]"/>
            </div>
            
            <Link to={"/doctor/register"} className="text-card"><span className="mx-2 text-black">New Here?</span>Create an account</Link>
            <Link className="text-red-500">Forgot Password</Link>
            <Button text={loading?"Processing...":"Login Doctor"} clickFunction={HandleLogin}></Button>

            {
              loading && <div className="flex justify-center items-center bg-card text-white space-x-2"><p className="text-white">Loading...</p><FaSpinner className="animate-spin"></FaSpinner></div>
            }
        </form>
    </div>
  )
}

export default Doctor_Login
