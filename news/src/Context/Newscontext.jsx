import { createContext, useState } from "react";

export const newsContext=createContext();

const NewsProvider=({children})=>{
    const [newsArticles,setNewsArticles]=useState([]);

    return(
        <newsContext.Provider value={{newsArticles:newsArticles,setNewsArticles:setNewsArticles}}>
            {children}
        </newsContext.Provider>
    )
    
}
export default NewsProvider;
