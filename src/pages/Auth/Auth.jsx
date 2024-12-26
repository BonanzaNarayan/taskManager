import { FaGoogle } from 'react-icons/fa'
import './Auth.css'
import { useState } from 'react'
import Preloader from '../../components/Preloader/Preloader'
import { auth, provider, signInWithPopup } from '../../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

   const signIn = ()=>{
    setLoading(true)
    signInWithPopup(auth, provider)
        .then((results)=>{
            navigate('/')
            
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

  return (
        <>
            <div className='authSec'>
                <div className='auth'>
                    <div className="content">
                        <h1>Sig In / Sign Up</h1>
                    </div>
                        {loading ? (
                                <Preloader />
                            ):(
                                <button onClick={signIn} className='signIn'>
                                    <div>
                                        <FaGoogle />
                                    </div>
                                    Continue with Google
                                </button>
                        )}
                </div>
                <div className='right'>

                </div>
            </div>
        </>
    )
  
}

export default Auth