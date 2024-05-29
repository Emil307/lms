import { Box, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import { Text } from "@mantine/core";
import { useMemo } from "react";
import { BreadCrumbs, ContentByTextEditor, EmptyData, Loader, Tabs, VideoInput } from "@shared/ui";
import { Homework, MainInfoPanel, MaterialList, Test } from "@widgets/lessons";
import { useLesson } from "@entities/lesson";
import { useGroup } from "@entities/group";
import IconEmptyBox from "@public/icons/emptyBox.svg";
import { TRouterQueries } from "./types";
import { getBreadCrumbsItems, getTabList } from "./utils";
import useStyles from "./LessonDetailsPage.styles";

const LessonDetailsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const { id: groupId, lessonId, tab } = router.query as TRouterQueries;

    const { data: group, isLoading: isLoadingGroup, isError: isErrorGroup } = useGroup({ id: groupId });

    const {
        data: lesson,
        isLoading: isLoadingLesson,
        isError: isErrorLesson,
    } = useLesson({
        id: lessonId,
        courseId: group?.courseId,
        groupId: group?.groupId,
        groupStatus: group?.status.name,
    });

    const tabList = getTabList({
        isTestExists: lesson?.testExists,
        isHomeworkExists: lesson?.homeworkExists,
    });

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabList[0].value;
    }, [router.isReady, tab, tabList]);

    if (isLoadingGroup || isLoadingLesson) {
        return <Loader />;
    }

    if (isErrorGroup || isErrorLesson) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/my-courses/[id]/lessons/[lessonId]", query: { id: groupId, lessonId, tab: value } });
    };

    const renderMainContent = () => {
        if (!lesson.content && lesson.videos.length === 0) {
            return <EmptyData title="Содержание отсутствует" description="" icon={<IconEmptyBox />} />;
        }
        return (
            <>
                {lesson.videos.length > 0 && (
                    <VideoInput loadedFilesData={lesson.videos} className={classes.videoItemWrapper} fileItemStyle={{ maxHeight: 725 }} />
                )}
                <ContentByTextEditor data={lesson.content || ""} />
            </>
        );
    };

    const renderContent = () => {
        switch (currentTab) {
            case "materials":
                return <MaterialList data={lesson} />;
            case "test":
                return <Test lesson={lesson} courseId={String(group.courseId)} groupId={String(group.groupId)} />;
            case "homework":
                return <Homework lesson={lesson} courseId={String(group.courseId)} groupId={String(group.groupId)} />;
            default:
                return <Flex className={classes.lessonContent}>{renderMainContent()}</Flex>;
        }
    };

    return (
        <Box>
            <BreadCrumbs
                items={getBreadCrumbsItems({
                    nameLesson: lesson.name,
                    nameCourse: group.name,
                    groupId,
                })}
                mb={32}
            />
            <Flex className={classes.content}>
                <MainInfoPanel data={lesson} myCourseData={group} />
                <Tabs value={currentTab} tabs={tabList} onTabChange={handleChangeTab} />
                {renderContent()}
            </Flex>
        </Box>
    );
};

export default LessonDetailsPage;
