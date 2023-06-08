import { MRT_ColumnDef } from "mantine-react-table";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
import { UploadedFileFromList, UploadedFilesFiltersForm } from "@entities/storage";
import { Tooltip } from "@shared/ui";

export const columnOrder = ["id", "name", "categories", "type.name", "createdAt", "mrt-row-actions"];

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
