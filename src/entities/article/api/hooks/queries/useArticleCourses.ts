import { QueryKeys } from "@shared/constant";
import { articleApi, ArticleCourse } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticleCourses = () => {
    //TODO: добавить pageParam когда будем править схемы
    return useInfiniteRequest<ArticleCourse>([QueryKeys.GET_ARTICLE_COURSES], () => articleApi.getArticleCourses());
};
