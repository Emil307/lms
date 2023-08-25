import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $AdminCoursePackageDetails,
    $CoursePackageDetails,
    $GetAdminCoursePackageResoursesResponse,
    $GetAdminCoursePackagesResponse,
    $GetCoursePackagesResponse,
    $UpdateCoursePackageActivityResponse,
    AdminCoursePackageDetails,
    AttachCourseToCoursePackageRequest,
    CoursePackageDetails,
    CreateCoursePackageRequest,
    DeleteCourseFromCoursePackageRequest,
    GetAdminCoursePackageResoursesRequest,
    GetAdminCoursePackageResoursesResponse,
    GetAdminCoursePackagesRequest,
    GetAdminCoursePackagesResponse,
    GetCoursePackagesRequest,
    GetCoursePackagesResponse,
    UpdateCoursePackageActivityRequest,
    UpdateCoursePackageActivityResponse,
    UpdateCoursePackageRequest,
} from "./types";

export class CoursePackageApi extends BaseApi {
    async getAdminCoursePackageResourses(params: GetAdminCoursePackageResoursesRequest): Promise<GetAdminCoursePackageResoursesResponse> {
        const response = await this.instance.get("admin/course-packages/resources", { params });
        return $GetAdminCoursePackageResoursesResponse.parse(response);
    }

    async getCoursePackages(params: GetCoursePackagesRequest): Promise<GetCoursePackagesResponse> {
        const response = await this.instance.post("course-packages/list", params);
        return $GetCoursePackagesResponse.parse(response);
    }

    async getAdminCoursePackages(params: GetAdminCoursePackagesRequest): Promise<GetAdminCoursePackagesResponse> {
        const response = await this.instance.post("admin/course-packages/list", params);
        return $GetAdminCoursePackagesResponse.parse(response);
    }

    async getCoursePackage(id?: string): Promise<CoursePackageDetails> {
        const response = await this.instance.get(`course-packages/${id}`);
        return $CoursePackageDetails.parse(response);
    }

    async getAdminCoursePackage(id?: string): Promise<AdminCoursePackageDetails> {
        const response = await this.instance.get(`admin/course-packages/${id}`);
        return $AdminCoursePackageDetails.parse(response);
    }

    async createCoursePackage(data: CreateCoursePackageRequest): Promise<AdminCoursePackageDetails> {
        const response = await this.instance.post(`admin/course-packages`, data);
        return $AdminCoursePackageDetails.parse(response);
    }

    async updateCoursePackage({ id, ...data }: UpdateCoursePackageRequest): Promise<AdminCoursePackageDetails> {
        const response = await this.instance.put(`admin/course-packages/${id}`, data);
        return $AdminCoursePackageDetails.parse(response);
    }

    async updateCoursePackageActivity({ id, isActive }: UpdateCoursePackageActivityRequest): Promise<UpdateCoursePackageActivityResponse> {
        const response = await this.instance.put(`admin/course-packages/${id}/activity-status`, { isActive });
        return $UpdateCoursePackageActivityResponse.parse(response);
    }

    async deleteCoursePackage(id: string): Promise<void> {
        await this.instance.delete(`admin/course-packages/${id}`);
    }

    //COURSES FROM COURSE_PACKAGE
    async attachCoursesToCoursePackage({ coursePackageId, ...data }: AttachCourseToCoursePackageRequest): Promise<void> {
        await this.instance.post(`admin/course-packages/${coursePackageId}/courses`, data);
    }

    async deleteCourseFromCoursePackage({ coursePackageId, ...data }: DeleteCourseFromCoursePackageRequest): Promise<void> {
        await this.instance.delete(`admin/course-packages/${coursePackageId}/courses`, { data });
    }
}

export const coursePackageApi = new CoursePackageApi(axios);
