import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminCourseReviewFiltersForm, AdminCourseReviewFromList } from "@entities/courseReview";
import { getFullName } from "@shared/utils";

export const columnOrder = [
    "id",
    "group.course.name",
    "fullName",
    "content",
    "group.name",
    "score",
    "createdAt",
    "publishedAt",
    "mrt-row-actions",
];

export const columns: MRT_ColumnDef<AdminCourseReviewFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Курс",
        accessorKey: "group.course.name",
        size: 185,
    },
    {
        header: "ФИО",
        accessorKey: "user.profile",
        id: "fullName",
        accessorFn: ({ user }) => getFullName({ data: user.profile }),
        size: 185,
    },
    {
        header: "Отзыв",
        accessorKey: "content",
        size: 185,
    },
    {
        header: "Группа",
        accessorKey: "group.name",
        size: 160,
    },
    {
        header: "Оценка",
        accessorKey: "score",
        size: 160,
    },
    {
        header: "Дата отзыва",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
        size: 160,
    },
    {
        header: "Опубликован",
        accessorKey: "publishedAt",
        accessorFn: ({ publishedAt }) => (publishedAt ? dayjs(publishedAt).format("DD.MM.YYYY") : ""),
        size: 160,
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

export const filterInitialValues: AdminCourseReviewFiltersForm = {
    isPublished: "",
    query: "",
    courseId: "",
    createdAtFrom: null,
    createdAtTo: null,
    score: "",
};
