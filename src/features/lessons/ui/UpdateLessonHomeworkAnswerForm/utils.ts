import { GetHomeworkResponse, UpdateHomeworkAnswerRequest } from "@entities/lesson";
import { UpdateLessonHomeworkAnswerFormValidation } from "./types";

export const getInitialValues = (data?: GetHomeworkResponse): UpdateLessonHomeworkAnswerFormValidation => {
    return {
        answer: data?.answers[0]?.answer || "",
        files: data?.answers[0]?.files || [],
    };
};

export const adaptUpdateLessonHomeworkAnswerRequest = (
    data: UpdateLessonHomeworkAnswerFormValidation
): Omit<UpdateHomeworkAnswerRequest, "lessonId" | "groupId"> => {
    const { files, ...rest } = data;
    return {
        ...rest,
        fileIds: files.map(({ id }) => id),
    };
};
