import { collection, doc, updateDoc } from "firebase/firestore";
import { useState, createContext } from "react";
import { db } from "../config/firebaseConfig";

export const ActionsContext = createContext()

export const ActionsContextProvider = ({children})=>{

    const dbCollections = collection(db, 'tasks')

    const [like, setLike] = useState(false)
    const handleFavorite = async (id) => {
      setLike(!like)
      try{
        const docRef = doc(dbCollections, id)
        await updateDoc(docRef, {
          isFavorite: !like
        })
      }
      catch(err){
        console.error(err)
      }
      finally{
        console.log("Liked State")
      }
  
    };
  
    //Completion
    const [complete, setComplete] = useState(false)
    const handleCompletion = async (id) => {
        setComplete(!complete)
      try{
        const docRefC = doc(dbCollections, id)
        await updateDoc(docRefC, {
          comepleted: !complete
        })
      }
      catch(err){
        console.error(err)
      }
      finally{
        console.log("Liked State")
      }
    };

    const contextValue = {
        // id,
        like,
        complete,
        handleCompletion,
        handleFavorite,
    }


    return <ActionsContext.Provider value={contextValue}>{children}</ActionsContext.Provider>
}