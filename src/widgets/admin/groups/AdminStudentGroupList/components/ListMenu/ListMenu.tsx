import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye } from "react-feather";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminStudentGroupFromList } from "@entities/group";

export interface ListMenuProps {
    row: MRT_Row<AdminStudentGroupFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();

    const handleOpenDetailsPage = () => router.push({ pathname: "/admin/groups/[id]", query: { id: String(row.original.id) } });

    return (
        <MenuDataGrid>
            <MenuItemDataGrid mt={8} onClick={handleOpenDetailsPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
