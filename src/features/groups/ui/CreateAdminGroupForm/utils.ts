import dayjs from "dayjs";
import { CreateAdminGroupRequest } from "@entities/group";
import { CreateGroupFormValidation } from "./types";

export const adaptCreateAdminGroupRequest = (data: CreateGroupFormValidation): CreateAdminGroupRequest => {
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
