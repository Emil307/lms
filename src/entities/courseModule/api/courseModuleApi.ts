import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateCourseModuleResponse,
    $GetCourseModulesResponse,
    $UpdateCourseModuleActivityResponse,
    $UpdateCourseModuleResponse,
    CreateCourseModuleRequest,
    CreateCourseModuleResponse,
    DeleteCourseModuleRequest,
    GetCourseModulesRequest,
    GetCourseModulesResponse,
    UpdateCourseModuleActivityRequest,
    UpdateCourseModuleActivityResponse,
    UpdateCourseModuleRequest,
    UpdateCourseModuleResponse,
} from "./types";

class CourseModuleApi extends BaseApi {
    async getCourseModules({ courseId, ...params }: GetCourseModulesRequest): Promise<GetCourseModulesResponse> {
        const response = await this.instance.post(`admin/courses/${courseId}/modules/list`, params);
        return $GetCourseModulesResponse.parse(response);
    }

    async createModule({ courseId, ...data }: CreateCourseModuleRequest): Promise<CreateCourseModuleResponse> {
        const response = await this.instance.post(`admin/courses/${courseId}/modules`, data);
        return $CreateCourseModuleResponse.parse(response);
    }

    async updateModule({ courseId, moduleId, ...data }: UpdateCourseModuleRequest): Promise<UpdateCourseModuleResponse> {
        const response = await this.instance.put(`admin/courses/${courseId}/modules/${moduleId}`, data);
        return $UpdateCourseModuleResponse.parse(response);
    }

    async updateModuleActivity({
        courseId,
        moduleId,
        isActive,
    }: UpdateCourseModuleActivityRequest): Promise<UpdateCourseModuleActivityResponse> {
        const response = await this.instance.put(`admin/courses/${courseId}/modules/${moduleId}/activity-status`, { isActive });
        return $UpdateCourseModuleActivityResponse.parse(response);
    }

    async deleteModule({ courseId, moduleId }: DeleteCourseModuleRequest): Promise<void> {
        await this.instance.delete(`admin/courses/${courseId}/modules/${moduleId}`);
    }
}

export const courseModuleApi = new CourseModuleApi(axios);
