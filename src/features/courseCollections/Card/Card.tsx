import { Box, BoxProps, Flex, Group, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import { Button, Heading, Paragraph } from "@shared/ui";
import { getIcon, getPluralString } from "@shared/utils";
import { CourseCollectionFromList } from "@entities/courseCollection";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<BoxProps, "children"> {
    data: CourseCollectionFromList;
    onClick?: (id: unknown) => void;
}

const MemoizedCard = memo(function Card({ data, onClick, ...props }: CardProps) {
    const { classes } = useStyles();

    const handleClick = () => onClick?.(data.id);

    return (
        <Box {...props} className={classes.root} onClick={handleClick}>
            <Group className={classes.content}>
                <Flex direction="column" gap={16} miw={224} sx={{ flex: 1 }}>
                    <Heading order={3} lineClamp={2}>
                        {data.name}
                    </Heading>
                    <Paragraph variant="text-small-m" color="gray45" lineClamp={4}>
                        {data.description}
                    </Paragraph>
                </Flex>
                <Flex className={classes.iconWrapper}>{getIcon({ iconName: data.iconName })}</Flex>
            </Group>
            <Box>
                <Button
                    variant="text"
                    size="small"
                    rightIcon={
                        <ThemeIcon className={classes.iconButtonLinkCourse}>
                            <ChevronRight />
                        </ThemeIcon>
                    }>{`${data.coursesCount} ${getPluralString(data.coursesCount, "курс", "курса", "курсов")}`}</Button>
            </Box>
        </Box>
    );
});

export default MemoizedCard;
