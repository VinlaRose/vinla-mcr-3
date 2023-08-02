import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import {snacks} from "../data"




const initialValue = {
   data: [],
   filteredData: [],
   searchData:[]

    
}



export const DataContext = createContext(initialValue);

export const DataProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialValue);

    useEffect(() => {
        dispatch({type: "FETCH_DATA", payload: snacks})
    },[state.data])
 

      

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )   
}