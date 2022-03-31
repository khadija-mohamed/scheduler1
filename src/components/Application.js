import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import axios from "axios"
import Appointment from "components/Appointment/Index";
import{ getAppointmentsForDay, getInterview, getInterviewersForDay }from "../helpers/selector"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state,appointments });
    return axios.put(`/api/appointments/${id}`,  {
     interview:{ student:interview.student,
       interviewer: interview.interviewer}
    } )
    //take student, interviewer

  } 
  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    let promiseDays = axios.get(`/api/days`);
    let promiseAppointments = axios.get(`/api/appointments`);
    let promiseInterviewers = axios.get(`/api/interviewers`);
    Promise.all([
      promiseDays,
      promiseAppointments,
      promiseInterviewers
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  },[]);
    console.log("the interviewer data",state.interviewers)
    const filteredAppointments = getAppointmentsForDay(state, state.day);
    const appointmentList = filteredAppointments.map(appointment => {
      console.log("appointment ", appointment)

      const interview = getInterview(state, appointment.interview);

      console.log("interview",interview)

      const interviewersList = getInterviewersForDay(state, state.day)
      console.log("interviewersList", interviewersList)
      return ( 
      <Appointment 
      interview={interview} 
      time={appointment.time} 
      key={appointment.id} {...appointment} 
      interviewers={interviewersList}
      bookInterview={bookInterview}
      />);
    });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentList}</section>
    </main>
  );
}