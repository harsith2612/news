import { useParams } from "react-router-dom";
import NewsCardList from "./NewsCardList";
import { useEffect, useState } from "react";
import useAllNews from "../Hooks/useAllNews";
import SearchArticle from "./SearchArticle";
import FilterModal from "./FilterModal";
import { filterArticles } from "../Shared/utilites";

const Category = () => {
  const { ctype } = useParams();
  const [newsArticles, setNewsArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState({ keyword: ctype });

  const { loading, allArticles } = useAllNews(query);

  useEffect(() => {
    if (query.keyword !== ctype) {
      setQuery({ keyword: ctype });
    }
  }, [ctype]);

  useEffect(() => {
    const articles = Object.keys(filters).length
      ? filterArticles(filters, allArticles)
      : allArticles;

    setNewsArticles(articles);
  }, [allArticles, filters]);

  return (
    <div className="p-2 space-y-5">
      <div className="flex md:flex-row flex-col justify-between md:items-center space-y-4 md:space-y-0">
        <SearchArticle setQuery={setQuery} ctype={ctype} />
        <FilterModal setFilters={setFilters} filters={filters} />
      </div>
      <NewsCardList articles={newsArticles} loading={loading} />
    </div>
  );
};

export default Category;
