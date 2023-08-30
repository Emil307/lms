import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye } from "react-feather";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminCourseStatistics } from "@entities/course";

interface ListMenuProps {
    row: MRT_Row<AdminCourseStatistics>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const courseId = String(row.original.id);

    const handleGoToGroupPage = () => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: courseId, tab: "composition" } });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={handleGoToGroupPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
