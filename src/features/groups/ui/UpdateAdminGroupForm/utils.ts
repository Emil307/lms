import dayjs from "dayjs";
import { GetAdminGroupResponse, UpdateAdminGroupRequest } from "@entities/group";
import { UpdateGroupFormValidation } from "./types";
import { initialValues } from "./constant";

export const adaptUpdateAdminGroupForm = (data?: GetAdminGroupResponse): UpdateGroupFormValidation => {
    return {
        ...initialValues,
        ...(data && {
            ...data,
            educationStartDate: new Date(String(data.educationStartDate)),
            educationFinishDate: new Date(String(data.educationFinishDate)),
        }),
        courseId: String(data?.course.id),
        teacherId: data?.teacher ? data.teacher.id.toString() : "",
    };
};

export const adaptUpdateAdminGroupRequest = (data: UpdateGroupFormValidation): Omit<UpdateAdminGroupRequest, "id"> => {
    const { courseId, teacherId, maxStudentsCount, educationStartDate, educationFinishDate, ...rest } = data;
    return {
        ...rest,
        courseId: Number(courseId),
        ...(teacherId && {
            teacherId: Number(teacherId),
        }),
        maxStudentsCount: Number(maxStudentsCount),
        educationStartDate: dayjs(educationStartDate).format("YYYY-MM-DD"),
        educationFinishDate: dayjs(educationFinishDate).format("YYYY-MM-DD"),
    };
};
