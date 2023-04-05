import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $getMyCoursesResponse, GetMyCoursesResponse } from "./types";

class CourseApi extends BaseApi {
    async getMyCourses(): Promise<GetMyCoursesResponse> {
        const response = await this.instance.get("courses/my");
        return $getMyCoursesResponse.parse(response);
    }
}

export const courseApi = new CourseApi(axios);
