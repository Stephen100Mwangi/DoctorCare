import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const Button = ({text,clickFunction,hoverBG,link_path,hoverTEXT}) => {
  return (
    <Link id='button' to={link_path} className={`bg-card p-3 px-6 rounded-sm hover:rounded-full shadow-xl cursor-pointer m-auto w-fit text-white hover:bg-${hoverBG} hover:text-${hoverTEXT}`} onClick={clickFunction} >
      {text}
    </Link>
  )
}

Button.propTypes={
    text: PropTypes.string,
    clickFunction: PropTypes.func,
    hoverBG: PropTypes.string,
    link_path: PropTypes.string,
    hoverTEXT: PropTypes.string,
}

export default Button
