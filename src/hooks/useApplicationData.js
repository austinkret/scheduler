import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  const getNumOfSpots = (day, appointments) => {
    const numOfSpots = day.appointments.filter(id => appointments[id].interview === null);
    console.log("num of spots----------", numOfSpots.length);
    return numOfSpots.length;
  };
  
  const updateNumOfSpots = (selectedDay, days, appointments) => {
    const day = days.find(day => day.name === selectedDay);
    console.log("day-----------", day);
    const spots = getNumOfSpots(day, appointments);
    console.log("spots........",spots);
    const newDay = {
      ...day,
      spots
    };
    
    return days.map(day => day.name === selectedDay ? newDay : day);
  };

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateNumOfSpots(state.day, state.days, appointments);

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(res => {
      setState({
        ...state,
        appointments,
        days
      });
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
    
    const days = updateNumOfSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({
        ...state,
        appointments,
        days
      });
    })
  }
  
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

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}