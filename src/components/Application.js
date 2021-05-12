import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayListItem from "./DayList";
import Appointment from 'components/Appointment'

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Jane Doe",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 6,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "John Doe",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 6,
    time: "5pm",
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('/api/days')
      .then(response => {
        setDays(response.data)
      })
  }, [])

  const appointmentSchedule = appointments.map((appointment) => {
    return (
      <Appointment key={appointment.id}{...appointment}/>  
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
        days={days}
        day={day}
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