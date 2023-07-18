import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminMaterialsNoIncludedLessonFiltersForm, UploadedFileFromList } from "@entities/storage";

export const columnOrder = ["mrt-row-select", "id", "name", "categories", "type.name", "createdAt"];

export const columns: MRT_ColumnDef<UploadedFileFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 80,
    },
    {
        header: "Название",
        accessorKey: "name",
        size: 181,
    },
    {
        header: "Категория",
        accessorKey: "categories",
        enableSorting: false,
        Cell: ({ row }) => row.original.categories.map(({ name }) => name).join(", "),
        size: 181,
    },
    {
        header: "Тип файла",
        accessorKey: "type.name",
        size: 181,
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
];

export const filterInitialValues: AdminMaterialsNoIncludedLessonFiltersForm = {
    query: "",
    createdAtFrom: null,
    createdAtTo: null,
    categoryIds: "",
    type: "",
};