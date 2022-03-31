import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status"
import { useVisualMode } from "hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm"
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const ERROR_SAVE ="ERROR_SAVE"
const ERROR_DELETE  ="ERROR_DELETE" 

export default function Appointment(props){
console.log("Props.interview",props.interview)
 const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function cancelInterview() {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
    }

function onDelete() {
  transition(CONFIRM);
}


function onEdit() {
 transition(CREATE) 
}

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    console.log("-->",props)
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE));

     ;
  }

  return (
  <article className="appointment">
  <Header time={props.time}/>

  {mode === EMPTY && <Empty onAdd={
    () => transition(CREATE)} />} 


{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interviewers[props.interview.interviewer]}
              onDelete={onDelete}
          onEdit={onEdit}/>
)}
    {mode ===CREATE &&
      <Form 
      onCancel={()=> back()}
      interviewers={props.interviewers}
      interviewer={props.interview && props.interview.interviewer}
      onSave={save}
      name={props.interview && props.interview.student}/>
    }
      {mode ===SAVING &&
      <Status 
      message="Saving"
    />
    }
    {mode ===DELETING &&
      <Status 
      message="Deleting"
    />
    }
    {mode === CONFIRM &&
<Confirm
       id={props.id}

       onCancel={() => back()}
       onConfirm={()=>cancelInterview()}
  message="Are you sure you would like to Cancel?"/>}
  </article>)
}