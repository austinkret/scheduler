import React from "react";

import "components/Application.scss";
import DayListItem from "./DayList";
import Appointment from 'components/Appointment'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from '../hooks/useApplicationData'

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const appointmentSchedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    const interviewers = getInterviewersForDay(state, state.day)
    
    return (
      <Appointment 
      key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />  
    )
  })

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
        <DayListItem
        days={state.days}
        day={state.day}
        setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentSchedule}
      </section>
    </main>
  );
}