import { Flex, FlexProps } from "@mantine/core";
import { Settings } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { useReadAllNotifications } from "@entities/notification";
import useStyles from "./FooterDropdown.styles";

export interface FooterDropdownProps extends Omit<FlexProps, "children"> {
    hasNewNotifications?: boolean;
    onClose: () => void;
}

const FooterDropdown = ({ hasNewNotifications, onClose, ...props }: FooterDropdownProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const readAllNotifications = useReadAllNotifications();

    const handleReadAllNotifications = () => {
        readAllNotifications.mutate();
    };

    const handleOpenSettingsNotifications = () => {
        router.push("/profile");
        onClose();
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
