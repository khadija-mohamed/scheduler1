export function getInterview(state,interview) {
  if (interview) {
    const stateUpdated = {...interview, interviewer:state.interviewers[interview.interviewer]}
    return stateUpdated
  } else {
    return null
  }
}
 
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter( mappedDay => mappedDay.name === day);
  if (!filteredDays.length) { return []; }
  const appointmentArray = [];
  for (let item in filteredDays[0].appointments){
 
    appointmentArray.push(state.appointments[filteredDays[0].appointments[item]])
  }
return appointmentArray
}

export  function getInterviewersForDay(state, day) {
  const appointmentArr = getAppointmentsForDay(state, day)
  if (!appointmentArr.length) { return []; }
  const interviewersArray = [];
  console.log("mapped ---> ",appointmentArr)

  for (let item of appointmentArr){
 console.log(item.interview)
   if ( item.interview ) 
   {interviewersArray.push(state.interviewers[item.interview.interviewer])}
  }
return interviewersArray}