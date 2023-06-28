import dayjs from "dayjs";
import { getFullName } from "@shared/utils";
import { GetAdminCourseReviewResponse } from "@entities/courseReview";
import { CourseReviewCardInfoFields } from "./types";

export const getDataInfoCard = (data?: GetAdminCourseReviewResponse): CourseReviewCardInfoFields => {
    return {
        fio: getFullName({ data: data?.user.profile }),
        courseName: data?.group.course.name || "",
        createdAt: dayjs(data?.createdAt).format("DD.MM.YYYY HH:mm") || "",
    };
};
