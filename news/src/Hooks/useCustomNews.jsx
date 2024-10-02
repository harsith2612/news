import { useEffect, useState, useMemo } from "react";
import {getGaurdianNews} from "./useGaurdian";
import { getTimesNews } from "./useNyt";
import { getOrgNews } from "./useNewsApiOrg";
import { getAuthors } from "../Shared/utilites";

export const useCustomNews = (query) => {
  const key = "userPreferences";
  const defaultData = {
    keyword: ["Entertainment"],
    source: [1, 2, 3],
  };

  const [customNews, setCustomNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorList, setAuthorList] = useState([]);
  const storedData = useMemo(() => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
  }, []);

  const [localData, setLocalData] = useState(storedData);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localData));
  }, [localData]);

  useEffect(() => {
    const customMetaData = {
      ...localData,
      keyword: localData.keyword.join(" and "),
    };

    const fetchArticles = async (datas) => {
      try {
        const result = await Promise.all(
          datas.source.map(async (sourceId) => {
            switch (sourceId) {
              case 1:
                return await getOrgNews(datas);
              case 2:
                return await getGaurdianNews(datas);
              case 3:
                return await getTimesNews(datas);
              default:
                return [];
            }
          })
        );

        const allArticlesList = result.flat();
        if (allArticlesList.length > 0) {
          setAuthorList(getAuthors(allArticlesList));
          setCustomNews(allArticlesList);
        } else {
          setAuthorList([]);
          setCustomNews([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchArticles(customMetaData);
  }, [localData]);

  useEffect(() => {
    if (
      query &&
      Object.keys(query).some((key) => query[key] !== localData[key])
    ) {
      setLocalData((prev) => ({ ...prev, ...query }));
    }
  }, [query, localData]);

  return {
    customNews,
    loading,
    localData,
    authorList,
  };
};
