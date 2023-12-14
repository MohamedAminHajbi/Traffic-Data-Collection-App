import React from 'react'

const ReportCard = (props) => {
  console.log(props.data.username)
  return (
    <div>
    <div class="card border-secondary mb-3 " style={{"width": "1000px"}}>
    <div class="card-header d-flex justify-content-between ">
      <h5 className=''>{props.data.username}</h5>
      <h5 className='fs-6 p-2'>{props.data.email}</h5>
      </div>
    <div class="card-body text-secondary">
      <h5 class="card-title ">{props.data.dateT}</h5>
      <p class="card-text ">{props.data.message}</p>
    </div>
  </div></div>
  )
}

export default ReportCard