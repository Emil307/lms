import { BaseApi } from "@shared/utils";
import { axios } from "@app/config/axios";
import {
    $CreateLessonResponse,
    $GetAdminLessonResponse,
    $GetAdminLessonsResponse,
    $UpdateLessonActivityResponse,
    $UpdateLessonResponse,
    AttachMaterialsToLessonRequest,
    CreateLessonRequest,
    CreateLessonResponse,
    GetAdminLessonResponse,
    GetAdminLessonsFromModuleRequest,
    GetAdminLessonsRequest,
    GetAdminLessonsResponse,
    UpdateLessonActivityRequest,
    UpdateLessonActivityResponse,
    UpdateLessonRequest,
    UpdateLessonResponse,
    DetachMaterialsFromLessonRequest,
} from "@entities/lesson";

class LessonApi extends BaseApi {
    async getAdminLessons(params: GetAdminLessonsFromModuleRequest | GetAdminLessonsRequest): Promise<GetAdminLessonsResponse> {
        const response = await this.instance.post("admin/lessons/list", params);
        return $GetAdminLessonsResponse.parse(response);
    }

    async getAdminLesson(id: string): Promise<GetAdminLessonResponse> {
        const response = await this.instance.get(`admin/lessons/${id}`);
        return $GetAdminLessonResponse.parse(response);
    }

    async createLesson(data: CreateLessonRequest): Promise<CreateLessonResponse> {
        const response = await this.instance.post("admin/lessons", data);
        return $CreateLessonResponse.parse(response);
    }

    async updateLesson({ id, ...data }: UpdateLessonRequest): Promise<UpdateLessonResponse> {
        const response = await this.instance.put(`admin/lessons/${id}`, data);
        return $UpdateLessonResponse.parse(response);
    }

    async updateLessonActivity({ id, isActive }: UpdateLessonActivityRequest): Promise<UpdateLessonActivityResponse> {
        const response = await this.instance.put(`admin/lessons/${id}/activity-status`, { isActive });
        return $UpdateLessonActivityResponse.parse(response);
    }

    async deleteLesson(id: string): Promise<void> {
        await this.instance.delete(`admin/lessons/${id}`);
    }

    async attachMaterialsToLesson({ lessonId, ...data }: AttachMaterialsToLessonRequest): Promise<void> {
        await this.instance.post(`admin/lessons/${lessonId}/files`, data);
    }

    async detachMaterialsFromLesson({ lessonId, ...data }: DetachMaterialsFromLessonRequest): Promise<void> {
        await this.instance.delete(`admin/lessons/${lessonId}/files`, { params: data });
    }
}

export const lessonApi = new LessonApi(axios);
