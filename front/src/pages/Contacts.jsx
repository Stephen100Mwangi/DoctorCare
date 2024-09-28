import Logo from "../components/Logo"
const Contacts = () => {
  return (
    <div className='flex justify-start items-start gap-2 mx-10 my-6 h-fit'>
        <div className="w-1/2 h-[80vh] justify-center items-center flex-1">
        <img src="./public/assets_frontend/contact_image.png" className="object-cover rounded-xl h-[100%]" alt="" />
        </div>

        
        <div className="w-1/2 rounded-lg flex flex-col gap-y-16 p-6 flex-1">
        <div className='flex flex-col justify-start gap-y-10'>
            <div className="w-full flex flex-col gap-5 justify-start items-start">
            <Logo></Logo>
            <p>
              At DoctorCare, our mission is to provide exceptional healthcare services
              with a focus on patient well-being and comfort. With a team of experienced
              professionals and state-of-the-art facilities, we offer personalized care
              to meet the unique needs of every patient. Whether you’re visiting for a
              routine check-up or specialized treatment, we are committed to ensuring
              your health is in the best hands.
            </p>
            </div>
            <div className="w-full flex flex-row gap-x-5 items-start justify-between">
             <div className='flex flex-col space-y-3'>
                <div className='font-bold mb-3'>COMPANY</div>
                <div>Home</div>
                <div>All Doctors</div>
                <div>Book appointment</div>
                <div>About us</div>
             </div>
             <div className='flex flex-col space-y-3'>
                <div className='font-bold mb-3'>GET IN TOUCH</div>
                <a className="hover:text-hover" href="tel:+254758725032">+254758725032</a>
                <a className="hover:text-hover" href="mailto:mwangiwahome70@gmail.com">Contact Us</a>
                <div>Privacy policy</div>
             </div>
            </div>
        </div>
        
        <div className="flex justify-center items-center">
            <p>Copyright All Rights Reserved</p>
        </div>
      
    </div>
      
    </div>
  )
}

export default Contacts
