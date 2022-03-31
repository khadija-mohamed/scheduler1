import "./styles.scss"
import React, { Fragment } from 'react'
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
export default function Appointment (props) {
  return (
    <Fragment>
  <Header time={props.time} />
    {props.interview ? <Show 
      student={props.interview.student}  
      interviewer={props.interview.interviewer.name} 
      interview={props.interview }/> : <Empty /> }
  </Fragment>
  )
};