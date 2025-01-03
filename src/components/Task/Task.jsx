import './Task.css'
import { FaTrashCan } from 'react-icons/fa6'
import { BiEdit } from 'react-icons/bi'
// import Edite from '../Form/Edite'
import { CgClose } from 'react-icons/cg'
import { useContext, useRef, useState } from 'react'

import { collection, doc,  updateDoc }from 'firebase/firestore'
import { auth, db } from '../../config/firebaseConfig'
import { FaHeart } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

function Task({name, task, date, time, color, delectDoc, id}) {


  const [taskUpdateName, setUpdateTaskName] = useState("")
  const [taskUpdate, setUpdateTask] = useState("")
  const [taskUpdatePriority, setUpdateTaskPriority] = useState("")
  const [taskUpdateDate, setUpdateTaskDate] = useState("")
  // const [taskUpdatetime, setUpdateTaskTime] = useState("")
  const [colorUpdate, setUpdateColor] = useState('')

  // const [taskDate, setTaskDate] = useState("")

  const handleDateChange = (e) => {
    const today = new Date().toISOString().split("T")[0];
    if (e.target.value < today) {
      alert("You can't select a past date.");
    } else {
      setUpdateTaskDate(e.target.value);
    }
  };

  const editeRef = useRef()
  const listRef = collection(db, 'tasks')

  const editBtn = ()=>{
    editeRef.current.style.display = 'flex'
  }

  const closeEdite = ()=>{
    editeRef.current.style.display = 'none'
  }

  const dateNew = new Date()
  // console.log(date)
  const newYear = dateNew.getFullYear()
  const newDate = dateNew.getDate()
  const newMonth = dateNew.getMonth() + 1

  const newHour = dateNew.getHours()
  const newMinute = dateNew.getMinutes()

  const fullDate = `${newDate}-${newMonth}-${newYear}`
  // console.log(fullDate)

  const fullTime = `${newHour}:${newMinute}`
  // console.log(fullTime)


  const updateTask = async(id)=>{
    const movieDoc = doc(listRef, id)
    try{
      await updateDoc(movieDoc, {
          taskName: taskUpdateName,
          task: taskUpdate,
          priority: taskUpdatePriority,
          date: fullDate,
          time: fullTime,
          dueDate: taskUpdateDate,
          color: colorUpdate,
          userID: auth?.currentUser?.uid
      })
    }
    catch(err){
      console.error(err)
    }
    finally{
      console.log("Update Complete Sir!!")
      editeRef.current.style.display = 'none'
    }
  }

  
  const [like, setLike] = useState(false)
  const handleFavorite = async (id) => {
    setLike(!like)
    try{
      const docRef = doc(listRef, id)
      await updateDoc(docRef, {
        isFavorite: !like
      })
    }
    catch(err){
      console.error(err)
    }
    finally{
      console.log("Liked State")
    }

  };

  //Completion
  const [complete, setComplete] = useState(false)
  const handleCompletion = async (id) => {
      setComplete(!complete)
    try{
      const docRefC = doc(listRef, id)
      await updateDoc(docRefC, {
        comepleted: !complete
      })
    }
    catch(err){
      console.error(err)
    }
    finally{
      console.log("Liked State")
    }
  };






  return (
    <div className='task' style={{boxShadow: `10px 10px 0 ${color}`}}>
        <b>{name}</b>
        <div className='taskReal'>
            {task}
        </div>
        <div className='detailes'>
            <span>{date}</span>
            <span>{time}</span>
        </div>
        <div className='actions'>
            <FaCheckCircle 
              onClick={()=>handleCompletion(id)}  
              className='complete' 
              style={{color: complete ? "green" : "grey"}}
            />

            <FaHeart 
              onClick={()=>handleFavorite(id)} 
              className='star' 
              style={{color: like ? "red" : "grey"}} 
            />

            <BiEdit className='edit' onClick={editBtn}/>
            <FaTrashCan className='delete' onClick={()=>delectDoc(id)}/>
        </div>

        <div className="editeCon" ref={editeRef}>
            <CgClose className='closeEdite' onClick={closeEdite}/>

            {/* Edit Task */}
            <div className='editForm' style={{border: `${colorUpdate} 2px solid`}}>
                <label htmlFor="taskName">Task Name</label>
                <input 
                type="text" 
                id='taskName' 
                placeholder="task name..." 
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
                onChange={handleDateChange}
                />

                {/* <label htmlFor="time">Due Time</label>
                <input 
                type="time" 
                id='time' 
                required
                onChange={(e)=>setUpdateTaskTime(e.target.value)}
                /> */}

                <label htmlFor="color">Task Color</label>
                <input type="color" required id='color' onChange={(e)=>setUpdateColor(e.target.value)} />
                <div style={{background: `${colorUpdate}`}}></div>
                
                <button onClick={()=>updateTask(id)} type="submit">Edite Task</button>
            </div>
        </div>
    </div>
  )
}

export default Task