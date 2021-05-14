import React from 'react'
import {useVisualMode} from 'hooks/useVisualMode'
import axios from 'axios'
import 'components/Appointment/styles.scss'

import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFRIM"
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then ((res) => {
      transition(SHOW)
    })
  }
  
  function deleteInterview(name) {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then ((res) => {
      transition(EMPTY)
    })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} />)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onSave={save} onCancel={back} />)}
      {mode === SAVING && (<Status message="Saving" />)}
      {mode === CONFIRM && (<Confirm message="Delete the appointment?" onConfirm={deleteInterview} onCancel={back} />)}
      {mode === DELETING && (<Status message="Deleting" />)}
    </article>
  )
}