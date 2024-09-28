import DoctorIcon from "../components/DoctorIcon"

const About = () => {
  return (
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
  )
}

export default About
