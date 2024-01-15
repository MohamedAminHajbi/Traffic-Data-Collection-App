
import React, { useEffect, useState } from 'react'
import ReportCard from './ReportCard';
import './Card.css'

const ReportShow = () => {

    const [loading, setLoading] = useState(true);
    const [data,setdata]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/tickets/get").then(res=>res.json()).then((result)=>{setdata(result)});
},[])
  return (
    <div className='container' style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
        <div className='containercards shadow' style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop:"40px", borderRadius:"20px"}}>
     { data?.length>0?(
            <div className=''>
            {data.map((e)=>(<ReportCard data={e} />))}
        </div>
        ) :(
            <div className=''>
            <h1> Aucun evenement</h1>
            

        </div>

        )}
 <br/>
 <br/>


<br/>
</div>



    </div>
  )
}

export default ReportShow