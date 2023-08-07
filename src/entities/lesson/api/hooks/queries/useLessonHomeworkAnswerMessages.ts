import { useInfiniteRequest } from "@shared/utils";
import { QueryKeys } from "@shared/constant";
import { GetHomeworkAnswerMessagesRequest, HomeworkAnswerMessageFromList, lessonApi } from "@entities/lesson";

export const useLessonHomeworkAnswerMessages = (params: GetHomeworkAnswerMessagesRequest) => {
    return useInfiniteRequest<HomeworkAnswerMessageFromList>(
        [QueryKeys.GET_LESSON_HOMEWORK_MESSAGES, params],
        ({ pageParam = 1 }) => lessonApi.getHomeworkAnswerMessages({ ...params, page: pageParam }),
        {
            enabled: !!params.homeworkAnswerId,
        }
    );
};
