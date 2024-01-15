import React from 'react'
import "./Card.css"

const ReportCard = (props) => {
  console.log(props.data.username)
  return (
    <div>
    <div class="notification">
    <div class="notiglow"></div>
    <div class="notiborderglow"></div>
    <div className='d-flex justify-content-between'>
    <div class="notititle" style={{fontSize:'26px'}}>{props.data.username}</div>
    <div class="notititle me-4">{props.data.localisation}</div>
    <div class="notititle me-4">{props.data.email}</div>
    </div>
    <div class="notibody">{props.data.message}</div>
    <div class="notibody">{props.data.dateT}</div>
  </div>
  </div>
  )
}

export default ReportCard