import Logo from './Logo'
const Footer = () => {
  return (
    <div className="flex flex-col  gap-5 justify-center items-center mx-10 pt-24">
        <div className='flex justify-evenly gap-x-24 max-sm:flex-col max-sm:bg-red-600'>
            <div className="w-1/2 flex flex-col gap-5 justify-start items-start max-sm:w-full">
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
            <div className="w-1/2 flex justify-start pl-8 gap-x-28 items-start max-sm:w-full">
             <div className='flex flex-col space-y-3'>
                <div className='font-bold mb-3'>COMPANY</div>
                <div>Home</div>
                <div>Privacy policy</div>
                <div>Contact us</div>
                <div>Privacy policy</div>
             </div>
             <div className='flex flex-col space-y-3'>
                <div className='font-bold mb-3'>GET IN TOUCH</div>
                <a href="tel:+254758725032">+254758725032</a>
                <a href="mailto:mwangiwahome70@gmail.com"></a>
                <div>Contact us</div>
                <div>Privacy policy</div>
             </div>
            </div>
        </div>
        
        <div className="p-8 flex justify-center items-center">
            <p>Copyright All Rights Reserved</p>
        </div>
      
    </div>
  )
}

export default Footer
