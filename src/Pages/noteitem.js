import { useContext } from 'react'
import { useState } from 'react'
import React from 'react'
import NoteContext from '../Context/Notes/noteContext'




function Noteitem(props) {

  let changeAlertState = useContext(NoteContext);


  const handleEditClick = ()=>{

   




  }

  const handleDeleteClick = ()=>{
    
      changeAlertState.setAlertState({
        message : "Note has been deleted",
        type : "success",
        hide : "false"
      })
  
    setTimeout(()=>{
    changeAlertState.setAlertState({
      message : "",
      type : "",
        hide : "true"
    })
  },1000)

    
  }
  return (
    <div className="self-start flex flex-col ml-10 font-semibold text-[40px] bg-white p-6 rounded-lg shadow-lg mt-5 w-[95%] h-56 hover:cursor-pointer">
      <div className='heading border-b-4 border-blue-500 flex justify-between'><h1> Title : {props.note.title}</h1>
        <div className='text-[28px] flex gap-3' >
    <button className="text-blue-500 hover:text-blue-700" onClick={handleEditClick}>
        <i className="fas fa-edit"></i> Edit
    </button>
    <button className="text-red-500 hover:text-red-700" onClick={handleDeleteClick}>
        <i className="fas fa-trash"></i> Delete
    </button>
</div>

      </div>
      
      <div className='description'>Description : <h1>{props.note.description}</h1></div>
    </div>
  )
}

export default Noteitem
