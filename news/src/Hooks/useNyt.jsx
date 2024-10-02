import { useEffect, useState } from "react";
import getNewsNYT from "../ApiServices/NytApi";

const useNyt = (query) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchNytNews = async () => {
      try {
        setLoading(true);
        const response = await getTimesNews(query);
        setArticles(response);
      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false); 
      }
    };

    if (query?.keyword) {
      fetchNytNews();
    }
  }, [query]);

  return { articles, loading, error }; 
};

export const getTimesNews = async (query) => {
  const keyword = query?.keyword || "india"; 
  const response = await getNewsNYT({ q: keyword });
  return response;
};

export default useNyt;
