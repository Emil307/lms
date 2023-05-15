import { Box, BoxProps, Flex, Title, Text, Group, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import { useRouter } from "next/router";
import * as TablerIcons from "@tabler/icons";
import * as FeatherIcons from "react-feather";
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

    const handleClick = () => router.push({ pathname: "/course-sets/[id]", query: { id: data.id.toString() } });

    const getIcon = () => {
        const IconTabler = data.iconName in TablerIcons ? TablerIcons[data.iconName as keyof typeof TablerIcons] : null;

        if (IconTabler) {
            return <IconTabler width={64} height={64} strokeWidth={1} />;
        }

        const IconFeater = data.iconName in FeatherIcons ? FeatherIcons[data.iconName as keyof typeof FeatherIcons] : FeatherIcons.Image;
        return <IconFeater width={64} height={64} strokeWidth={1} />;
    };

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
                <Flex className={classes.iconWrapper}>{getIcon()}</Flex>
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
