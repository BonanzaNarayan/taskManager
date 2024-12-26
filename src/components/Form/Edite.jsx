import { useState } from 'react'
import './Form.css'
import { addDoc, collection, doc, updateDoc }from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'

function Edite({id, name}) {

  const [taskUpdateName, setUpdateTaskName] = useState("")
  const [taskUpdate, setUpdateTask] = useState("")
  const [taskUpdatePriority, setUpdateTaskPriority] = useState("")
  const [taskUpdateDate, setUpdateTaskDate] = useState("")
  const [taskUpdatetime, setUpdateTaskTime] = useState("")
  const [colorUpdate, setUpdateColor] = useState('')

  const listRef = collection(db, 'tasks')


    const updateTask = async(id)=>{
      const movieDoc = doc(db, "tasks", id)
      try{
        await updateDoc(movieDoc, {
            taskName: taskUpdateName,
            task: taskUpdate,
            priority: taskUpdatePriority,
            date: taskUpdateDate,
            time: taskUpdatetime,
            color: colorUpdate
        })
      }
      catch(err){
        console.error(err)
      }
      finally{
        console.log("Update Complete Sir!!")
      }
    }

  return (
    <form style={{border: `${colorUpdate} 2px solid`}}>
        <label htmlFor="taskName">Task Name</label>
        <input 
        type="text" 
        id='taskName' 
        placeholder="task name..." 
        required
        onChange={(e)=>setUpdateTaskName(e.target.value)}
        />

        <label htmlFor="task">Task</label>
        <textarea 
        id='task' 
        placeholder='add something...' 
        required
        onChange={(e)=>setUpdateTask(e.target.value)}
        ></textarea>

        <label htmlFor="Priority">Priority</label>
        <select name="" id="Priority"
          onChange={(e)=>setUpdateTaskPriority(e.target.value)}
         required>
            <option value="" hidden>Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>

        <label htmlFor="date">Due Date</label>
        <input 
        type="date" 
        id='date' 
        required
        onChange={(e)=>setUpdateTaskDate(e.target.value)}
        />

        <label htmlFor="time">Due Time</label>
        <input 
        type="time" 
        id='time' 
        required
        onChange={(e)=>setUpdateTaskTime(e.target.value)}
         />

        <label htmlFor="color">Task Color</label>
        <input type="color" required id='color' onChange={(e)=>setUpdateColor(e.target.value)} />
        <div style={{background: `${colorUpdate}`}}></div>
        
        <button onClick={()=>updateTask(id)} type="submit">Edite Task</button>
    </form>
  )
}

export default Edite
