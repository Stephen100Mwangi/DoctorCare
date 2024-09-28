import Button from "../components/Button"
import DoctorCard from "../components/DoctorCard"
const Doctors = () => {
  return (
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
  )
}

export default Doctors
