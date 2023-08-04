import { useInfiniteRequest } from "@shared/utils";
import { QueryKeys } from "@shared/constant";
import { AdminHomeworkAnswerMessage, GetAdminHomeworkAnswerMessagesRequest, lessonApi } from "@entities/lesson";

export const useAdminLessonHomeworkAnswerMessages = (params: GetAdminHomeworkAnswerMessagesRequest) => {
    return useInfiniteRequest<AdminHomeworkAnswerMessage>(
        [QueryKeys.GET_ADMIN_LESSON_HOMEWORK_MESSAGES, params],
        ({ pageParam = 1 }) => lessonApi.getAdminHomeworkAnswerMessages({ ...params, page: pageParam }),
        {
            enabled: !!params.homeworkAnswerId,
        }
    );
};
