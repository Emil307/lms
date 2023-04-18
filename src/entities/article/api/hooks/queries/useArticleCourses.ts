import { QueryKeys } from "@shared/constant";
import { articleApi, ArticleCourse } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticleCourses = () => {
    return useInfiniteRequest<ArticleCourse>([QueryKeys.GET_ARTICLE_COURSES], () => articleApi.getArticleCourses());
};
