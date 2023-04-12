import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { IconPercentage } from "@tabler/icons-react";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { Group } from "@entities/group";

interface ListMenuProps {
    row: MRT_Row<Group>;
}

const ListMenu = (_props: ListMenuProps) => {
    //TODO: Добавить методы после того как будет готово на бекенде
    return (
        <MenuDataGrid>
            <MenuItemDataGrid mt={8}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <IconPercentage />
                </ThemeIcon>
                Статистика
            </MenuItemDataGrid>
            <MenuItemDataGrid>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
