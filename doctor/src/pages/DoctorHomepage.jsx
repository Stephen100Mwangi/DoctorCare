import Button from "../components/Button"

const DoctorHomepage = () => {
  return (
    <div className="flex justify-center py-20 h-[85vh] items-center p-8">
        <div className="description w-1/2 h-auto p-6 py-10 shadow-sm flex flex-col gap-y-16 rounded-lg">
            <h1 className="text-5xl text-left font-semibold">Streamline Your <br /> <span className="text-hover">Medical Practice</span></h1>
            <p className="text-lg font-light">
                Efficiently manage your appointments, patient records, and schedule all in one place. Our integrated system helps you focus on what matters most - your patients&apos; health.
            </p>
            <Button text={"View Dashboard"} link_path={"/doctor/dashboard"}></Button>
        </div>
        <div className="heroImage w-1/2 flex justify-center items-center">
            <img src="public/main-doctor.svg" alt="image" className="object-cover w-[80%]"/>
        </div>
      
    </div>
  )
}

export default DoctorHomepage
