import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCourseFromList, AdminCoursesFiltersForm } from "@entities/course";
import { getHumanDate, getLocaleString } from "@shared/utils";
import { getSurnameWithInitials } from "@shared/utils/getSurnameWithInitials";

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Название",
        accessorKey: "name",
        size: 170,
    },
    {
        header: "Категория",
        accessorKey: "category",
        id: "category.name",
        Cell: ({ cell }) => <>{cell.row.original.category?.name}</>,
        size: 170,
    },
    {
        header: "Теги",
        accessorKey: "tags",
        Cell: ({ cell }) => <>{cell.row.original.tags.map((tag) => tag.name).join(", ")}</>,
        enableSorting: false,
        size: 160,
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        Cell: ({ cell }) => (
            <>
                {getHumanDate(cell.getValue() as Date, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </>
        ),
        size: 160,
    },
    {
        header: "Преподаватели",
        accessorKey: "teachers",
        Cell: ({ cell }) => <>{cell.row.original.teachers.map((teacher) => getSurnameWithInitials(teacher.profile)).join(", ")}</>,
        enableSorting: false,
        size: 170,
    },
    {
        header: "Стоимость",
        accessorKey: "price",
        Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.price })}</>,
        size: 160,
    },
    {
        header: "Скидка",
        accessorKey: "discount",
        id: "discount.amount",
        Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.discount?.amount, type: cell.row.original.discount?.type })}</>,
        size: 160,
    },
    {
        header: "Стоимость со скидкой",
        accessorKey: "discountPrice",
        Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.discountPrice })}</>,
        size: 208,
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AdminCoursesFiltersForm = {
    query: "",
    createdAtFrom: null,
    createdAtTo: null,
    isActive: "",
    tags: [],
    teachers: [],
    category: "",
    discountType: "",
};
