import dayjs from "dayjs";
import { MRT_Cell } from "mantine-react-table";
import { AdminHomeworkAnswerFromList, GetAdminHomeworkAnswersRequest } from "@entities/lesson";
import { TCellBadge, TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminHomeworkAnswersFilters } from "./types";

export const adaptGetAdminHomeworkAnswersRequest = ({
    status,
    courseId,
    updatedAtFrom,
    updatedAtTo,
    studentId,
    ...rest
}: TFunctionParams<AdminHomeworkAnswersFilters>): GetAdminHomeworkAnswersRequest => ({
    ...rest,
    filter: {
        status: status === "" ? undefined : status,
        "course.id": courseId,
        "student.id": studentId,
        ...(updatedAtFrom &&
            updatedAtTo && {
                updatedAt: {
                    items: [dayjs(updatedAtFrom).format("YYYY-MM-DD"), dayjs(updatedAtTo).endOf("day").format()],
                    operator: "range",
                },
            }),
    },
});

export const getBadgeColors = (cell: MRT_Cell<AdminHomeworkAnswerFromList>): TCellBadge[] => {
    return [
        {
            condition: cell.row.original.status?.name === "onReview",
            color: "error",
        },
        {
            condition: cell.row.original.status?.name === "needsEdit",
            color: "warning",
        },
        {
            condition: cell.row.original.status?.name === "completed",
            color: "done",
        },
    ];
};
