import { GoTasklist } from 'react-icons/go'
import { BsClockHistory } from 'react-icons/bs'
import { FaCheckCircle, FaHeart } from 'react-icons/fa'
import { FcOvertime } from 'react-icons/fc'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Nav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: "/", icon: <GoTasklist />, label: "All Tasks" },
    { path: "/completed", icon: <FaCheckCircle />, label: "Completed" },
    { path: "/pending", icon: <BsClockHistory />, label: "Pending" },
    { path: "/favorites", icon: <FaHeart />, label: "Favorites" },
    { path: "/dueDate", icon: <FcOvertime />, label: "Due Date" },
  ]

  const priorityFilters = [
    { path: "/", label: "All" },
    { path: "/low", label: "Low" },
    { path: "/medium", label: "Medium" },
    { path: "/high", label: "High" },
  ]

  return (
    <nav className="bg-white shadow-sm rounded-lg p-2 md:p-4 mb-4 md:mb-6">
      <div className="flex flex-col space-y-4 md:space-y-6">
        {/* Main Navigation */}
        <ul className="flex justify-between md:justify-around items-center pb-4 md:pb-6 space-x-1 md:space-x-0">
          {navItems.map((item) => (
            <motion.li
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group flex-1 md:flex-none text-center"
            >
              <Link
                to={item.path}
                className={`flex justify-center items-center p-2 md:p-3 rounded-xl transition-colors ${
                  isActive(item.path)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl md:text-2xl">{item.icon}</span>
                {/* Tooltip for larger screens */}
                <span className="hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs font-medium text-white bg-gray-900 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </Link>
              {/* Active indicator */}
              {isActive(item.path) && (
                <motion.div
                  layoutId="navActive"
                  className="absolute inset-0 border-2 border-indigo-200 rounded-xl"
                />
              )}
            </motion.li>
          ))}
        </ul>

        {/* Priority Filters */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          {priorityFilters.map((filter) => (
            <motion.div
              key={filter.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm md:text-base"
            >
              <Link
                to={filter.path}
                className={`px-3 py-1 md:px-4 md:py-2 rounded-full font-medium transition-colors ${
                  isActive(filter.path)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Nav