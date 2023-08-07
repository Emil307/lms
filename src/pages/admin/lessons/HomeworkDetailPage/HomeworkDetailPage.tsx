import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Box, Text } from "@mantine/core";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminLessonHomeworkAnswer } from "@entities/lesson";
import { HomeworkChat, HomeworkInfoPanel, HomeworkTask } from "@widgets/admin/lessons";
import { tabList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

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
            case "chat":
                return (
                    <HomeworkChat
                        homeworkAnswerId={String(homeworkAnswer.id)}
                        answerIsCompleted={homeworkAnswer?.status.name === "completed"}
                    />
                );
            default:
                return <HomeworkTask homeworkAnswer={homeworkAnswer} studentFio={studentFio} />;
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
