import { createContext, useState } from "react";

export const FormContext=createContext();

export const FormContextProvider=({children})=>{
    const[showForm,setShowForm]=useState(false);
    const handleShowForm=(value)=>{
        setShowForm(value);
    }
    return <FormContext.Provider value={{showForm,handleShowForm}}>{children}</FormContext.Provider>
}