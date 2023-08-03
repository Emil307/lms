import { AdminHomework, UpdateAdminHomeworkFormValues, UpdateAdminHomeworkRequest } from "@entities/lesson";

export const getInitialValues = (homework: AdminHomework | null): UpdateAdminHomeworkFormValues => {
    if (!homework) {
        return {
            content: "",
            files: [],
            requiredType: "notRequired",
        };
    }
    const { id, ...rest } = homework;
    return rest;
};

export const adaptDataForUpdateHomeworkRequest = ({
    files,
    ...rest
}: UpdateAdminHomeworkFormValues & { id: string }): UpdateAdminHomeworkRequest => {
    const fileIds = files.map((file) => file.id);

    return {
        ...rest,
        fileIds,
    };
};
