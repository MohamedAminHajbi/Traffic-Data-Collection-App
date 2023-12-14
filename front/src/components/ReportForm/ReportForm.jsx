import React, { useState } from 'react';

import ReportShow from '../DisplayData/ReportShow';

const ReportFrom = () => {
    const[username,setUsername]=useState();
    const[email,setemail]=useState();
    const[localisation,setlocalisation]=useState();
    const[message,setmsg]=useState();
    const[dateT,setDate]=useState();
    const handleSubmit =(e)=>{
        e.preventDefault();
        const ticket ={username,email,message,dateT,localisation}
        console.log (ticket);
        try {
          const response = null;
    
          // Handle the response (e.g., update state, show a success message)
          console.log('Response:', response.data);
        } catch (error) {
          // Handle errors (e.g., show an error message)
          console.error('Error:', error);
        }
        
    }
  return (
    <div>
      <ReportShow/>
      <br/>
      <br/>
      
    <div className='container shadow'>
      

    <form action="/action_page.php " className='row col mx-auto' onSubmit={handleSubmit}>
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" class="form-control" id="email" value={email} onChange={((e)=>setemail(e.target.value))}required/>
  </div>
  <div class="form-group">
    <label for="pwd">Username:</label>
    <input type="texte" class="form-control" id="pwd" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
  </div>
  <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Incident</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={message} onChange={(e)=>setmsg(e.target.value)}required></textarea>
 </div>
 <div class="form-group">
    <label for="pwd">Localisation:</label>
    <input type="texte" class="form-control" id="pwd" value={localisation} onChange={(e)=>setlocalisation(e.target.value)}required/>
  </div>
  <div class="form-group">
    <label for="exampleDate">Select a Date:</label>
    <input type="date" class="form-control" id="exampleDate" name="exampleDate" value={dateT} onChange={(e)=>setDate(e.target.value)}required/>
   </div>
  <button type="submit" class="btn btn-primary mt-4" >Submit</button>
</form>
    </div></div>
  )
}

export default ReportFrom