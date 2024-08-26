import { Navigate, useNavigate } from "react-router-dom"

const Complete=()=>{
    const navigate =useNavigate()
return(
    <>
    <div className="flex  min-h-screen bg-gray-100 justify-center items-center">
        
        <div className=" flex flex-col space-y-2 justify-center items-center  w-80 h-80 bg-white rounded-full">
            <div className="bg-green-500 w-28 h-28 rounded-full  mt-10 flex justify-center items-center text-white text-3xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '60px', height: '60px' }}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>



            </div>
            <div className=" font-semibold text-xl ">Transfer Successful</div>
            <div onClick={()=>{
                navigate('/dashboard')
            }} className="w-20 h-8 bg-green-500 hover:bg-green-700 text-white flex justify-center items-center cursor-pointer rounded">Done</div>
        </div>
        
    </div>
    </>
)
}
export default Complete