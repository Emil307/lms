import { Box, Loader, Text, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { CoursePackageSettings, InfoPanel } from "@widgets/admin/coursePackages";
import { useAdminCoursePackage } from "@entities/coursePackage";
import { CourseList } from "@features/coursePackages";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";
import { TRouterQueries } from "./types";

const CoursePackageDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: coursePackageData, isLoading, isError } = useAdminCoursePackage(id);

    const handleChangeTab = (value: string | null) => {
        if (value) {
            router.push({ pathname: "/admin/settings/course-packages/[id]", query: { id, tab: value } });
        }
    };

    const renderContent = () => {
        if (tab === "courses") {
            return <CourseList coursePackageId={id} />;
        }

        return <CoursePackageSettings id={id} />;
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ packageName: coursePackageData.name, id })} mb={8} />
            <Title color="dark">{coursePackageData.name}</Title>
            <InfoPanel id={id} />
            <Tabs value={tab || tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            {renderContent()}
        </Box>
    );
};

export default CoursePackageDetailsPage;