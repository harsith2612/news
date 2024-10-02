import { useEffect, useState } from "react"
import getNewsGaurdian from "../ApiServices/GaurdianApi";

const useGaurdian=(query)=>{
    const [gaurdianArticles,setGaurdianArticles]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchGaurdianNews=async()=>{
            const {keyword}=query;
            setLoading(true);
            const response=await getGaurdianNews(query);
            console.log(response);
            setGaurdianArticles(response);
            setLoading(false);
        }
        fetchGaurdianNews();
    },[query]);
    return{
        gaurdianArticles,
        loading
    }
}


export const getGaurdianNews=async(query)=>{
    const {keyword}=query;
    const response=await getNewsGaurdian({q:keyword||'india'});
    return response;
}

export default useGaurdian; 