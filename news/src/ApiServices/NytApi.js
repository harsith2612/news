import axios from "axios";
import { TIMES_API_KEY } from "../Configs/constant";
import { createArticleObject } from "../Shared/utilites";
const newsNYT = (params) => {
  return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json`, {
    params: { ...params, "api-key": TIMES_API_KEY },
  });
};

const getNewsNYT = async (params) => {
  try {
    const result = await newsNYT(params);
    if (result.status == 200 && result.data.response.docs) {
      const nytList = result.data.response.docs.map((article) => {
        const urlToImage = article.multimedia.length
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : null;
        return createArticleObject(
          article,
          "nytimes",
          article.byline?.person.length
            ? article.byline.person
                .map((p) => `${p.firstname} ${p.lastname}`)
                .join(", ")
            : "NA",
          article.headline?.main,
          article.abstract,
          urlToImage,
          article.web_url,
          article.pub_date
        );
      });
      return nytList;
    }
    return [];
  } catch (err) {
    return [{ err }];
  }
};
export default getNewsNYT;
