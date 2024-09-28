import PropTypes from 'prop-types'
const DoctorIcon = ({role,icon}) => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <img src={icon} alt="" className='size-16 rounded-full' />
      <p className='text-sm'>{role}</p>
    </div>
  )
}

DoctorIcon.propTypes = {
    role:PropTypes.string,
    icon:PropTypes.element
}

export default DoctorIcon
