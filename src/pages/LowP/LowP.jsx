import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'
import { auth, db } from '../../config/firebaseConfig'
import './Lowp.css'

import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import Task from '../../components/Task/Task'
import Preloader from '../../components/Preloader/Preloader'


function LowP() {

    const [task, setTask] = useState([])
    const collectionTask = collection(db, "tasks")

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const lowData = async ()=>{
            try{
                const quaryData = query(collectionTask, where('priority', '==', 'Low'), where('userID', '==', `${auth?.currentUser?.uid}`))

                const finalFilterData = await getDocs(quaryData)
    
                const fullData = finalFilterData.docs.map((doc)=>({...doc.data(), id: doc.id}))
    
                console.log(fullData)
                setTask(fullData)

                setLoading(true)
            }
            catch(err){
                console.error(err)
            }
            finally{
                console.log("Data Fetched complete Sir!!")
                setLoading(false)
            }
        }
        lowData()
    },[])

      const deleteTask = async(id)=>{
        const movieDoc = doc(db, "tasks", id)
        try{
          await deleteDoc(movieDoc)
        }
        catch(err){
          console.error(err)
        }
        finally{
          console.log("Delete Complete Sir!!")
        }
      }
  return (
    <div>
        <Header />
        <Nav />
        <div className="home">
            <div className="taskList">
            {
                loading ? <Preloader />:
                task.map((taskList, key)=>(
                    <Task 
                    key={key} 
                    name={taskList.taskName} 
                    task={taskList.task} 
                    date={taskList.date} 
                    time={taskList.time} 
                    color={taskList.color}  
                    deleteDoc={deleteTask} 
                    id={taskList.id}
                    />
                  ))
            }
            </div>
        </div>
    </div>
  )
}

export default LowP