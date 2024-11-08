import dayjs from "dayjs";
import { UploadedFileFromList, UploadedFilesFiltersForm } from "@entities/storage";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "categories", "type.name", "createdAt", "mrt-row-actions"];

export const columns: TColumns<UploadedFileFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 140,
    },
    {
        header: "Название",
        accessorKey: "name",
        size: 335,
    },
    {
        header: "Категория",
        accessorKey: "categories",
        enableSorting: false,
        Cell: ({ row }) => row.original.categories.map(({ name }) => name).join(", "),
        size: 335,
    },
    {
        header: "Тип файла",
        accessorKey: "type.name",
        size: 335,
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
        size: 335,
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: UploadedFilesFiltersForm = {
    query: "",
    createdAtFrom: null,
    createdAtTo: null,
    categoryIds: "",
    isActive: "",
    type: "",
};
