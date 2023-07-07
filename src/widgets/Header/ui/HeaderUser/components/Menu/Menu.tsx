import { Avatar, Menu as MMenu, Flex, ThemeIcon } from "@mantine/core";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useRouter } from "next/router";
import { User } from "@entities/auth";
import AvatarIcon from "public/icons/avatar.svg";
import useStyles from "./Menu.styles";
import { dropdownMenuItems } from "./constants";

export interface MenuProps {
    user?: User;
}

const Menu = ({ user }: MenuProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const [opened, setOpened] = useState(false);

    const renderDropdownItems = useMemo(
        () =>
            dropdownMenuItems.map((item) => (
                <MMenu.Item key={item.id} className={classes.menuItem} icon={item.icon} onClick={() => router.push(item.href)}>
                    {item.label}
                </MMenu.Item>
            )),
        [],
    );

    return (
        <MMenu width={200} shadow="md" opened={opened} onChange={setOpened}>
            <MMenu.Target>
                <Flex align="center" gap={8}>
                    <Avatar
                        src={user?.profile.avatar?.absolutePath}
                        alt="avatar"
                        w={50}
                        h={50}
                        radius={160}
                        styles={(theme) => ({
                            placeholder: { backgroundColor: theme.colors.grayLight[0] },
                        })}>
                        <ThemeIcon variant="outline" className={classes.avatarDefaultIconWrapper}>
                            <AvatarIcon />
                        </ThemeIcon>
                    </Avatar>
                    <ThemeIcon variant="outline" className={classes.chevronIconWrapper}>
                        {opened ? <ChevronUp /> : <ChevronDown />}
                    </ThemeIcon>
                </Flex>
            </MMenu.Target>
            <MMenu.Dropdown>{renderDropdownItems}</MMenu.Dropdown>
        </MMenu>
    );
};

Menu.displayName = "Menu";

export default Menu;
