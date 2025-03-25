import { BiLogOutCircle } from 'react-icons/bi'
import { useEffect, useRef, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from '../../config/firebaseConfig'
import { CgClose } from 'react-icons/cg'
import { motion, AnimatePresence } from 'framer-motion'
import Form from '../Form/Form'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth/cordova'

function Header() {
  const [countColec, setCount] = useState(0)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const taskCollections = collection(db, "tasks")

  const navigate = useNavigate()
    const logOut = ()=>{
      signOut(auth)
      .then((res)=>{
          navigate('/signin')
      })
      .catch((err)=>{
          console.error(err)
      })
  }

  useEffect(() => {
    const countDb = async () => {
      const querySnapshot = query(taskCollections, where('userID', '==', `${auth?.currentUser?.uid}`))
      const count = await getDocs(querySnapshot)
      setCount(count.size)
    }
    countDb()
  }, [])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <BiLogOutCircle className="w-6 h-6 text-gray-600" />
            </motion.button>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-600">
                👋 Welcome, {auth?.currentUser?.displayName}!
              </p>
              <p className="text-xs text-gray-500">
                You have <span className="font-bold text-indigo-600">{countColec}</span> active tasks
              </p>
            </div>
          </div>

          {/* Add Task Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Add Task
          </motion.button>
        </div>
      </nav>

      {/* Profile Overlay */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm z-50"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="bg-white w-80 h-full p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <CgClose className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="flex flex-col items-center mt-8 space-y-4">
                <img
                  src={auth?.currentUser?.photoURL}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {auth?.currentUser?.displayName}
                </h3>
                <button
                  onClick={logOut}
                  className="w-full py-3 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <BiLogOutCircle className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Form Overlay */}
<AnimatePresence>
  {isFormOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setIsFormOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl w-full max-w-lg mx-4 my-4 md:my-0 shadow-xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 md:p-6 border-b">
          <h3 className="text-xl md:text-2xl font-semibold">Create New Task</h3>
          <button
            onClick={() => setIsFormOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <GrClose className="w-6 h-6 md:w-5 md:h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <Form onSuccess={() => setIsFormOpen(false)} />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </header>
  )
}

export default Header