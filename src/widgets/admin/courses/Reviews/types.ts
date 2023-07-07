import { AdminCourseReviewFiltersForm } from "@entities/courseReview";

export type AdminCourseReviewsFiltersForm = Omit<AdminCourseReviewFiltersForm, "courseId">;

export type AdminCourseReviewsExtraParams = {
    courseId: string;
};
