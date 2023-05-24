import { Flex, FlexProps } from "@mantine/core";
import { UserNotifications } from "@entities/notification";
import { NotificationItem } from "./components";
import useStyles from "./List.styles";

export interface ListProps extends Omit<FlexProps, "children" | "onChange"> {
    notifications?: UserNotifications;
    variant: "primary" | "secondary";
    onChange: (fieldName: string, value: boolean) => void;
}

const List = ({ notifications, variant, onChange, ...props }: ListProps) => {
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

export default List;
