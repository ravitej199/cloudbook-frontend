import NoteContext from "./noteContext";
import { useState } from "react";
const  NoteState = (props) =>{
//    const notesInitial = [
//     {
        
//         "_id": "66915b03c254fd1984ad2ba7",
//         "user": "6690148bccbd1af762249349",
//         "title": "abc updated",
//         "description": "loejnf hy hyue yu g ytg tyg ytf ytg utg tf tg yg tf ytg tfq3yrtq36rhqbf gty fqytr",
//         "tag": "important",
//         "createdAt": "2024-07-12T16:34:11.866Z",
//         "__v": 0
//     },
//     {
        
//         "_id": "66915b03c254fd1984ad2ba7",
//         "user": "6690148bccbd1af762249349",
//         "title": "abc updated",
//         "description": "loejnf hy hyue yu g ytg tyg ytf ytg utg tf tg yg tf ytg tfq3yrtq36rhqbf gty fqytr",
//         "tag": "important",
//         "createdAt": "2024-07-12T16:34:11.866Z",
//         "__v": 0
//     },
//     {
        
//         "_id": "66915b03c254fd1984ad2ba7",
//         "user": "6690148bccbd1af762249349",
//         "title": "abc updated",
//         "description": "loejnf hy hyue yu g ytg tyg ytf ytg utg tf tg yg tf ytg tfq3yrtq36rhqbf gty fqytr",
//         "tag": "important",
//         "createdAt": "2024-07-12T16:34:11.866Z",
//         "__v": 0
//     },
//    ]


   const [AlertState, setAlertState] = useState({
    message : " ",
    type  :"",
    hide : false
   })

    return(
        <NoteContext.Provider value={{ AlertState, setAlertState}}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default  NoteState;