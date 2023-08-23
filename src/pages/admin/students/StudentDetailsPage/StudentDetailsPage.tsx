import { Box, Flex, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { useDetailsUser } from "@entities/user";
import { InfoPanel, StudentSettings } from "@widgets/admin/students";
import { TRouterQueries } from "@shared/types";
import { getFullName } from "@shared/utils";
import { AdminStudentCourseList } from "@widgets/admin/courses";
import { AdminStudentGroupList } from "@widgets/admin/groups";
import { AdminStudentArticlePackageList } from "@widgets/admin/articlePackages";
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
                return <AdminStudentCourseList studentId={id} />;
            case "groups":
                return <AdminStudentGroupList studentId={id} />;
            case "article-packages":
                return <AdminStudentArticlePackageList studentId={id} />;
            default:
                return <StudentSettings id={id} />;
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
            <BreadCrumbs items={getBreadCrumbsItems({ userName, id })} mb={8} />
            <Flex direction="column" gap={32}>
                <InfoPanel id={id} />
                <Tabs value={tab || tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} />
                {renderContent()}
            </Flex>
        </Box>
    );
};

export default StudentDetailsPage;
