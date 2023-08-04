import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { useDetailsUser } from "@entities/user";
import { InfoPanel, StudentSettings } from "@widgets/admin/students";
import { TRouterQueries } from "@shared/types";
import { getFullName } from "@shared/utils";
import { AdminStudentCourseList } from "@features/students";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const StudentDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: userData, isLoading, isError } = useDetailsUser(id);

    const userName = getFullName({ data: userData?.profile });

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/students/[id]", query: { id, tab: value } });
    };

    const renderContent = () => {
        switch (tab) {
            case "courses":
                return <AdminStudentCourseList studentId={id} mt={32} />;
            case "groups":
                //TODO: Заменить на вкладку со списком групп, в которые входит ученик
                return <StudentSettings id={id} mt={32} />;
            case "article-packages":
                //TODO: Заменить на вкладку со списком пакетов БЗ, которые имеет ученик
                return <StudentSettings id={id} mt={32} />;
            default:
                return <StudentSettings id={id} mt={32} />;
        }
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ userName, id })} />
            <InfoPanel id={id} />
            <Tabs value={tab || tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            {renderContent()}
        </Box>
    );
};

export default StudentDetailsPage;
