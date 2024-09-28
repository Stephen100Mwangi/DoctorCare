import PropTypes from 'prop-types'
const DoctorCard = ({image,name,role,available}) => {
  return (
    <div className='flex flex-col rounded-md gap-y-3'>
        <div className='bg-back flex justify-center items-center rounded-md'>
            <img src={image} className='h-48 w-40 object-cover rounded-lg' alt="" />
        </div>
        
        <div className="flex items-center gap-2">
            <div className={`icon rounded-full size-2 ${available? 'bg-green-500':'bg-red-500'}`}></div>
            <div className={`text-sm font-light ${available ? 'text-green-500' : 'text-red-500'}`}>{available ? "Available" : "Not Available"}</div>
        </div>
        <div className='font-bold'>{name}</div>
        <div className='text-sm font-light'>{role}</div>      
    </div>
  )
}

DoctorCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    available: PropTypes.bool,
}

export default DoctorCard
