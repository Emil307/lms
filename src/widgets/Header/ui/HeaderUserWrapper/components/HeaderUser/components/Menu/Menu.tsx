import { Avatar, Menu as MMenu, Flex, ThemeIcon } from "@mantine/core";
import { useContext, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import Link from "next/link";
import { User, useUserRole } from "@entities/auth";
import AvatarIcon from "public/icons/avatar.svg";
import { SidebarMenuContext } from "@app/layouts/UserLayout/utils";
import useStyles from "./Menu.styles";
import { getMenuItems } from "./utils";

export interface MenuProps {
    user?: User;
}

const Menu = ({ user }: MenuProps) => {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const role = useUserRole();

    const { setOpenedSidebar } = useContext(SidebarMenuContext);

    const renderDropdownItems = useMemo(
        () =>
            getMenuItems({ userRole: role?.name! }).map((item, index) => {
                const handleClickItem = () => {
                    setOpenedSidebar(false);
                };

                return (
                    <MMenu.Item
                        key={index}
                        component={Link}
                        href={item.href}
                        className={classes.menuItem}
                        icon={item.icon}
                        onClick={handleClickItem}>
                        {item.label}
                    </MMenu.Item>
                );
            }),
        []
    );

    return (
        <MMenu width={200} shadow="md" opened={opened} onChange={setOpened} position="bottom-end">
            <MMenu.Target>
                <Flex align="center" gap={8} className={classes.root}>
                    <Avatar src={user?.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                        <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                            <AvatarIcon />
                        </ThemeIcon>
                    </Avatar>
                    <ThemeIcon className={classes.chevronIconWrapper}>{opened ? <ChevronUp /> : <ChevronDown />}</ThemeIcon>
                </Flex>
            </MMenu.Target>
            <MMenu.Dropdown>{renderDropdownItems}</MMenu.Dropdown>
        </MMenu>
    );
};

Menu.displayName = "Menu";

export default Menu;
