import axios from "axios";
import { NEWS_API_KEY } from "../Configs/constant";
import { createArticleObject } from "../Shared/utilites";
const newsApiOrg = (params) => {
  return axios.get(`https://newsapi.org/v2/everything`, {
    params: { ...params, "apiKey": NEWS_API_KEY, pagesize: 10 },
  });
};
const getNewsApi = async (params) => {
  try {
    const result = await newsApiOrg(params);
    if(result.status==200 && result.data.articles){
        const newsAPIList = result.data.articles.map((article) =>
            createArticleObject(
              article,
              "newsapi.org",
              article.author,
              article.title,
              article.description,
              article.urlToImage,
              article.url,
              article.publishedAt
            )
          );
          return newsAPIList;
    }
    return [];
  } catch (err) {
    return [{ err }];
  }
};
export default getNewsApi;
