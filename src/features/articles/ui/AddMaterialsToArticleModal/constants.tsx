import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminMaterialsNoIncludedArticleFiltersForm, UploadedFileFromList } from "@entities/storage";
import { AttachMaterialsToArticleFormValidation } from "./types";

export const initialValues: AttachMaterialsToArticleFormValidation = {
    fileIds: [],
};

export const filterInitialValues: AdminMaterialsNoIncludedArticleFiltersForm = {
    query: "",
    type: "",
    categoryIds: "",
    createdAtFrom: null,
    createdAtTo: null,
};

export const columnOrder = ["mrt-row-select", "id", "name", "category.name", "subcategories", "courses"];

export const columns: MRT_ColumnDef<UploadedFileFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 60,
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
        size: 181,
        Cell: ({ row }) => row.original.categories.map(({ name }) => name).join(", "),
    },
    {
        header: "Тип файла",
        accessorKey: "type.name",
        size: 181,
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        size: 181,
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
];
