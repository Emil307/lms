import { Menu as MMenu, MenuProps as MMenuProps, Indicator, Box } from "@mantine/core";
import { useState } from "react";
import { IconBell } from "@tabler/icons-react";
import { useNewNotifications } from "@entities/notification";
import { Card as NotificationCard, List as NotificationList } from "@features/notifications";
import { FooterDropdown, HeaderDropdown } from "./components";
import useStyles from "./Menu.styles";

export interface MenuProps extends MMenuProps {}

const Menu = (props: MenuProps) => {
    const [opened, setOpened] = useState(false);
    const { classes } = useStyles({ isOpened: opened });

    const { data: newNotificationsData } = useNewNotifications();

    const handleCloseMenu = () => setOpened(false);

    return (
        <MMenu
            {...props}
            width="100%"
            styles={{
                dropdown: {
                    maxWidth: 407,
                },
            }}
            opened={opened}
            onChange={setOpened}>
            <MMenu.Target>
                <Box className={classes.rootTarget}>
                    <Indicator className={classes.indicator} color="done" disabled={!newNotificationsData?.hasNew}>
                        <IconBell />
                    </Indicator>
                </Box>
            </MMenu.Target>
            <MMenu.Dropdown className={classes.dropdown}>
                <HeaderDropdown onClose={handleCloseMenu} mb={8} />
                <NotificationList maxHeightContainer={390} itemComponent={(props) => <NotificationCard {...props} />} />
                <FooterDropdown hasNewNotifications={newNotificationsData?.hasNew} onClose={handleCloseMenu} />
            </MMenu.Dropdown>
        </MMenu>
    );
};

export default Menu;
