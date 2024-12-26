import { onAuthStateChanged } from 'firebase/auth'
import { auth, signOut } from '../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


export const  redirect = ()=> {
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
}

export const logOut = ()=>{
    signOut(auth)
    .then((res)=>{
        navigate('/signin')
    })
    .catch((err)=>{
        console.error(err)
    })
}

