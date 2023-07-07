import { Box, Text, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { AdminCourseFromCollectionList, CourseCollectionSettings, InfoPanel } from "@widgets/admin/courseCollections";
import { useAdminCourseCollection } from "@entities/courseCollection";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";
import { TRouterQueries } from "./types";

const CourseCollectionDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: courseCollectionData, isLoading, isError } = useAdminCourseCollection({ id });

    const handleChangeTab = (value: string | null) => {
        if (value) {
            router.push({ pathname: "/admin/settings/course-collections/[id]", query: { id, tab: value } });
        }
    };

    const renderContent = () => {
        if (tab === "courses") {
            return <AdminCourseFromCollectionList courseCollectionId={id} />;
        }

        return <CourseCollectionSettings id={id} />;
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ name: courseCollectionData.name, id })} mb={8} />
            <Title color="dark" order={1}>
                {courseCollectionData.name}
            </Title>
            <InfoPanel id={id} />
            <Tabs value={tab || tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            {renderContent()}
        </Box>
    );
};

export default CourseCollectionDetailsPage;
