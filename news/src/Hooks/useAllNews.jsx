import { useEffect, useState } from "react";
import getNewsNYT from "../ApiServices/NytApi";
import getNewsGaurdian from "../ApiServices/GaurdianApi";
import getNewsApi from "../ApiServices/NewsOrgApi";

const useAllNews = (query) => {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch=async(query)=>{
      setLoading(true);
      const result=await fetchAllNews(query);
      setAllArticles(result);
      setLoading(false);
    }
    fetch(query);
  }, [query]);
  return {
    allArticles,
    loading,
  };
};

export const fetchAllNews = async (query) => {
  const { keyword } = query;
  
  const [nytResponse, gaurdianResponse, newsApiResponse] =
    await Promise.all([
      getNewsNYT({ q: keyword || "india" }),
      getNewsGaurdian({ q: keyword || "india" }),
      getNewsApi({ q: keyword || "india" }),
    ]);
  return ([...nytResponse, ...gaurdianResponse, ...newsApiResponse]);
};
export default useAllNews;
