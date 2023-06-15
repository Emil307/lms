import { BaseApi } from "@shared/utils";
import { axios } from "@app/config/axios";
import {
    $CreateLessonResponse,
    $GetAdminLessonsResponse,
    $UpdateLessonActivityResponse,
    $UpdateLessonResponse,
    CreateLessonRequest,
    CreateLessonResponse,
    GetAdminLessonsRequest,
    GetAdminLessonsResponse,
    GetAdminSelectLessonsRequest,
    UpdateLessonActivityRequest,
    UpdateLessonActivityResponse,
    UpdateLessonRequest,
    UpdateLessonResponse,
} from "@entities/lesson";

class LessonApi extends BaseApi {
    async getAdminLessons(params: GetAdminLessonsRequest | GetAdminSelectLessonsRequest): Promise<GetAdminLessonsResponse> {
        const response = await this.instance.post("admin/lessons/list", params);
        return $GetAdminLessonsResponse.parse(response);
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
    //
    // async deleteLesson(id: string): Promise<void> {
    //     await this.instance.delete(`admin/courses/${id}`);
    // }
    //
}

export const lessonApi = new LessonApi(axios);
