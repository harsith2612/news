import { useEffect, useState } from "react";
import getNewsApi from "../ApiServices/NewsOrgApi";

const useNewsApiOrg = (query) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchOrgNews = async () => {
      try {
        setLoading(true);
        const response = await getOrgNews(query);
        setArticles(response);
      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false); 
      }
    };

    if (query?.keyword) {
      fetchOrgNews();
    }
  }, [query]);

  return { articles, loading, error }; 
};

export const getOrgNews = async (query) => {
  const keyword = query?.keyword || "india"; 
  const response = await getNewsApi({ q: keyword });
  return response;
};

export default useNewsApiOrg;
