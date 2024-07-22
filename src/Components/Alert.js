import React from 'react';
import NoteContext from '../Context/Notes/noteContext';
import { useContext } from 'react';
function Alert() {

  const contextData = useContext(NoteContext);

  return (
    <div className={`alert alert-${contextData.AlertState.type} d-flex align-items-center w-full fixed h-3 top-16 left-0 z-40 ${!contextData.AlertState.hide? "" : "hidden" }`} role="alert" >
      {contextData.AlertState.message}
    </div>
  );
}

export default Alert;
