import { CreateGroupRequest, Group } from "@entities/group";

export const adaptDataForEditGroupForm = (group?: Group): Partial<CreateGroupRequest> => {
    return {
        name: group?.name,
        courseName: group?.courseName,
        educationFrom: group?.education.to,
        educationTo: group?.education.to,
        maxStudents: group?.students,
        //TODO: Ждем фиксов со стороны бекенда
        // teacherId: group.,
        isActive: !!group?.isActive,
    };
};
