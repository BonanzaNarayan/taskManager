import { useState, useEffect } from 'react'
import { FaTrashAlt, FaRegHeart, FaHeart, FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

function Task({ data, deleteDoc, id }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    taskName: data?.taskName,
    task: data?.task,
    priority: data?.priority,
    dueDate: data?.dueDate,
    color: data?.color
  })

  useEffect(() => {
    setFormData({
      taskName: data?.taskName,
      task: data?.task,
      priority: data?.priority,
      dueDate: data?.dueDate,
      color: data?.color
    })
  }, [data])

  const handleDateChange = (e) => {
    const today = new Date().toISOString().split('T')[0]
    if (e.target.value < today) {
      toast.error("Can't select past dates")
      return
    }
    setFormData({ ...formData, dueDate: e.target.value })
  }

  const updateTask = async (id) => {
    try {
      await updateDoc(doc(db, "tasks", id), formData)
      toast.success('Task updated successfully!')
      setIsEditing(false)
    } catch (err) {
      toast.error('Failed to update task')
      console.error(err)
    }
  }

  const handleFavorite = async (id) => {
    try {
      await updateDoc(doc(db, "tasks", id), {
        isFavorite: !data.isFavorite
      })
    } catch (err) {
      toast.error('Failed to update favorite')
      console.error(err)
    }
  }

  const handleCompletion = async (id) => {
    try {
      await updateDoc(doc(db, "tasks", id), {
        completed: !data.completed
      })
    } catch (err) {
      toast.error('Failed to update completion')
      console.error(err)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative bg-white rounded-xl shadow-md p-6 transition-all"
      style={{ borderLeft: `8px solid ${data?.color}` }}
    >
      {/* Task Content */}
      <div className={`${data?.completed ? 'opacity-50' : ''}`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{data?.taskName}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            data?.priority === 'High' ? 'bg-red-100 text-red-600' :
            data?.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
            'bg-green-100 text-green-600'
          }`}>
            {data?.priority}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{data?.task}</p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            <p>Created: {data?.date}</p>
            {data?.dueDate && <p>Due: {data?.dueDate}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCompletion(data?.id)}
              className="text-xl text-gray-400 hover:text-green-600 transition-colors"
            >
              {data?.completed ? <FaCheckCircle dclassName="text-green-500" /> : <FaRegCheckCircle />}
            </button>
            <button
              onClick={() => handleFavorite(data?.id)}
              className="text-xl text-gray-400 hover:text-red-500 transition-colors"
            >
              {data?.isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-xl text-gray-400 hover:text-blue-600 transition-colors"
            >
              <BiEdit />
            </button>
            <button
              onClick={() => deleteDoc(data.id)}
              className="text-xl text-gray-400 hover:text-red-600 transition-colors"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
<AnimatePresence>
  {isEditing && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setIsEditing(false)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-xl w-full max-w-md mx-4 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 md:p-6 border-b">
          <h3 className="text-lg md:text-xl font-semibold">Edit Task</h3>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 hover:bg-gray-100 rounded-full text-xl md:text-base"
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>

        <div className="overflow-y-auto max-h-[75vh] p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm md:text-base font-medium mb-2">Task Name</label>
              <input
                value={formData.taskName}
                onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium mb-2">Description</label>
              <textarea
                value={formData.task}
                onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 h-32 md:h-24"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium mb-2">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={handleDateChange}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium mb-2">Color</label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full h-12 md:h-10 cursor-pointer rounded-lg"
              />
            </div>

            <button
              onClick={() => updateTask(data.id)}
              className="w-full bg-blue-600 text-white py-3 md:py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.div>
  )
}

export default Task