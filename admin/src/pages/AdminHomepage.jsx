const AdminHomepage = () => {
  return (
    <div className="flex justify-between p-10 px-20 gap-20">
      <div className="w-1/2 flex flex-col bg-animateCard rounded-lg shadow-xl p-6 pt-14">
        <h1 className="text-4xl font-bold">Welcome to the Admin Portal</h1>
        <p className="text-lg font-light mt-16">
          Manage patient appointments efficiently and effectively. 
          Streamline your workflow and enhance patient care with our intuitive system.
        </p>

        <div className="flex mt-48 justify-between">
            <button className="bg-blue-600 text-white p-3 px-8 rounded hover:bg-blue-700">
                Login
            </button>
            <button className="bg-gray-300 text-gray-700 p-3 px-8 rounded hover:bg-gray-400">
                View Dashboard
            </button>

        </div>
        
      </div>
      <div className="w-1/2">
        <img src="./adminImage.svg" alt="Admin Dashboard" className="scale-90" />
      </div>
    </div>
  );
};

export default AdminHomepage;
