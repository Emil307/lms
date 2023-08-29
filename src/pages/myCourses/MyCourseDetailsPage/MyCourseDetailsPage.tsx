import { Flex, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useGroup } from "@entities/group";
import { AuthorsInfo, MainInfoPanel, MaterialsProgramTrainingList, MyCourseArticles, ProgramTrainingList } from "@widgets/myCourses";
import { CarouselList as ArticlePackageCarouselList } from "@widgets/articlePackages";
import { getBreadCrumbsItems } from "./utils";
import { tabsList } from "./constants";

const MyCourseDetailsPage = () => {
    const router = useRouter();
    const { tab, id } = router.query as TRouterQueries;

    const { data: groupData, isLoading, isError } = useGroup({ id });

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/my-courses/[id]", query: { id, tab: value } });
    };

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabsList[0].value;
    }, [router.isReady, tab]);

    const renderContent = () => {
        switch (currentTab) {
            case "materials":
                return <MaterialsProgramTrainingList groupId={id} />;
            case "articles":
                return (
                    <Flex direction="column" gap={64}>
                        <MyCourseArticles courseId={String(groupData?.courseId)} />
                        <ArticlePackageCarouselList courseId={groupData?.courseId} />
                    </Flex>
                );
            default:
                return <ProgramTrainingList groupId={id} courseId={groupData?.courseId} />;
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex direction="column" gap={32}>
            <BreadCrumbs items={getBreadCrumbsItems({ name: groupData.name, id })} />

            <Flex direction="column" gap={16}>
                <MainInfoPanel data={groupData} />
                <AuthorsInfo data={groupData} />
            </Flex>
            <Tabs value={currentTab} tabs={tabsList} onTabChange={handleChangeTab} />
            {renderContent()}
        </Flex>
    );
};

export default MyCourseDetailsPage;
