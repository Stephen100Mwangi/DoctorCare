import { Link } from "react-router-dom"
const Page404 = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-y-3 justify-center items-center gap-12 p-6">
        <img src="./404.svg" className="h-80" alt="" />
        <div className="animate-bounce text-red-500">Page NOT Found</div>
        <Link to='/' className="bg-hover text-white py-4 px-16 hover:outline hover:bg-white hover:shadow-lg hover:text-hover hover:rounded-full">Go Back</Link>
      </div>
    </div>
  )
}

export default Page404
