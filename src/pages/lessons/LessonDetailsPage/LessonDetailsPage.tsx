import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { Tabs } from "@shared/ui";
import { Homework, Test } from "@widgets/lessons";
import { TRouterQueries } from "./types";
import { tabsList } from "./constants";

const LessonDetailsPage = () => {
    const router = useRouter();

    const { id, lessonId, tab } = router.query as TRouterQueries;

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/my-courses/[id]/lessons/[lessonId]", query: { id, lessonId, tab: value } });
    };

    const renderContent = () => {
        switch (tab) {
            case "materials":
                //TODO: Добавить содержимое вкладки - материалы
                return null;
            case "test":
                return <Test lessonId={lessonId} courseId={id} />;
            case "homework":
                return <Homework lessonId={lessonId} />;
            default:
                //TODO: Добавить содержимое вкладки - содержание
                return null;
        }
    };

    return (
        <Box>
            {/* //TODO: Как бек сделает рут для получения информации об уроке */}
            {/* <BreadCrumbs items={getBreadCrumbsItems({ name: data.name, id })} mb={32} /> */}
            <Tabs value={tab || tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} mb={32} />
            {renderContent()}
        </Box>
    );
};

export default LessonDetailsPage;
