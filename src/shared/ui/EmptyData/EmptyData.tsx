import { memo, ReactNode } from "react";
import { Box, Flex, Text } from "@mantine/core";
import MagnifyingGlass from "public/icons/magnifyingGlass.svg";
import useStyles from "./EmptyData.styles";
import { Heading } from "../Typography";

export interface EmptyDataProps {
    icon?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
}

const EmptyData = (props: EmptyDataProps) => {
    const {
        icon = <MagnifyingGlass />,
        title = "К сожалению, совпадений не найдено",
        description = "Попробуйте поискать с другими фильтрами. Чтобы вернуться ко всему списку, сбросьте фильтр.",
    } = props;
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <Box className={classes.iconContainer}>{icon}</Box>
            <Flex gap={8} direction="column">
                <Heading order={3}>{title}</Heading>
                {description && <Text className={classes.description}>{description}</Text>}
            </Flex>
        </Flex>
    );
};

export default memo(EmptyData);
