import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $getCourseSetsResponse, GetCourseSetsRequest, GetCourseSetsResponse } from "./types";

class CourseSetApi extends BaseApi {
    async getCourseSets(params: GetCourseSetsRequest): Promise<GetCourseSetsResponse> {
        const response = await this.instance.get("course-packages", { params });
        return $getCourseSetsResponse.parse(response);
    }
}

export const courseSetApi = new CourseSetApi(axios);
