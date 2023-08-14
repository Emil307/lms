import { Flex } from "@mantine/core";
import { useRouter } from "next/router";
import { Text } from "@mantine/core";
import { BreadCrumbs, ContentByTextEditor, EmptyData, Loader, Tabs, VideoInput } from "@shared/ui";
import { Homework, MainInfoPanel, MaterialList, Test } from "@widgets/lessons";
import { useLesson } from "@entities/lesson";
import { useGroup } from "@entities/group";
import { TRouterQueries } from "./types";
import { getBreadCrumbsItems, getTabList } from "./utils";
import useStyles from "./LessonDetailsPage.styles";
import { useMemo } from "react";

const LessonDetailsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const { id: groupId, lessonId, tab } = router.query as TRouterQueries;

    const group = useGroup({ id: groupId });

    const lesson = useLesson({
        id: lessonId,
        courseId: group.data?.courseId,
    });

    const tabList = getTabList({
        hasTest: lesson.data?.hasTest,
        hasHomework: lesson.data?.hasHomework,
    });

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabList[0].value;
    }, [router.isReady, tab, tabList]);

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/my-courses/[id]/lessons/[lessonId]", query: { id: groupId, lessonId, tab: value } });
    };

    const renderMainContent = () => {
        if (!lesson.data?.content && lesson.data?.videos.length === 0) {
            return <EmptyData title="Содержание отсутствует" description="" />;
        }
        return (
            <>
                {lesson.data && lesson.data.videos.length > 0 && <VideoInput loadedFilesData={lesson.data?.videos} />}
                <ContentByTextEditor data={lesson.data?.content || ""} />
            </>
        );
    };

    const renderContent = () => {
        switch (tab) {
            case "materials":
                return <MaterialList data={lesson.data} />;
            case "test":
                return <Test lessonId={lessonId} courseId={String(group.data?.courseId)} />;
            case "homework":
                return <Homework lessonId={lessonId} courseId={String(group.data?.courseId)} />;
            default:
                return <Flex className={classes.lessonContent}>{renderMainContent()}</Flex>;
        }
    };

    if (group.isLoading || lesson.isLoading) {
        return <Loader />;
    }

    if (group.isError || lesson.isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex direction="column" gap={32}>
            <BreadCrumbs
                items={getBreadCrumbsItems({
                    nameLesson: lesson.data.name,
                    nameCourse: group.data.name,
                    groupId,
                    lessonId,
                })}
            />
            <MainInfoPanel data={lesson.data} myCourseData={group.data} />
            <Tabs value={currentTab} tabs={tabList} onTabChange={handleChangeTab} />
            {renderContent()}
        </Flex>
    );
};

export default LessonDetailsPage;
