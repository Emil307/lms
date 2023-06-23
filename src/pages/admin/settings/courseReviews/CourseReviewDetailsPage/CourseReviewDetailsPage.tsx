import { Box, Loader, Text, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
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
            <BreadCrumbs items={getBreadCrumbsItems({ authorName, id })} mb={8} />
            <Title order={1} color="dark" mb={24}>
                {authorName}
            </Title>
            <InfoPanel id={id} />
            <CourseReviewSettings id={id} />
        </Box>
    );
};

export default CourseReviewDetailsPage;