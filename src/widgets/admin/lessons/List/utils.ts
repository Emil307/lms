import dayjs from "dayjs";
import { AdminLessonsFilters, GetAdminLessonsRequest } from "@entities/lesson";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminLessonsRequest = ({
    isActive,
    createdAtTo,
    createdAtFrom,
    ...rest
}: TFunctionParams<AdminLessonsFilters>): GetAdminLessonsRequest => ({
    ...rest,
    filter: {
        isActive: isActive === "" ? undefined : isActive,
        ...(createdAtFrom &&
            createdAtTo && {
                createdAt: {
                    items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                    operator: "range",
                },
            }),
    },
});
