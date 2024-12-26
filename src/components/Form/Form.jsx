import { useState } from 'react'
import './Form.css'
import { addDoc, collection }from 'firebase/firestore'
import { auth, db } from '../../config/firebaseConfig'
import Preloader from '../Preloader/Preloader'
import Toast from '../Toast/Toast'
import { useNavigate } from 'react-router-dom'

function Form() {

  const navigate = useNavigate()

  const [taskName, setTaskName] = useState("")
  const [task, setTask] = useState("")
  const [taskPriority, setTaskPriority] = useState("")
  // const [taskDate, setTaskDate] = useState("")
  // const [tasktime, setTaskTime] = useState("")
  const [color, setColor] = useState('')

  const listRef = collection(db, 'tasks')


  const date = new Date()
  // console.log(date)
  const newYear = date.getFullYear()
  const newDate = date.getDate()
  const newMonth = date.getMonth() + 1

  const newHour = date.getHours()
  const newMinute = date.getMinutes()

  const fullDate = `${newDate}-${newMonth}-${newYear}`
  // console.log(fullDate)

  const fullTime = `${newHour}:${newMinute}`
  // console.log(fullTime)

  const [load, setLoad] = useState(false)

  const submitTask = async (e)=>{
    e.preventDefault()
    setLoad(true)
    try{
      await addDoc(listRef, {
        taskName: taskName,
        task: task,
        priority: taskPriority,
        date: fullDate,
        time: fullTime,
        color: color,
        userID: auth?.currentUser?.uid,
        isFavorite: false,
        comepleted: false
      })
    }
    catch(err){
      console.error(err)
    }
    finally{
      console.log("Submit complete sir!!")
      setLoad(false)
      window.location.href = '/'
    }
  }

  return (
    <form onSubmit={submitTask} style={{border: `${color} 2px solid`}}>
        <label htmlFor="taskName">Task Name</label>
        <input 
        type="text" 
        id='taskName' 
        placeholder="task name..." 
        required
        onChange={(e)=>setTaskName(e.target.value)}
        />

        <label htmlFor="task">Task</label>
        <textarea 
        id='task' 
        placeholder='add something...' 
        required
        onChange={(e)=>setTask(e.target.value)}
        ></textarea>

        <label htmlFor="Priority">Priority</label>
        <select name="" id="Priority"
          onChange={(e)=>setTaskPriority(e.target.value)}
         required>
            <option value="" hidden>Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>

        {/* <label htmlFor="date">Due Date</label>
        <input 
        type="date" 
        id='date' 
        required
        onChange={(e)=>setTaskDate(e.target.value)}
        />

        <label htmlFor="time">Due Time</label>
        <input 
        type="time" 
        id='time' 
        required
        onChange={(e)=>setTaskTime(e.target.value)}
         /> */}

        <label htmlFor="color">Task Color</label>
        <input type="color" required id='color' onChange={(e)=>setColor(e.target.value)} />
        <div style={{background: `${color}`}}></div>
        
        <button type="submit">Add Task</button>

        {
          load ? <Preloader /> : null
        }
    </form>
  )
}

export default Form