const Users=({users,firstletter,color,className})=>{
return(
    
    <><div className="flex w-64 justify-start  ">
       
    <div className={className} style={{backgroundColor:color, width:"45px" ,height:"45px"}}>{firstletter} </div>
    <div className="flex mt-4 ml-1 font-semibold text-2xl ">{users}</div>
   
</div>

    </>
) 
}
export default Users