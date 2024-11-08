import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminCourseReview } from "@entities/courseReview";
import { getFullName } from "@shared/utils";
import { CourseReviewSettings, InfoPanel } from "@widgets/admin/courseReviews";
import { getBreadCrumbsItems } from "./utils";

const CourseReviewDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: courseReviewData, isLoading, isError } = useAdminCourseReview({ id });

    const authorName = getFullName({ data: courseReviewData?.user.profile });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ authorName })} mb={8} />
            <Heading mb={24}>{authorName}</Heading>
            <InfoPanel id={id} mb={24} />
            <CourseReviewSettings id={id} />
        </Box>
    );
};

export default CourseReviewDetailsPage;
