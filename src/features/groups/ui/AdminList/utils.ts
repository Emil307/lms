import dayjs from "dayjs";
import { z } from "zod";
import { AdminGroupsFiltersForm, GetAdminGroupsRequest } from "@entities/group";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminGroupsRequest = (params: TFunctionParams<AdminGroupsFiltersForm>): GetAdminGroupsRequest => {
    const { isActive, courseId, teacherId, createdAtFrom, createdAtTo, statusType, ...rest } = params;

    return {
        ...rest,
        filter: {
            "course.id": courseId,
            "teacher.id": teacherId,
            "status.type": statusType,
            ...(z.coerce.number().safeParse(isActive).success && {
                isActive: isActive === "1",
            }),
            ...(createdAtFrom &&
                createdAtTo && {
                    createdAt: {
                        items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                        operator: "range",
                    },
                }),
        },
    };
};
