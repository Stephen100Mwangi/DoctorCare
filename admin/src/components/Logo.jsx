import { PiMicroscopeFill } from "react-icons/pi";
import { GiMicroscopeLens } from "react-icons/gi";
import {Link} from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="flex items-center justify-center text-3xl tracking-tighter">
        <div className="text-card flex items-center justify-center text-3xl mr-[2px] tracking-tighter">
            <PiMicroscopeFill className="font-bold text-3xl -mr-1"></PiMicroscopeFill>
            <div>o</div>
            <span>c</span>
        </div>
      
      <div className="flex items-baseline justify-center tracking-tighter">
        <div className="text-3xl tracking-tighter">C</div>
        <GiMicroscopeLens className="text-lg text-card font-black"></GiMicroscopeLens>
        <div className="text-3xl tracking-tighter">nnect</div>
      </div>
      
    </Link>
  )
}

export default Logo
