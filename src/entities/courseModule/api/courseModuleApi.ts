import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateCourseModuleResponse,
    $GetCourseModulesResponse,
    $UpdateCourseModuleActivityResponse,
    $UpdateCourseModuleResponse,
    CreateCourseModuleRequest,
    CreateCourseModuleResponse,
    GetCourseModulesRequest,
    GetCourseModulesResponse,
    GetCourseModuleRequest,
    UpdateCourseModuleActivityRequest,
    UpdateCourseModuleActivityResponse,
    UpdateCourseModuleRequest,
    UpdateCourseModuleResponse,
    GetCourseModuleResponse,
    DeleteCourseModuleRequest,
    $GetCourseModuleResponse,
    DetachLessonFromCourseModuleRequest,
} from "./types";

class CourseModuleApi extends BaseApi {
    async getCourseModules({ courseId, ...params }: GetCourseModulesRequest): Promise<GetCourseModulesResponse> {
        const response = await this.instance.post(`admin/courses/${courseId}/modules/list`, params);
        return $GetCourseModulesResponse.parse(response);
    }

    async getCourseModule({ courseId, moduleId }: GetCourseModuleRequest): Promise<GetCourseModuleResponse> {
        const response = await this.instance.get(`admin/courses/${courseId}/modules/${moduleId}`);
        return $GetCourseModuleResponse.parse(response);
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

    async attachLessonToModule({ courseId, moduleId, ...params }: DetachLessonFromCourseModuleRequest): Promise<void> {
        await this.instance.post(`admin/courses/${courseId}/modules/${moduleId}/lessons`, params);
    }

    async detachLessonFromModule({ courseId, moduleId, ...params }: DetachLessonFromCourseModuleRequest): Promise<void> {
        await this.instance.delete(`admin/courses/${courseId}/modules/${moduleId}/lessons`, { params });
    }
}

export const courseModuleApi = new CourseModuleApi(axios);
