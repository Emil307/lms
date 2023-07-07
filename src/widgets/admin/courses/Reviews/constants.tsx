import { MRT_ColumnDef } from "mantine-react-table";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
import { Tooltip } from "@shared/ui";
import { AdminCourseReviewFromList } from "@entities/courseReview";
import { getFullName } from "@shared/utils";
import { AdminCourseReviewsFiltersForm } from "./types";

export const columnOrder = ["id", "fullName", "content", "group.name", "score", "createdAt", "publishedAt", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCourseReviewFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "ФИО",
        accessorKey: "user.profile",
        id: "fullName",
        Cell: ({ cell }) => <>{getFullName({ data: cell.row.original.user?.profile })}</>,
    },
    {
        header: "Отзыв",
        accessorKey: "content",
        Cell: ({ row }) => {
            return (
                <Tooltip label={row.original.content}>
                    <Text lineClamp={1}>{row.original.content}</Text>
                </Tooltip>
            );
        },
    },
    {
        header: "Группа",
        accessorKey: "group.name",
    },
    {
        header: "Оценка",
        accessorKey: "score",
    },
    {
        header: "Дата отзыва",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
    {
        header: "Опубликован",
        accessorKey: "publishedAt",
        accessorFn: ({ publishedAt }) => (publishedAt ? dayjs(publishedAt).format("DD.MM.YYYY") : ""),
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Опубликован", value: "1" },
    { id: "3", label: "Скрыт", value: "0" },
];

export const scoreOptions = [
    {
        value: "0",
        label: "0 звезд",
    },
    {
        value: "1",
        label: "1 звезда",
    },
    {
        value: "2",
        label: "2 звезды",
    },
    {
        value: "3",
        label: "3 звезды",
    },
    {
        value: "4",
        label: "4 звезды",
    },
    {
        value: "5",
        label: "5 звезд",
    },
];

export const filterInitialValues: AdminCourseReviewsFiltersForm = {
    isPublished: "",
    query: "",
    createdAtFrom: null,
    createdAtTo: null,
    score: "",
};
