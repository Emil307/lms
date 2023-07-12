import { Box, BoxProps, Flex, Text, Group, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { getIcon, getPluralString } from "@shared/utils";
import { CourseCollectionFromList } from "@entities/courseCollection";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<BoxProps, "children"> {
    data: CourseCollectionFromList;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const { classes } = useStyles();
    const router = useRouter();

    const handleClick = () => router.push({ pathname: "/course-collections/[id]", query: { id: data.id.toString() } });

    return (
        <Box {...props} className={classes.root}>
            <Group className={classes.content}>
                <Flex direction="column" gap={16} sx={{ flex: 1 }}>
                    <Heading order={3} lineClamp={2}>
                        {data.name}
                    </Heading>
                    <Text className={classes.description} lineClamp={4}>
                        {data.description}
                    </Text>
                </Flex>
                <Flex className={classes.iconWrapper}>{getIcon({ iconName: data.iconName })}</Flex>
            </Group>
            <Box>
                <Button
                    variant="text"
                    size="small"
                    onClick={handleClick}
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
