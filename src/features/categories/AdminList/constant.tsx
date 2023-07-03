import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { Flex, Text, ThemeIcon } from "@mantine/core";
import { Folder } from "react-feather";
import { AdminCategoriesFiltersForm, AdminCategoryFromList } from "@entities/category";

export const columnOrder = ["id", "name", "subCategoriesCount", "createdAt", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCategoryFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        accessorFn: ({ id }) => {
            return (
                <Flex gap={16} align="center">
                    <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                        <Folder />
                    </ThemeIcon>
                    <Text color="dark" lh="16px">
                        {id}
                    </Text>
                </Flex>
            );
        },
    },
    {
        header: "Категория",
        accessorKey: "name",
    },
    {
        header: "Подкатегорий",
        accessorKey: "subCategoriesCount",
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
];

export const filterInitialValues: AdminCategoriesFiltersForm = { query: "" };
