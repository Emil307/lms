import { Flex } from "@mantine/core";
import { useRouter } from "next/router";
import { Text } from "@mantine/core";
import { BreadCrumbs, ContentByTextEditor, Loader, Tabs, VideoInput } from "@shared/ui";
import { Homework, MainInfoPanel, MaterialList, Test } from "@widgets/lessons";
import { useLesson } from "@entities/lesson";
import { useGroup } from "@entities/group";
import { TRouterQueries } from "./types";
import { getBreadCrumbsItems, getTabList } from "./utils";
import useStyles from "./LessonDetailsPage.styles";

const LessonDetailsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const { id, lessonId, tab } = router.query as TRouterQueries;

    const group = useGroup({ id });

    const lesson = useLesson({
        id: lessonId,
        groupId: id,
    });

    const tabList = getTabList({
        hasTest: lesson.data?.hasTest,
        hasHomework: lesson.data?.hasHomework,
    });

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/my-courses/[id]/lessons/[lessonId]", query: { id, lessonId, tab: value } });
    };

    const renderContent = () => {
        switch (tab) {
            case "materials":
                return <MaterialList data={lesson.data} />;
            case "test":
                return <Test lessonId={lessonId} courseId={id} />;
            case "homework":
                return <Homework lessonId={lessonId} groupId={id} />;
            default:
                return (
                    <Flex className={classes.lessonContent}>
                        <VideoInput loadedFilesData={lesson.data?.videos} />
                        <ContentByTextEditor data={lesson.data?.content} />
                    </Flex>
                );
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
                    groupId: id,
                    lessonId,
                })}
            />
            <MainInfoPanel data={lesson.data} myCourseData={group.data} />
            <Tabs value={tab || tabList[0].value} tabs={tabList} onTabChange={handleChangeTab} />
            {renderContent()}
        </Flex>
    );
};

export default LessonDetailsPage;
