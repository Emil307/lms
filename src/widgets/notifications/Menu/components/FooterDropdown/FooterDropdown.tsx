import { Flex, FlexProps } from "@mantine/core";
import { Settings } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { useReadAllNotifications } from "@entities/notification";
import { useSession } from "@features/auth";
import useStyles from "./FooterDropdown.styles";
import { Roles } from "@app/routes";

export interface FooterDropdownProps extends Omit<FlexProps, "children"> {
    hasNewNotifications?: boolean;
}

const FooterDropdown = ({ hasNewNotifications, ...props }: FooterDropdownProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const { user } = useSession();
    const readAllNotifications = useReadAllNotifications();

    const handleReadAllNotifications = () => {
        readAllNotifications.mutate();
    };

    const handleOpenSettingsNotifications = () => {
        if (user?.roles[0].id == Roles.administrator) {
            return router.push({ pathname: "/admin/users/[id]", query: { id: String(user.id) } });
        }

        return router.push("/profile");
    };

    return (
        <Flex className={classes.root} {...props}>
            <Button variant="text" leftIcon={<Settings />} onClick={handleOpenSettingsNotifications}>
                Настройки
            </Button>
            {hasNewNotifications && (
                <Button variant="text" onClick={handleReadAllNotifications} disabled={readAllNotifications.isLoading}>
                    Все прочитано
                </Button>
            )}
        </Flex>
    );
};

export default FooterDropdown;
