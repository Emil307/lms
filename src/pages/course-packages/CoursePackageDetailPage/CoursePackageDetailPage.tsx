import { Box, Loader, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <BreadCrumbs items={getBreadCrumbsItems({ packageName: data.name, id })} />
            <MainInfoPanel data={data} />
            <CourseCarouselList packageId={id} mb={32} />
            <CoursePackageCarouselList title="Другие пакетные предложения" />
        </Box>
    );
};

export default CoursePackageDetailPage;
