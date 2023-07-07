import { ActionIcon, Flex, FlexProps, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import useStyles from "./HeaderDropdown.styles";

export interface HeaderDropdownProps extends Omit<FlexProps, "children"> {
    onClose: () => void;
}

const HeaderDropdown = ({ onClose, ...props }: HeaderDropdownProps) => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root} {...props}>
            <Title order={3} color="dark">
                Уведомления
            </Title>
            <ActionIcon className={classes.closeIcon} onClick={onClose}>
                <IconX />
            </ActionIcon>
        </Flex>
    );
};

export default HeaderDropdown;
