import { AdminLesson, UpdateLessonContentFormValues, UpdateLessonContentRequest } from "@entities/lesson";

export const getInitialValues = ({ content, videos }: AdminLesson): UpdateLessonContentFormValues => {
    return {
        hasContent: !!content,
        content: content || "",
        videos,
    };
};

export const adaptDataForUpdateLessonContentRequest = ({
    content,
    videos,
    hasContent,
    id,
}: UpdateLessonContentFormValues & { id: string }): UpdateLessonContentRequest => {
    const videoFileIds = videos.map((video) => video.id);
    return {
        id,
        content: hasContent ? content : "",
        videoFileIds,
    };
};
