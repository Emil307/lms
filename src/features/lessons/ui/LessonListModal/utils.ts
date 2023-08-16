import dayjs from "dayjs";
import { AdminSelectLessonsExtraFilters, AdminSelectLessonsFilters, GetAdminLessonsRequest } from "@entities/lesson";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminLessonsRequest = ({
    createdAtFrom,
    createdAtTo,
    courseIds,
    ...rest
}: TFunctionParams<AdminSelectLessonsFilters, AdminSelectLessonsExtraFilters>): GetAdminLessonsRequest => {
    return {
        ...rest,
        filter: {
            courseIds: {
                items: courseIds,
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
