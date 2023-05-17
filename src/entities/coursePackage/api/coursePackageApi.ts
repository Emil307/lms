import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $CoursePackageDetail, $GetCoursePackagesResponse, CoursePackageDetail, GetCoursePackagesResponse } from "./types";

class CoursePackageApi extends BaseApi {
    async getCoursePackages(): Promise<GetCoursePackagesResponse> {
        const response = await this.instance.post("course-packages/list");
        return $GetCoursePackagesResponse.parse(response);
    }

    async getCoursePackage(id?: string): Promise<CoursePackageDetail> {
        const response = await this.instance.get(`course-packages/${id}`);
        return $CoursePackageDetail.parse(response);
    }
}

export const coursePackageApi = new CoursePackageApi(axios);
