import React, { useState } from 'react';
import '../map/Map.css'
import axios from 'axios';
import Success from '../Success/Success';

const ReportFrom = () => {
    const[username,setUsername]=useState();
    const[email,setemail]=useState();
    const[localisation,setlocalisation]=useState();
    const[message,setmsg]=useState();
    const[dateT,setDate]=useState();
    const [showSuccess, setShowSuccess] = useState(false);
    const handleCloseSuccess = () => {
      setShowSuccess(false);
    };
    const handleSubmit =(e)=>{
        e.preventDefault();
        const ticket ={username,email,message,dateT,localisation}
        console.log (ticket);
        try {
          const response = axios.post('http://localhost:8080/tickets/post', ticket);
          console.log('Response:', response.data);
          setShowSuccess(true);
        } catch (error) {
          // Handle errors (e.g., show an error message)
          console.error('Error:', error);
        }
        
    }
  return (
    <div>
      <br/>
      <br/>
      
    <div className='container shadow' style={{width:"700px", borderRadius:"20px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <h2 style={{padding:"5px"}}>Add a new post</h2>
      

    <form style={{display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column", gap:"10px"}} className='row col mx-auto' onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="email" style={{textTransform:"uppercase",letterSpacing:"1px",padding:"7px"}}>Email:</label>
        <input type="email" class="form-control input" id="email" style={{width:"600px"}} value={email} onChange={((e)=>setemail(e.target.value))}required/>
      </div>
      <div class="form-group">
        <label for="pwd" style={{textTransform:"uppercase",letterSpacing:"1px",padding:"7px"}}>Username:</label>
        <input type="texte" class="form-control input" style={{width:"600px"}} id="pwd" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
      </div>
      <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label" style={{textTransform:"uppercase",letterSpacing:"1px",padding:"7px"}}>Incident</label>
      <textarea class="form-control" style={{width:"600px"}} value={username} id="exampleFormControlTextarea1" rows="3" value={message} onChange={(e)=>setmsg(e.target.value)}required></textarea>
    </div>
    <div class="form-group">
        <label for="pwd" style={{textTransform:"uppercase",letterSpacing:"1px",padding:"7px"}}>Localisation:</label>
        <input type="texte" class="form-control input" style={{width:"600px"}} id="pwd" value={localisation} onChange={(e)=>setlocalisation(e.target.value)}required/>
      </div>
      <div class="form-group">
        <label for="exampleDate" style={{textTransform:"uppercase",letterSpacing:"1px",padding:"7px"}}>Select a Date:</label>
        <input type="date" class="form-control input" id="exampleDate" style={{width:"600px"}} name="exampleDate" value={dateT} onChange={(e)=>setDate(e.target.value)}required/>
      </div>
      <button type="submit" class="btncustom" style={{width:"100px"}}>Submit</button>
    </form>
    </div>
    {showSuccess && <Success/>}
    </div>
  )
}

export default ReportFrom