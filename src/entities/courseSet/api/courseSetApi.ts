import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $CourseSetDetail, $GetCourseSetsResponse, CourseSetDetail, GetCourseSetsRequest, GetCourseSetsResponse } from "./types";

class CourseSetApi extends BaseApi {
    async getCourseSets(data: GetCourseSetsRequest): Promise<GetCourseSetsResponse> {
        const response = await this.instance.post("course-collections/list", data);
        return $GetCourseSetsResponse.parse(response);
    }

    async getCourseSet(id: string): Promise<CourseSetDetail> {
        const response = await this.instance.get(`course-collections/${id}`);
        return $CourseSetDetail.parse(response);
    }
}

export const courseSetApi = new CourseSetApi(axios);
