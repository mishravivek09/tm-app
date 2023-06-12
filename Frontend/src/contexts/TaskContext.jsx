import { createContext, useState } from "react";

export const TaskContext=createContext();

export const TaskContextProvider=({children})=>{
    const[data,setData]=useState([]);
    const handleUpdate=(value)=>{
        setData(value);
    }
    return <TaskContext.Provider value={{data,handleUpdate}}>{children}</TaskContext.Provider>
}