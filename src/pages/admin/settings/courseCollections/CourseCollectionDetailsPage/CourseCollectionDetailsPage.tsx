import { Box, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader, Tabs } from "@shared/ui";
import { AdminCourseFromCollectionList, CourseCollectionSettings, InfoPanel } from "@widgets/admin/courseCollections";
import { useAdminCourseCollection } from "@entities/courseCollection";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";
import { TRouterQueries } from "./types";

const CourseCollectionDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: courseCollectionData, isLoading, isError } = useAdminCourseCollection({ id });

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/settings/course-collections/[id]", query: { id, tab: value } });
    };

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabsList[0].value;
    }, [router.isReady, tab]);

    const renderContent = () => {
        if (tab === "courses") {
            return <AdminCourseFromCollectionList courseCollectionId={id} mt={32} />;
        }

        return <CourseCollectionSettings id={id} mt={32} />;
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ name: courseCollectionData.name })} mb={8} />
            <Heading mb={32}>{courseCollectionData.name}</Heading>
            <InfoPanel id={id} mb={32} />
            <Tabs value={currentTab} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} />
            {renderContent()}
        </Box>
    );
};

export default CourseCollectionDetailsPage;
