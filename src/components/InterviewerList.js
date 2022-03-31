import React from 'react'
 import InterviewerListItem from 'components/InterviewerListItem.js'


 export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return(<ul>
       <InterviewerListItem 
        id={interviewer.id} 
        name= {interviewer.name}
        selected={interviewer.id === props.interviewer}
        setInterviewer={(ev)=>props.setInterviewer(interviewer.id)}
        avatar = {interviewer.avatar}
          />

       </ul>)
      })
      return( interviewers)
       };

