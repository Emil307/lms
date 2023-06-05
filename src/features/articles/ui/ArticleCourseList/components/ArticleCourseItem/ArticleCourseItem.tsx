import { Flex, FlexProps, ThemeIcon, Text, Title, ActionIcon, Group } from "@mantine/core";
import { memo } from "react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Folder } from "react-feather";
import { ArticleCourse } from "@entities/article";
import { getPluralString } from "@shared/utils";
import IconCalendar from "public/icons/calendar.svg";
import useStyles from "./ArticleCourseItem.styles";

export interface ArticleCourseItemProps extends FlexProps {
    data: ArticleCourse;
}

const MemoizedArticleCourseItem = memo(function ArticleCourseItem({ data, ...props }: ArticleCourseItemProps) {
    const { classes } = useStyles();
    const router = useRouter();

    //TODO: возможно в скором этот компонент вообще удалим
    const handleOpenCourse = () => router.push({ pathname: "/articles", query: { courseId: String(data.id) } });

    return (
        <Flex {...props} className={classes.root}>
            <ThemeIcon color="secondary" sx={{ height: 48, width: 48, borderRadius: 56 }}>
                <Folder height={20} width={20} />
            </ThemeIcon>
            <Flex direction="column" gap={2} sx={{ flex: 1 }}>
                <Title order={3} color="dark" lineClamp={1}>
                    {data.name}
                </Title>
                <Text className={classes.countArticles}>{`${data.articleCount} ${getPluralString(
                    data.articleCount,
                    "статья",
                    "статьи",
                    "статей"
                )}`}</Text>
            </Flex>
            <Group>
                <Flex align="center" sx={{ gap: 8 }}>
                    <ThemeIcon
                        color="secondary"
                        variant="outline"
                        w={24}
                        h={24}
                        sx={(theme) => ({
                            border: "none",
                            "svg path": {
                                fill: theme.colors.secondary[0],
                            },
                        })}>
                        <IconCalendar />
                    </ThemeIcon>
                    <Text>Доступ: до 10 ноября 2023</Text>
                </Flex>
                <ActionIcon className={classes.actionIcon} onClick={handleOpenCourse}>
                    <IconArrowNarrowRight />
                </ActionIcon>
            </Group>
        </Flex>
    );
});

export default MemoizedArticleCourseItem;
