import Button from "../components/Button"
import DoctorCard from "../components/DoctorCard"
import DoctorIcon from "../components/DoctorIcon"
import Logo from "../components/Logo"

const Home = () => {
  return (
    <div id="home" className="w-full min-h-[calc(100vh-80px)] flex flex-col px-12 py-20">
      <div className="w-full h-fit relative bg-card rounded-lg p-8">
        <div className="relative flex flex-col gap-12">
          <div className="text-5xl max-w-[420px] text-left text-white font-medium">Book Appointment with Trusted Doctors</div>
          <div className="flex justify-center space-x-2 items-center max-w-[500px]">
            <div className="images">
              <img src="./assets/assets_frontend/group_profiles.png" alt="" />
            </div>
            <div className="text-white text-sm">
              Simply Browse through our extensive list of trusted doctors,schedule your appointment hassle free.
            </div>
          </div>
          <Button text={"Book Appointment"}></Button>
        </div>
        <img src="./doc-header-img.png" alt="" className="absolute z-50 right-5 top-8 h-[360px]" />
      </div>

      <div className="flex justify-center gap-y-10 flex-col items-center my-16 mb-48">
      <div className="text-2xl font-bold">Find by Speciality</div>
      <div>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free</div>
      <div className="flex justify-center items-center gap-x-8">
        <DoctorIcon role={"General Physician"} icon={"./assets_frontend/General_physician.svg"}></DoctorIcon>
        <DoctorIcon role={"Gynecologist"} icon={"./assets_frontend/Gynecologist.svg"}></DoctorIcon>
        <DoctorIcon role={"Dermatologist"} icon={"./assets_frontend/Dermatologist.svg"}></DoctorIcon>
        <DoctorIcon role={"Pediatricians"} icon={"./assets_frontend/Pediatricians.svg"}></DoctorIcon>
        <DoctorIcon role={"Neurologist"} icon={"./assets_frontend/Neurologist.svg"}></DoctorIcon>
        <DoctorIcon role={"Gastroenterologist"} icon={"./assets_frontend/Gastroenterologist.svg"}></DoctorIcon>
      </div>
    </div>

     <div id="doctor" className="flex justify-center items-center gap-y-10 mx-12 flex-col my-8 mb-24">
        <div className="title text-2xl font-bold">Top Doctors To Book</div>
        <div className="text-sm font-light">Simply browse through extensive list of trusted Doctors</div>
        <div className="images grid grid-cols-5 gap-16">
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc1.png"} available="true"></DoctorCard>
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc2.png"} available="true"></DoctorCard>
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc3.png"} available="true"></DoctorCard>
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc4.png"} available="true"></DoctorCard>
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc5.png"} available="true"></DoctorCard>
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc6.png"} available="true"></DoctorCard>
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc7.png"} available="true"></DoctorCard>
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc8.png"} available="true"></DoctorCard>
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc9.png"} available="true"></DoctorCard>
            <DoctorCard role={"General Physician"} name={"Steve Mwangi"} image={"./assets/assets_frontend/doc10.png"} available="true"></DoctorCard>
        </div>
        <Button text="More"></Button>
      
    </div>

    <div id="custom" className="my-8 mx-10 flex p-24 h-fit relative bg-card rounded-lg">
        <div className="flex flex-col gap-10">
            <div className="text-white text-3xl max-w-[350px]">Book Appointments <br /> with 100+ Trusted Doctors</div>
            <Button text="Create account"></Button>
        </div>
        <div>
            <img className="h-[420px] absolute -top-16 right-5" src="./appointment-doc-img.png" alt="" />
        </div>
    </div>

    <div className="flex flex-col gap-y-5 p-8 pb-2 justify-center items-center mx-10 pt-24">
        <div className='flex justify-evenly gap-x-24 border-b-2 pb-8 '>
            <div className="w-1/2 flex flex-col gap-5 justify-start items-start">
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
            <div className="w-1/2 flex justify-start pl-8 gap-x-28 items-start">
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
        
        <div className="flex justify-center items-center">
            <p>Copyright All Rights Reserved</p>
        </div>
      
    </div>
      
    </div>
  )
}

export default Home
