import { Flex, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { closeModal, openModal } from "@mantine/modals";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useGroup } from "@entities/group";
import { MainInfoPanel, MaterialsProgramTrainingList, MyCourseArticles, ProgramTrainingList } from "@widgets/myCourses";
import { CarouselList as ArticlePackageCarouselList } from "@widgets/articlePackages";
import { AboutFinishGroupModal } from "@features/groups";
import { CreateCourseReviewForm } from "@features/courseReviews";
import { getBreadCrumbsItems } from "./utils";
import { tabsList } from "./constants";

const MyCourseDetailsPage = () => {
    const router = useRouter();
    const { tab, id } = router.query as TRouterQueries;

    const { data: groupData, isLoading, isError } = useGroup({ id });

    useEffect(() => {
        if (!groupData || groupData.modalShowed || groupData.modalShowed === null) {
            return;
        }
        openModal({
            modalId: "ABOUT_FINISH_GROUP",
            title: "Поздравляем с окончанием курса!",
            size: 456,
            children: (
                <AboutFinishGroupModal data={groupData} onSubmit={handleOpenCreateReviewModal} onClose={handleCloseAboutFinishGroupModal} />
            ),
        });
    }, [groupData]);

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabsList[0].value;
    }, [router.isReady, tab]);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const handleCloseAboutFinishGroupModal = () => closeModal("ABOUT_FINISH_GROUP");

    const handleCloseCreateReviewModal = () => closeModal("CREATE_COURSE_REVIEW");

    const handleOpenCreateReviewModal = () => {
        openModal({
            modalId: "CREATE_COURSE_REVIEW",
            title: "Оставить отзыв",
            size: 408,
            children: (
                <CreateCourseReviewForm
                    data={{ groupId: groupData.groupId, courseId: groupData.courseId }}
                    onClose={handleCloseCreateReviewModal}
                />
            ),
        });
    };

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/my-courses/[id]", query: { id, tab: value } });
    };

    const renderContent = () => {
        switch (currentTab) {
            case "materials":
                return <MaterialsProgramTrainingList groupId={id} />;
            case "articles":
                return (
                    <Flex direction="column" gap={64}>
                        <MyCourseArticles courseId={String(groupData.courseId)} />
                        <ArticlePackageCarouselList courseId={groupData.courseId} />
                    </Flex>
                );
            default:
                return <ProgramTrainingList groupId={id} courseId={groupData.courseId} groupStartDate={groupData.educationStartDate} />;
        }
    };

    return (
        <Flex direction="column" gap={32}>
            <BreadCrumbs items={getBreadCrumbsItems({ name: groupData.name })} />

            <Flex direction="column" gap={16}>
                <MainInfoPanel data={groupData} />
            </Flex>
            <Tabs value={currentTab} tabs={tabsList} onTabChange={handleChangeTab} />
            {renderContent()}
        </Flex>
    );
};

export default MyCourseDetailsPage;
