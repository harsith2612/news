import NewsCard from "./NewsCard";

const NewsCardList = ({ articles, loading }) => {
  if (loading) {
    return <h1>Loading...</h1>; 
  }

  if (!articles.length) {
    return <div>No articles found</div>; 
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map(
        (article) =>
          article.urlToImage && <NewsCard key={article.title} info={article} />
      )}
    </div>
  );
};

export default NewsCardList;
