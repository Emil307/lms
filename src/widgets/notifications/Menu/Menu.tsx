import { Menu as MMenu, MenuProps as MMenuProps, ActionIcon, Indicator } from "@mantine/core";
import { useState } from "react";
import IconBell from "@public/icons/bell.svg";
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
                <ActionIcon className={classes.rootTarget}>
                    <Indicator className={classes.indicator} color="secondary" disabled={!newNotificationsData?.hasNew}>
                        <IconBell />
                    </Indicator>
                </ActionIcon>
            </MMenu.Target>
            <MMenu.Dropdown className={classes.dropdown}>
                <HeaderDropdown onClose={handleCloseMenu} mb={8} />
                <NotificationList
                    maxHeightContainer={390}
                    itemComponent={(props) => <NotificationCard key={props.data.id} {...props} handleCloseMenu={handleCloseMenu} />}
                />
                <FooterDropdown hasNewNotifications={newNotificationsData?.hasNew} onClose={handleCloseMenu} />
            </MMenu.Dropdown>
        </MMenu>
    );
};

export default Menu;
