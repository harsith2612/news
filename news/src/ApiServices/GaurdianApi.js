import axios from "axios";
import { createArticleObject, extractAuthorNames } from "../Shared/utilites";
import { GARDIAN_API_KEY } from "../Configs/constant";
const newsGaurdian = (params) => {
  return axios.get(`https://content.guardianapis.com/search`, {
    params: {
      ...params,
      "api-key": GARDIAN_API_KEY,
      "show-fields": "thumbnail,trailText",
      "show-tags": "contributor",
    },
  });
};

const getNewsGaurdian = async (params) => {
  try {
    const result = await newsGaurdian(params);
    if (result.status == 200 && result.data.response.results) {
      const guardianList = result.data.response.results.map((article) =>
        createArticleObject(
          article,
          "guardianapis",
          extractAuthorNames(article.tags),
          article.webTitle,
          article.fields.trailText,
          article.fields.thumbnail,
          article.webUrl,
          article.webPublicationDate
        )
      );
      return guardianList;
    }
    return [];
  } catch (err) {
    return [{ err }];
  }
};


export default getNewsGaurdian;
