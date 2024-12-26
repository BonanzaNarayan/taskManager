import { BiLogOutCircle } from 'react-icons/bi'
import './Header.css'
import Form from '../Form/Form';
import { useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr'

import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../../config/firebaseConfig';
import { logOut } from '../../hooks/authRedirect';
import { CgClose } from 'react-icons/cg';


function Header() {
    // const name = 'Luna';

    const formRef = useRef()
    const closeForm = ()=>{
        formRef.current.style.display = 'none'
    }

    const addTask = ()=>{
        formRef.current.style.display = 'flex'
    }

    const taskCollections = collection(db, "tasks")
    const [countColec, setCount] = useState(0)

    useEffect(()=>{
        const countDb = async ()=>{
            const querySnapshot =  query(taskCollections, where('userID', '==', `${auth?.currentUser?.uid}`))
            const count = await getDocs(querySnapshot);
            console.log(count.size)
            setCount(count.size)
        }
        countDb()
    },[])
    // console.log(auth?.currentUser?.photoURL);

    const profileRef = useRef()
    const openProfile = ()=>{
        profileRef.current.style.display = 'flex'
    }
    const closeProfile = ()=>{
        profileRef.current.style.display = 'none'
    }
    
  return (
    <header>
        <div className="profileInfo" ref={profileRef}>
            <CgClose  className='closeProfile' onClick={closeProfile}/>
            <div>
                <img src={auth?.currentUser?.photoURL.toString()} alt="ff" id='displayPic'/>
                <h3>{auth?.currentUser?.displayName}</h3>
            </div>
            <button onClick={logOut}>LogOut</button>
        </div>
        <div className="logoCon">
            <div className='logo'>
                <button onClick={openProfile}><BiLogOutCircle /></button>
                <span>
                    <p>👋 Welcome, {auth?.currentUser?.displayName}!</p>
                    <div>You have <b>{countColec}</b> active task</div>
                </span>
            </div>

            <button onClick={addTask}>Add Task</button>
        </div>

        <div className='addTask' ref={formRef}>
        <GrClose className='closeForm' onClick={closeForm}/>
            <Form />
        </div>
    </header>
  )
}

export default Header