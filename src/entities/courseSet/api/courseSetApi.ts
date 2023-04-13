import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $courseSet, $getCourseSetsResponse, CourseSet, GetCourseSetRequest, GetCourseSetsRequest, GetCourseSetsResponse } from "./types";

class CourseSetApi extends BaseApi {
    async getCourseSets(params: GetCourseSetsRequest): Promise<GetCourseSetsResponse> {
        const response = await this.instance.get("course-packages", { params });
        return $getCourseSetsResponse.parse(response);
    }
    async getCourseSet({ id, ...params }: GetCourseSetRequest): Promise<CourseSet> {
        const response = await this.instance.get(`course-packages/${id}`, { params });
        return $courseSet.parse(response);
    }
}

export const courseSetApi = new CourseSetApi(axios);
