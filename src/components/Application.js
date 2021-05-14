import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayListItem from "./DayList";
import Appointment from 'components/Appointment'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
  })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(res => {
        setState({
          ...state,
          appointments
        });
      })
      .catch((err) => {
        console.log("Error in your request: ", err);
      })
    }

    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }

      const appointments = {
        ...state.appointments,
        [id]: appointment
      }

      return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        setState({
          ...state,
          appointments
        });
      })
      .catch((err) => {
        console.log("Error in your request: ", err);
      })
    }
  
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

  const setDay = (day) => {
    setState({...state, day})
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('api/interviewers')
    ])
      .then(all => {
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data,
        }))
      })
  }, [])

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