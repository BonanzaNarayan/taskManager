import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'
import Preloader from '../../components/Preloader/Preloader'
import { auth, provider, signInWithPopup } from '../../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function Auth() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = () => {
    setLoading(true)
    signInWithPopup(auth, provider)
      .then((results) => {
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Failed to sign in. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Auth Section */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <h2 className="mt-6 text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-600">
              Sign in to continue to your account
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <Preloader />
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={signIn}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-indigo-200 p-2"
            >
              <FaGoogle className="w-6 h-6 text-red-600" />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </motion.button>
          )}

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Graphic Section */}
      <div className="hidden lg:block flex-1 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="h-full flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-center space-y-6"
          >
            <h3 className="text-4xl font-bold">New here?</h3>
            <p className="text-xl font-light max-w-md">
              Sign up now to unlock personalized features and connect with our
              community.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Auth