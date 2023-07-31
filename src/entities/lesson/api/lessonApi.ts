import { BaseApi } from "@shared/utils";
import { axios } from "@app/config/axios";
import {
    $CreateLessonResponse,
    $GetAdminLessonResponse,
    $GetAdminLessonsResponse,
    $GetAdminTestResponse,
    $UpdateAdminTestResponse,
    $UpdateLessonActivityResponse,
    $UpdateLessonResponse,
    AttachMaterialsToLessonRequest,
    CreateLessonRequest,
    CreateLessonResponse,
    GetAdminLessonResponse,
    GetAdminLessonsFromModuleRequest,
    GetAdminLessonsRequest,
    GetAdminLessonsResponse,
    GetAdminTestResponse,
    UpdateAdminTestRequest,
    UpdateAdminTestResponse,
    UpdateLessonActivityRequest,
    UpdateLessonActivityResponse,
    UpdateLessonRequest,
    UpdateLessonResponse,
    DetachMaterialsFromLessonRequest,
    UpdateLessonOrderRequest,
    UpdateLessonOrderResponse,
    $UpdateLessonOrderResponse,
    $UpdateLessonContentResponse,
    UpdateLessonContentResponse,
    UpdateLessonContentRequest,
    GetAdminHomeworkResponse,
    $GetAdminHomeworkResponse,
    UpdateAdminHomeworkRequest,
    UpdateAdminHomeworkResponse,
    $UpdateAdminHomeworkResponse,
    GetTestResponse,
    $GetTestResponse,
    GetTestRequest,
    GetTestPassRequest,
    GetTestPassResponse,
    $GetTestPassResponse,
    $UpdateTestPassResponse,
    UpdateTestPassRequest,
    UpdateTestPassResponse,
} from "@entities/lesson";

class LessonApi extends BaseApi {
    //ADMIN
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

    async updateLessonContent({ id, ...data }: UpdateLessonContentRequest): Promise<UpdateLessonContentResponse> {
        const response = await this.instance.put(`admin/lessons/${id}/content`, data);
        return $UpdateLessonContentResponse.parse(response);
    }

    async updateLessonActivity({ id, isActive }: UpdateLessonActivityRequest): Promise<UpdateLessonActivityResponse> {
        const response = await this.instance.put(`admin/lessons/${id}/activity-status`, { isActive });
        return $UpdateLessonActivityResponse.parse(response);
    }

    async deleteLesson(id: string): Promise<void> {
        await this.instance.delete(`admin/lessons/${id}`);
    }

    async updateLessonOrder({ lessonId, ...data }: UpdateLessonOrderRequest): Promise<UpdateLessonOrderResponse> {
        const response = await this.instance.put(`admin/lessons/${lessonId}/order`, data);
        return $UpdateLessonOrderResponse.parse(response);
    }

    async attachMaterialsToLesson({ lessonId, ...data }: AttachMaterialsToLessonRequest): Promise<void> {
        await this.instance.post(`admin/lessons/${lessonId}/files`, data);
    }

    async detachMaterialsFromLesson({ lessonId, ...data }: DetachMaterialsFromLessonRequest): Promise<void> {
        await this.instance.delete(`admin/lessons/${lessonId}/files`, { params: data });
    }

    async getAdminTest(lessonId: string): Promise<GetAdminTestResponse> {
        const response = await this.instance.get(`admin/lessons/${lessonId}/test`);
        return $GetAdminTestResponse.parse(response);
    }

    async updateAdminTest({ lessonId, ...data }: UpdateAdminTestRequest): Promise<UpdateAdminTestResponse> {
        const response = await this.instance.put(`admin/lessons/${lessonId}/test`, data);
        return $UpdateAdminTestResponse.parse(response);
    }

    async getAdminHomework(id: string): Promise<GetAdminHomeworkResponse> {
        const response = await this.instance.get(`admin/lessons/${id}/homework`);
        return $GetAdminHomeworkResponse.parse(response);
    }

    async updateAdminHomework({ id, ...data }: UpdateAdminHomeworkRequest): Promise<UpdateAdminHomeworkResponse> {
        const response = await this.instance.put(`admin/lessons/${id}/homework`, data);
        return $UpdateAdminHomeworkResponse.parse(response);
    }

    //USER
    async getTest({ lessonId }: GetTestRequest): Promise<GetTestResponse> {
        const response = await this.instance.get(`user/lessons/${lessonId}/test`);
        return $GetTestResponse.parse(response);
    }

    async getTestPass({ lessonId }: GetTestPassRequest): Promise<GetTestPassResponse> {
        const response = await this.instance.get(`user/lessons/${lessonId}/test-pass`);
        return $GetTestPassResponse.parse(response);
    }

    async updateTestPass({ lessonId, ...data }: UpdateTestPassRequest): Promise<UpdateTestPassResponse> {
        const response = await this.instance.put(`user/lessons/${lessonId}/test-pass`, data);
        return $UpdateTestPassResponse.parse(response);
    }
}

export const lessonApi = new LessonApi(axios);
