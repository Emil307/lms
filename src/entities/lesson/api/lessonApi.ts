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
    GetHomeworkRequest,
    GetHomeworkResponse,
    $GetHomeworkResponse,
    UpdateHomeworkAnswerRequest,
    UpdateHomeworkAnswerResponse,
    $UpdateHomeworkAnswerResponse,
    GetAdminHomeworkAnswerResponse,
    $GetAdminHomeworkAnswerResponse,
    UpdateAdminHomeworkAnswerStatusRequest,
    UpdateAdminHomeworkAnswerStatusResponse,
    $UpdateAdminHomeworkAnswerStatusResponse,
    GetAdminHomeworkAnswersRequest,
    GetAdminHomeworkAnswersResponse,
    $GetAdminHomeworkAnswersResponse,
    GetAdminHomeworkAnswersResourcesResponse,
    $GetAdminHomeworkAnswersResourcesResponse,
    GetAdminHomeworkAnswersResourcesRequest,
    GetAdminHomeworkAnswerMessagesRequest,
    GetAdminHomeworkAnswerMessagesResponse,
    $GetAdminHomeworkAnswerMessagesResponse,
    CreateAdminHomeworkAnswerMessageRequest,
    CreateAdminHomeworkAnswerMessageResponse,
    $CreateAdminHomeworkAnswerMessageResponse,
    GetLessonRequest,
    GetLessonResponse,
    $GetLessonResponse,
    GetHomeworkAnswerMessagesRequest,
    GetHomeworkAnswerMessagesResponse,
    $GetHomeworkAnswerMessagesResponse,
    CreateHomeworkAnswerMessageRequest,
    CreateHomeworkAnswerMessageResponse,
    $CreateHomeworkAnswerMessageResponse,
    FinishLessonRequest,
    FinishLessonResponse,
    $FinishLessonResponse,
    GetLessonByGroupRequest,
} from "@entities/lesson";

export class LessonApi extends BaseApi {
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

    async getAdminHomeworkAnswersResources(
        params: GetAdminHomeworkAnswersResourcesRequest,
    ): Promise<GetAdminHomeworkAnswersResourcesResponse> {
        const response = await this.instance.get("admin/lessons/homeworks/answers/resources", { params });
        return $GetAdminHomeworkAnswersResourcesResponse.parse(response);
    }

    async getAdminHomeworkAnswers(params: GetAdminHomeworkAnswersRequest): Promise<GetAdminHomeworkAnswersResponse> {
        const response = await this.instance.post(`admin/lessons/homeworks/answers/list`, params);
        return $GetAdminHomeworkAnswersResponse.parse(response);
    }

    async getAdminHomeworkAnswer(id: string): Promise<GetAdminHomeworkAnswerResponse> {
        const response = await this.instance.get(`admin/lessons/homeworks/answers/${id}`);
        return $GetAdminHomeworkAnswerResponse.parse(response);
    }

    async updateAdminHomeworkAnswerStatus({
        id,
        ...data
    }: UpdateAdminHomeworkAnswerStatusRequest): Promise<UpdateAdminHomeworkAnswerStatusResponse> {
        const response = await this.instance.put(`admin/lessons/homeworks/answers/${id}/status`, data);
        return $UpdateAdminHomeworkAnswerStatusResponse.parse(response);
    }

    async getAdminHomeworkAnswerMessages({
        homeworkAnswerId,
        ...params
    }: GetAdminHomeworkAnswerMessagesRequest): Promise<GetAdminHomeworkAnswerMessagesResponse> {
        const response = await this.instance.get(`admin/lessons/homeworks/answers/${homeworkAnswerId}/messages`, { params });
        return $GetAdminHomeworkAnswerMessagesResponse.parse(response);
    }

    async createAdminHomeworkAnswerMessage({
        homeworkAnswerId,
        ...data
    }: CreateAdminHomeworkAnswerMessageRequest): Promise<CreateAdminHomeworkAnswerMessageResponse> {
        const response = await this.instance.post(`admin/lessons/homeworks/answers/${homeworkAnswerId}/messages`, data);
        return $CreateAdminHomeworkAnswerMessageResponse.parse(response);
    }

    //USER
    async getLesson({ id, courseId }: GetLessonRequest): Promise<GetLessonResponse> {
        const response = await this.instance.get(`user/courses/${courseId}/lessons/${id}`);
        return $GetLessonResponse.parse(response);
    }
    async getLessonByGroup({ id, groupId }: GetLessonByGroupRequest): Promise<GetLessonResponse> {
        const response = await this.instance.get(`user/groups/${groupId}/lessons/${id}`);
        return $GetLessonResponse.parse(response);
    }
    async finishLesson({ courseId, lessonId }: FinishLessonRequest): Promise<FinishLessonResponse> {
        const response = await this.instance.post(`user/courses/${courseId}/lessons/${lessonId}/finish`);
        return $FinishLessonResponse.parse(response);
    }

    //test
    async getTest({ lessonId, groupId }: GetTestRequest): Promise<GetTestResponse> {
        const response = await this.instance.get(`user/groups/${groupId}/lessons/${lessonId}/test`);
        return $GetTestResponse.parse(response);
    }

    async getTestPass({ lessonId, groupId }: GetTestPassRequest): Promise<GetTestPassResponse> {
        const response = await this.instance.get(`user/groups/${groupId}/lessons/${lessonId}/test-pass`);
        return $GetTestPassResponse.parse(response);
    }

    async updateTestPass({ lessonId, courseId, ...data }: UpdateTestPassRequest): Promise<UpdateTestPassResponse> {
        const response = await this.instance.put(`user/courses/${courseId}/lessons/${lessonId}/test-pass`, data);
        return $UpdateTestPassResponse.parse(response);
    }

    //homework
    async getHomework({ lessonId, groupId }: GetHomeworkRequest): Promise<GetHomeworkResponse> {
        const response = await this.instance.get(`user/groups/${groupId}/lessons/${lessonId}/homework`);
        return $GetHomeworkResponse.parse(response);
    }

    async updateHomeworkAnswer({ lessonId, courseId, ...data }: UpdateHomeworkAnswerRequest): Promise<UpdateHomeworkAnswerResponse> {
        const response = await this.instance.put(`user/courses/${courseId}/lessons/${lessonId}/homework-answers`, data);
        return $UpdateHomeworkAnswerResponse.parse(response);
    }

    async getHomeworkAnswerMessages({
        homeworkAnswerId,
        courseId,
        ...params
    }: GetHomeworkAnswerMessagesRequest): Promise<GetHomeworkAnswerMessagesResponse> {
        const response = await this.instance.get(`user/courses/${courseId}/lessons/homework-answers/${homeworkAnswerId}/messages`, {
            params,
        });
        return $GetHomeworkAnswerMessagesResponse.parse(response);
    }

    async createHomeworkAnswerMessage({
        homeworkAnswerId,
        courseId,
        ...data
    }: CreateHomeworkAnswerMessageRequest): Promise<CreateHomeworkAnswerMessageResponse> {
        const response = await this.instance.post(`user/courses/${courseId}/lessons/homework-answers/${homeworkAnswerId}/messages`, data);
        return $CreateHomeworkAnswerMessageResponse.parse(response);
    }
}

export const lessonApi = new LessonApi(axios);
