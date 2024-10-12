import DoctorIcon from "../components/DoctorIcon";

const About = () => {
  return (
    <div className="grid grid-cols-3 gap-8 p-8 h-fit  items-start my-16">
      
      {/* Introduction Section */}
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg text-gray-600 text-left">
          Welcome to our medical platform, where we strive to connect patients with highly skilled and trusted doctors across various specialties. Our mission is to provide accessible healthcare and empower you to take control of your well-being. Whether you&apos;re seeking preventative care or treatment for specific health concerns, we&apos;re here to make your journey smoother and more efficient.
        </p>
      </div>


       {/* Why Choose Us Section */}
      <div className="text-center max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mb-4">
          We offer a patient-first approach, making healthcare services easily accessible with the following features:
        </p>
        <ul className="list-disc list-inside text-left text-gray-600">
          <li>Wide selection of doctors from various specialties</li>
          <li>Simple and fast online booking process</li>
          <li>Access to detailed doctor profiles and patient reviews</li>
          <li>Secure and confidential appointment scheduling</li>
          <li>Regular updates on available healthcare services</li>
        </ul>
      </div>


      <div className="flex flex-col space-y-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Find by Specialty</h2>
          <p className="text-gray-500 text-right">
            Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
          </p>
        </div>
        <div className="grid grid-cols-3 justify-center items-center gap-8 flex-wrap">
          <DoctorIcon role={"General Physician"} icon={"./assets_frontend/General_physician.svg"} />
          <DoctorIcon role={"Gynecologist"} icon={"./assets_frontend/Gynecologist.svg"} />
          <DoctorIcon role={"Dermatologist"} icon={"./assets_frontend/Dermatologist.svg"} />
          <DoctorIcon role={"Pediatricians"} icon={"./assets_frontend/Pediatricians.svg"} />
          <DoctorIcon role={"Neurologist"} icon={"./assets_frontend/Neurologist.svg"} />
          <DoctorIcon role={"Gastroenterologist"} icon={"./assets_frontend/Gastroenterologist.svg"} />
      </div>
      </div>      
    </div>
  );
};

export default About;
