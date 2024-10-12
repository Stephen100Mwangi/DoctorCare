import { FaSpinner } from "react-icons/fa6";
import PropTypes from 'prop-types'

const Loader = ({text}) => {
  return (
    <div className="flex justify-center items-center space-x-3 p-3 px-5 bg-green-500 text-white">
      <div>{text}</div>
      <FaSpinner className="animate-spin"></FaSpinner>
    </div>
  )
}

Loader.propTypes = {
    text: PropTypes.string
}

export default Loader
