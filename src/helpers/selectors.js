export function getAppointmentsForDay(state, day) {
  let appointmentsDay = [];
  const filter = state.days.filter(dayName => dayName.name === day)

  if (filter.length !== 0) {
    appointmentsDay = filter[0].appointments.map(appId => state.appointments[appId])
  }
  
  return appointmentsDay
}

export function getInterviewersForDay(state, day) {
  let interviewersDays = [];

  const filter = state.days.filter(dayName => dayName.name === day)

  if (filter.length !== 0) {
    interviewersDays = filter[0].interviewers.map(interviewId => state.interviewers[interviewId])
  }
  
  return interviewersDays
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewBooking = {
    ...interview,
    interviewer: {...state.interviewers[interview.interviewer]}
  };
  
  return interviewBooking
}