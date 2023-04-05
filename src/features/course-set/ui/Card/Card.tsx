import { Box, BoxProps, Flex, Title, Text, Group, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { ChevronRight } from "react-feather";
import { useRouter } from "next/router";
import { CourseSet } from "@entities/courseSet";
import { Button } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<BoxProps, "children"> {
    data: CourseSet;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const { classes } = useStyles();
    const router = useRouter();

    //TODO: изменить маршрут после добавления страницы с подборками курсов
    const handleClick = () => router.push("/");

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
                <Box className={classes.imageWrapper}>
                    <Image
                        src={data.picture?.data.path || ""}
                        loader={({ src }) => `${src}`}
                        layout="fill"
                        objectFit="cover"
                        alt={data.picture?.data.name || ""}
                    />
                </Box>
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
                    }>{`${data.courses.meta.pagination.total} ${getPluralString(
                    data.courses.meta.pagination.total,
                    "курс",
                    "курса",
                    "курсов"
                )}`}</Button>
            </Box>
        </Box>
    );
});

export default MemoizedCard;
