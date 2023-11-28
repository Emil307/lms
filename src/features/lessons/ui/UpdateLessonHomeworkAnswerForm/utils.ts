import { GetHomeworkResponse, UpdateHomeworkAnswerRequest } from "@entities/lesson";
import { EntityNames, QueryKeys } from "@shared/constant";
import { UpdateLessonHomeworkAnswerFormValidation } from "./types";

export const getInitialValues = (data?: GetHomeworkResponse): UpdateLessonHomeworkAnswerFormValidation => {
    return {
        answer: data?.answer?.answer || "",
        files: data?.answer?.files || [],
    };
};

export const adaptUpdateLessonHomeworkAnswerRequest = (
    data: UpdateLessonHomeworkAnswerFormValidation
): Omit<UpdateHomeworkAnswerRequest, "lessonId" | "courseId"> => {
    const { files, ...rest } = data;
    return {
        ...rest,
        fileIds: files.map(({ id }) => id),
    };
};

interface GetKeysInvalidateQueriesParams {
    lessonId: string;
    courseId: string;
}

export const getKeysInvalidateQueries = ({ lessonId, courseId }: GetKeysInvalidateQueriesParams) => [
    { queryKey: [QueryKeys.GET_LESSON_HOMEWORK] },
    {
        queryKey: [
            QueryKeys.GET_LESSON,
            [EntityNames.LESSON, EntityNames.LESSON_HOMEWORK, EntityNames.LESSON_TEST, EntityNames.MATERIAL],
            lessonId,
            courseId,
        ],
    },
];
