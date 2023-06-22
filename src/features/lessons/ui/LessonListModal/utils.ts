import dayjs from "dayjs";
import { AdminSelectLessonsExtraFilters, AdminSelectLessonsFilters, GetAdminSelectLessonsRequest } from "@entities/lesson";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminLessonsRequest = ({
    createdAtFrom,
    createdAtTo,
    moduleIds,
    ...rest
}: TFunctionParams<AdminSelectLessonsFilters, AdminSelectLessonsExtraFilters>): GetAdminSelectLessonsRequest => {
    return {
        ...rest,
        filter: {
            moduleIds: {
                items: moduleIds,
                operator: "not",
            },
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
