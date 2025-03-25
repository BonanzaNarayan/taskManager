import { useState, useRef } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebaseConfig'
import Preloader from '../Preloader/Preloader'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { HiColorSwatch, HiCalendar, HiClipboardList } from 'react-icons/hi'

function Form() {
  const [formData, setFormData] = useState({
    taskName: '',
    task: '',
    priority: '',
    dueDate: '',
    color: '#3b82f6'
  })
  const [loading, setLoading] = useState(false)
  const listRef = collection(db, 'tasks')
  const formRef = useRef(null)

  const handleDateChange = (e) => {
    const today = new Date().toISOString().split('T')[0]
    if (e.target.value < today) {
      toast.error("Can't select past dates")
      return
    }
    setFormData({ ...formData, dueDate: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await addDoc(listRef, {
        ...formData,
        date: new Date().toLocaleDateString('en-GB'),
        time: new Date().toLocaleTimeString(),
        userID: auth?.currentUser?.uid,
        isFavorite: false,
        completed: false
      })
      toast.success('Task added successfully!')
      formRef.current.reset()
      setFormData({ ...formData, color: '#3b82f6' })
    } catch (err) {
      console.error(err)
      toast.error('Failed to add task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-4 md:p-6 space-y-4 md:space-y-6 max-w-md mx-4 md:max-w-2xl md:mx-auto"
      style={{ borderLeft: `8px solid ${formData.color}` }}
    >
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <HiClipboardList className="text-blue-500 w-5 h-5 md:w-6 md:h-6" />
          Create New Task
        </h2>
        <p className="text-sm md:text-base text-gray-500">Fill in the details below to add a new task</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Task Name */}
        <div className="space-y-1 md:space-y-2">
          <label className="block text-sm font-medium text-gray-700">Task Name</label>
          <input
            type="text"
            required
            className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            placeholder="Enter task name..."
            onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
          />
        </div>

        {/* Priority */}
        <div className="space-y-1 md:space-y-2">
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            required
            className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="" hidden>Select Priority</option>
            <option value="Low" className="text-green-600">Low</option>
            <option value="Medium" className="text-yellow-600">Medium</option>
            <option value="High" className="text-red-600">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="space-y-1 md:space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <HiCalendar className="text-gray-500 w-4 h-4 md:w-5 md:h-5" />
            Due Date
          </label>
          <input
            type="date"
            required
            className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            value={formData.dueDate}
            onChange={handleDateChange}
          />
        </div>

        {/* Color Picker */}
        <div className="space-y-1 md:space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <HiColorSwatch className="text-gray-500 w-4 h-4 md:w-5 md:h-5" />
            Task Color
          </label>
          <div className="flex items-center gap-2 md:gap-3">
            <input
              type="color"
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg cursor-pointer"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
            <div 
              className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: formData.color }}
            />
          </div>
        </div>
      </div>

      {/* Task Description */}
      <div className="space-y-1 md:space-y-2">
        <label className="block text-sm font-medium text-gray-700">Task Description</label>
        <textarea
          required
          rows="3"
          className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          placeholder="Enter task details..."
          onChange={(e) => setFormData({ ...formData, task: e.target.value })}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
      >
        {loading ? <Preloader className="text-white" /> : 'Add Task'}
      </motion.button>
    </motion.form>
  )
}

export default Form