export const dateformatter = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  
  export const setParams = (filters, defaultSearch = "india") => {
    return {
      q: filters.keyword||filters.category || defaultSearch,
      sources: filters.source || undefined,
    };
  };
  
  export const extractAuthorNames = (tags = [], fallback = "NA") => {
    return tags.length
      ? tags.map((author) => author.webTitle).join(", ")
      : fallback;
  };
  
  export const createArticleObject = (
    article,
    src,
    author,
    title,
    description,
    urlToImage,
    url,
    date
  ) => ({
    author: author || "NA",
    title: title || "NA",
    description: description || "NA",
    urlToImage,
    url,
    date: dateformatter(date),
    src,
  });


  function parseDateFromDDMMYYYY(dateString) {
    const [day, month, year] = dateString.split('/');  
    // return new Date(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;  
  }

  export const filterArticles=(filters,articles)=>{
    const {date,source}=filters;
    const filterArticles=articles.filter((article)=>{
      if(source && date){
        return (article.src==source &&parseDateFromDDMMYYYY(article.date)==date);
      }
      if(source){
        return (article.src==source)
      }
      return (parseDateFromDDMMYYYY(article.date)==date);
    })
    return filterArticles;
  }


  export const getAuthors = (articles) => {
    const authors = articles.flatMap(article => 
        article.author && article.author !== 'NA' && article.urlToImage
            ? article.author.split(',').map(a => a.trim()).filter(a => !a.includes('https')) 
            : []
    );
    return [...new Set(authors)];
};


export const getArticlesByAuthor = (articles, authorName) => {
  return articles.filter(article => {
      if (article.author && article.author !== 'NA') {
          const authorsArray = article.author.split(',').map(a => a.trim());
          return authorsArray.includes(authorName);
      }
      return false; 
  });
};



  