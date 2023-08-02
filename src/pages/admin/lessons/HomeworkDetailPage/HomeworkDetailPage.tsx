import { useRouter } from "next/router";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";
import React, { useMemo } from "react";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { Box, Text } from "@mantine/core";
import { tabList } from "./constants";
import { useAdminLessonHomeworkAnswer } from "@entities/lesson";
import { HomeworkInfoPanel, HomeworkTask } from "@widgets/admin/lessons";

const HomeworkDetailPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: homeworkAnswer, isLoading, isError } = useAdminLessonHomeworkAnswer(id);

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/homeworks/[id]", query: { id, tab: value } });
    };

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabList[0].value;
    }, [router.isReady, tab]);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const studentFio = `${homeworkAnswer.student.profile.lastName} ${homeworkAnswer.student.profile.firstName}`;

    const renderComponent = () => {
        switch (currentTab) {
            case "task":
                return <HomeworkTask homeworkAnswer={homeworkAnswer} studentFio={studentFio} />;
            case "dialog":
                return null;
            default:
                return null;
        }
    };

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ studentFio, homeworkAnswerId: homeworkAnswer.id })} mb={8} />
            <HomeworkInfoPanel homeworkAnswer={homeworkAnswer} studentFio={studentFio} />
            <Box mt={32} maw={1162}>
                <Tabs value={currentTab} tabs={tabList} onTabChange={handleChangeTab} mb={32} />
                {renderComponent()}
            </Box>
        </Box>
    );
};

export default HomeworkDetailPage;
