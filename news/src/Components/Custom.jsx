import { useEffect, useState } from "react";
import { useCustomNews } from "../Hooks/useCustomNews";
import NewsCardList from "./NewsCardList";
import CustomSetter from "./CustomSetter";
import Author from "./Author";
import { getArticlesByAuthor } from "../Shared/utilites";

const Custom = () => {
  const [query, setQuery] = useState({});
  const [authorFilter, setAuthorFilter] = useState("");
  const [customArticles, setCustomArticles] = useState([]);
  

  const { customNews, loading, authorList } = useCustomNews(query);

  useEffect(() => {
    let filteredArticles = customNews;
    
    if (authorFilter) {
      filteredArticles = getArticlesByAuthor(customNews, authorFilter);
    }

    setCustomArticles(filteredArticles);
  }, [customNews, authorFilter]);

  return (
    <div className="p-2 space-y-5">
      <div className="flex md:flex-row flex-col justify-between md:items-center space-y-4 md:space-y-0">
        <CustomSetter setQuery={setQuery} />
        <Author authorList={authorList} setAuthorFilter={setAuthorFilter} />
      </div>
      <NewsCardList articles={customArticles} loading={loading} />
    </div>
  );
};

export default Custom;
