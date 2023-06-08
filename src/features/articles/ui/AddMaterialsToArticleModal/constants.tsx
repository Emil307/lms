import { MRT_ColumnDef } from "mantine-react-table";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
import { Tooltip } from "@shared/ui";
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
    },
    {
        header: "Название",
        accessorKey: "name",
    },
    {
        header: "Категория",
        accessorKey: "categories",
        enableSorting: false,
        Cell: ({ row }) => {
            const listCategoryNames = row.original.categories.map(({ name }) => name).join(", ");
            return (
                <Tooltip label={listCategoryNames}>
                    <Text lineClamp={1}>{listCategoryNames}</Text>
                </Tooltip>
            );
        },
    },
    {
        header: "Тип файла",
        accessorKey: "type.name",
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
];
