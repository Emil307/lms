import { Flex, FlexProps } from "@mantine/core";
import { TUserNotifications } from "@shared/types";
import { NotificationItem } from "./components";
import useStyles from "./SettingsList.styles";

export interface SettingsListProps extends Omit<FlexProps, "children" | "onChange"> {
    notifications?: TUserNotifications;
    variant: "primary" | "secondary";
    onChange: (fieldName: string, value: boolean) => void;
}

const SettingsList = ({ notifications, variant, onChange, ...props }: SettingsListProps) => {
    const { classes } = useStyles();

    if (!notifications) {
        return null;
    }

    return (
        <Flex {...props} className={classes.root}>
            {Object.entries(notifications).map(([fieldName, value]) => (
                <NotificationItem key={fieldName} fieldName={fieldName} value={value} variant={variant} onChange={onChange} />
            ))}
        </Flex>
    );
};

export default SettingsList;
