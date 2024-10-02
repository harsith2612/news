import { useEffect, useState } from "react";
import NewsCardList from "./NewsCardList";
import SearchArticle from "./SearchArticle";
import useAllNews from "../Hooks/useAllNews";
import FilterModal from "./FilterModal";
import { filterArticles } from "../Shared/utilites";

const NewsHome = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState({ keyword: "technology" });
  const { loading, allArticles } = useAllNews(query);

  useEffect(() => {
    const filteredArticles = Object.keys(filters).length
      ? filterArticles(filters, allArticles)
      : allArticles;
    setNewsArticles(filteredArticles);
  }, [allArticles, filters]);

  return (
    <div className="p-2 space-y-5">
      <div className="flex md:flex-row flex-col justify-between space-y-4">
        <SearchArticle setQuery={setQuery} />
        <FilterModal setFilters={setFilters} filters={filters} />
      </div>
      <NewsCardList articles={newsArticles} loading={loading} />
    </div>
  );
};

export default NewsHome;
