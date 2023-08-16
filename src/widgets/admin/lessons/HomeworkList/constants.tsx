import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { Badge } from "@mantine/core";
import { getFullName } from "@shared/utils";
import { AdminHomeworkAnswerFromList } from "@entities/lesson";
import { AdminHomeworkAnswersFilters } from "./types";
import { useCellStyles } from "./HomeworkList.styles";

export const columnOrder = [
    "student.profile.fullName",
    "course.name",
    "group.name",
    "module.name",
    "homework.lesson.name",
    "updatedAt",
    "requiredType",
    "status.name",
];

export const columns: MRT_ColumnDef<AdminHomeworkAnswerFromList>["columns"] = [
    {
        header: "Ученик",
        accessorKey: "student.profile",
        id: "student.profile.fullName",
        accessorFn: ({ student }) => getFullName({ data: student.profile, startWithLastName: true, hidePatronymic: true }),
    },
    {
        header: "Учебный курс",
        accessorKey: "course.name",
        size: 180,
    },
    {
        header: "Группа",
        accessorKey: "group.name",
        size: 180,
    },
    {
        header: "Модуль",
        accessorKey: "module.name",
        size: 180,
    },
    {
        header: "Урок",
        accessorKey: "homework.lesson.name",
        size: 180,
    },
    {
        header: "Обязательность",
        accessorKey: "homework.requiredType",
        id: "requiredType",
        accessorFn: ({ homework }) => (homework.requiredType === "required" ? "Да" : "Нет"),
        size: 180,
    },
    {
        header: "Дата выполнения",
        accessorKey: "updatedAt",
        accessorFn: ({ updatedAt }) => dayjs(updatedAt).format("DD.MM.YYYY"),
        size: 180,
    },
    {
        header: "Статус",
        accessorKey: "status.name",
        Cell: ({ cell }) => {
            const status = cell.row.original.status.name;
            const { classes } = useCellStyles({ status });
            switch (status) {
                case "onReview":
                    return (
                        <Badge variant="outline" className={classes.status}>
                            Проверка
                        </Badge>
                    );
                case "needsEdit":
                    return (
                        <Badge variant="outline" className={classes.status}>
                            На доработку
                        </Badge>
                    );
                case "completed":
                    return (
                        <Badge variant="outline" className={classes.status}>
                            Выполнено
                        </Badge>
                    );
            }
        },
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "На проверке", value: "onReview" },
    { id: "3", label: "На доработке", value: "needsEdit" },
    { id: "4", label: "Выполнено", value: "completed" },
];

export const filterInitialValues: AdminHomeworkAnswersFilters = {
    query: "",
    status: "",
    studentId: "",
    courseId: "",
    updatedAtFrom: null,
    updatedAtTo: null,
};
