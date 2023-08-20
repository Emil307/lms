import { GetHomeworkResponse, UpdateHomeworkAnswerRequest } from "@entities/lesson";
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
