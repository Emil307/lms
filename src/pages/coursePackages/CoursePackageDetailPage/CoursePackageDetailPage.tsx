import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
import { useCoursePackage } from "@entities/coursePackage";
import { CarouselList as CoursePackageCarouselList, MainInfoPanel } from "@widgets/coursePackage";
import { TRouterQueries } from "@shared/types";
import { CarouselList as CourseCarouselList } from "@widgets/course";
import { getBreadCrumbsItems } from "./utils";

const CoursePackageDetailPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data, isLoading, isError } = useCoursePackage(id);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ name: data.name, id })} mb={32} />
            <MainInfoPanel data={data} mb={32} />
            <CourseCarouselList packageId={id} mb={64} />
            <CoursePackageCarouselList title="Другие пакетные предложения" exceptionCoursePackageId={id} />
        </Box>
    );
};

export default CoursePackageDetailPage;
