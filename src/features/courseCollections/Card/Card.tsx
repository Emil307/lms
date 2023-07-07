import { Box, BoxProps, Flex, Title, Text, Group, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
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
                    <Title order={3} color="dark" lineClamp={2}>
                        {data.name}
                    </Title>
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
