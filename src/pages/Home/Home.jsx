import Header from "../../components/Header/Header"
import Nav from "../../components/Nav/Nav"
import Task from "../../components/Task/Task"
import { auth, db } from "../../config/firebaseConfig"
import { useEffect, useState } from "react"
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import SkeletonLoader from "../../components/SkeletonLoader"
import { onAuthStateChanged } from "firebase/auth"
function Home() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const taskCollection = collection(db, "tasks")
  
  const navigate = useNavigate()
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        navigate('/')
      }else{
        navigate('/signin')
      }
    })
      return () => unSubscribe();
  },[auth, navigate])

  // Real-time data fetching
  useEffect(() => {
    setLoading(true)
    const q = query(taskCollection, where('userID', '==', `${auth?.currentUser?.uid}`))
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTasks(tasksArray)
      setLoading(false)
    }, (error) => {
      toast.error("Error fetching tasks")
      console.error(error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Delete task handler
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id))
      toast.success('Task deleted successfully')
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (error) {
      toast.error('Failed to delete task')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Nav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <SkeletonLoader key={i} />)}
          </div>
        ) : (
          <AnimatePresence>
            {tasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="max-w-md mx-auto">
                  <div className="text-gray-400 text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No tasks found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start by creating a new task using the "Add Task" button above
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Task
                        data={task}
                        deleteDoc={deleteTask}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  )
}

export default Home