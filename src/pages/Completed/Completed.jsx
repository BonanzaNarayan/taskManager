import Header from "../../components/Header/Header"
import Nav from "../../components/Nav/Nav"
// import './Home.css'
import Task from "../../components/Task/Task"

import { auth, db } from "../../config/firebaseConfig"
import { getDocs, collection, deleteDoc, doc, where, query } from "firebase/firestore"
import { useEffect, useState } from "react"

import Toast from "../../components/Toast/Toast"
import Preloader from "../../components/Preloader/Preloader"


function Completed() {
  

  const [task, setTaskList] = useState([])
  const taskCollection = collection(db, "tasks")

  const [toast, setToast] = useState()

  const [loading, setLoading] = useState(true)

  //Fetching Task
  useEffect(()=>{
    const getTaskList = async ()=>{
      try{
        const data =  query(taskCollection, 
            where('userID', '==', `${auth?.currentUser?.uid}`),
            where('comepleted', '==', true)
        )
        const finalData = await getDocs(data)
        const fiiData = finalData.docs.map((doc)=>({...doc.data(), id: doc.id}))
        setTaskList(fiiData)
        setLoading(true)
      }
      catch(err){
        console.error(err)
      }
      finally{
        console.log("All Good Sir")
        setLoading(false)
      }
    }
    getTaskList()
  },[])

  //Deleting Task
  const deleteTask = async(id)=>{
    setLoading(true)
    const movieDoc = doc(db, "tasks", id)
    try{
      await deleteDoc(movieDoc)
    }
    catch(err){
      console.error(err)
      setToast(false)
    }
    finally{
      console.log("Delete Complete Sir!!")
      setToast(true)
      setLoading(false)
      window.location.href = '/'
    }
  }
  // console.log(auth?.currentUser?.uid);



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
            {
              toast ? <Toast status="Compeleted"/>: 
              null
            }
            </div>
        </div>
    </div>
  )
}

export default Completed