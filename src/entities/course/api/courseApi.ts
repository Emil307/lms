import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    GetCourseProgramModuleLessonsRequest,
    GetCourseProgramModuleLessonsResponse,
    GetCourseProgramResponse,
    GetMyCoursesResponse,
    GetCourseReviewsResponse,
    GetCourseTeachersResponse,
    AdminCourseResourcesResponse,
    AdminCoursesRequestParamsType,
    CoursesRequestParamsType,
    $GetAdminCourseResources,
    GetAdminCoursesResponse,
    $GetAdminCoursesResponse,
    GetCoursesResponse,
    $GetCoursesResponse,
    $GetMyCoursesResponse,
    $GetCourseProgramResponse,
    $GetCourseProgramModuleLessonsResponse,
    $GetCourseTeachersResponse,
    $GetCourseReviewsResponse,
    GetCoursesInfiniteRequest,
} from "./types";

class CourseApi extends BaseApi {
    async getAdminCourseResources(): Promise<AdminCourseResourcesResponse> {
        const response = await this.instance.get("admin/courses/resources");
        return $GetAdminCourseResources.parse(response);
    }

    async getAdminCourses({
        isActive,
        tags,
        category,
        teachers,
        discountType,
        ...params
    }: AdminCoursesRequestParamsType): Promise<GetAdminCoursesResponse> {
        const response = await this.instance.post(
            "admin/courses/list",
            {
                filter: {
                    isActive,
                    tagIds: {
                        items: tags,
                        operator: "or",
                    },
                    teacherIds: {
                        items: teachers,
                        operator: "or",
                    },
                    "category.id": category,
                    "discount.type": discountType,
                },
            },
            { params }
        );
        return $GetAdminCoursesResponse.parse(response);
    }

    async getCourses({
        tags,
        categoryId,
        subcategoryId,
        hasDiscount,
        collectionIds,
        packageIds,
        ...params
    }: CoursesRequestParamsType | GetCoursesInfiniteRequest): Promise<GetCoursesResponse> {
        const response = await this.instance.post("courses/list", {
            ...params,
            filter: {
                hasDiscount,
                collectionIds,
                "category.id": categoryId,
                "subcategory.id": subcategoryId,

                ...(tags && {
                    tagIds: {
                        items: tags,
                        operator: "or",
                    },
                }),
                ...(packageIds && {
                    packageIds: {
                        items: [packageIds],
                        operator: "or",
                    },
                }),
            },
        });
        return $GetCoursesResponse.parse(response);
    }

    async getMyCourses(): Promise<GetMyCoursesResponse> {
        const response = await this.instance.get("courses/my");
        return $GetMyCoursesResponse.parse(response);
    }

    async getCourseProgram(courseId: number): Promise<GetCourseProgramResponse> {
        const response = await this.instance.get(`courses/${courseId}/program`);
        return $GetCourseProgramResponse.parse(response);
    }

    async getCourseProgramModuleLessons({
        courseId,
        programId,
    }: GetCourseProgramModuleLessonsRequest): Promise<GetCourseProgramModuleLessonsResponse> {
        const response = await this.instance.get(`/courses/${courseId}/program/${programId}`);
        return $GetCourseProgramModuleLessonsResponse.parse(response);
    }

    async getCourseTeachers(): Promise<GetCourseTeachersResponse> {
        const response = await this.instance.get(`teachers`);
        return $GetCourseTeachersResponse.parse(response);
    }

    async getCourseReviews(courseId: number): Promise<GetCourseReviewsResponse> {
        const response = await this.instance.get(`courses/${courseId}/reviews`);
        return $GetCourseReviewsResponse.parse(response);
    }
}

export const courseApi = new CourseApi(axios);
