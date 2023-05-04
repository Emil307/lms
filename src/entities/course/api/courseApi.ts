import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $getCourseProgramModuleLessonsResponse,
    $getCourseProgramResponse,
    $getMyCoursesResponse,
    GetCourseProgramModuleLessonsRequest,
    GetCourseProgramModuleLessonsResponse,
    GetCourseProgramResponse,
    GetMyCoursesResponse,
    GetCourseReviewsResponse,
    GetCourseTeachersResponse,
    $getCourseTeachersResponse,
    $getCourseReviewsResponse,
    AdminCourseResourcesResponse,
    $getAdminCourseResources,
    AdminCoursesResponse,
    $adminCoursesResponse,
    AdminCoursesRequestParamsType,
} from "./types";

class CourseApi extends BaseApi {
    async getAdminCourseResources(): Promise<AdminCourseResourcesResponse> {
        const response = await this.instance.get("admin/courses/resources");
        return $getAdminCourseResources.parse(response);
    }

    async getAdminCourses({
        isActive,
        tags,
        category,
        teachers,
        discountType,
        ...params
    }: AdminCoursesRequestParamsType): Promise<AdminCoursesResponse> {
        const response = await this.instance.post(
            "admin/courses/list",
            {
                filter: {
                    isActive,
                    // createdAt,
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
            {
                params: {
                    ...params,
                },
            }
        );
        return $adminCoursesResponse.parse(response);
    }

    async getMyCourses(): Promise<GetMyCoursesResponse> {
        const response = await this.instance.get("courses/my");
        return $getMyCoursesResponse.parse(response);
    }

    async getCourseProgram(courseId: number): Promise<GetCourseProgramResponse> {
        const response = await this.instance.get(`courses/${courseId}/program`);
        return $getCourseProgramResponse.parse(response);
    }

    async getCourseProgramModuleLessons({
        courseId,
        programId,
    }: GetCourseProgramModuleLessonsRequest): Promise<GetCourseProgramModuleLessonsResponse> {
        const response = await this.instance.get(`/courses/${courseId}/program/${programId}`);
        return $getCourseProgramModuleLessonsResponse.parse(response);
    }

    async getCourseTeachers(): Promise<GetCourseTeachersResponse> {
        const response = await this.instance.get(`teachers`);
        return $getCourseTeachersResponse.parse(response);
    }

    async getCourseReviews(courseId: number): Promise<GetCourseReviewsResponse> {
        const response = await this.instance.get(`courses/${courseId}/reviews`);
        return $getCourseReviewsResponse.parse(response);
    }
}

export const courseApi = new CourseApi(axios);
