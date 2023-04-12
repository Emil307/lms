import { CreateGroupRequest } from "@entities/group";

export const initialValuesCreateGroupForm: CreateGroupRequest = {
    name: "",
    courseName: null,
    educationFrom: null,
    educationTo: null,
    maxStudents: null,
    teacherId: null,
    isActive: false,
};
