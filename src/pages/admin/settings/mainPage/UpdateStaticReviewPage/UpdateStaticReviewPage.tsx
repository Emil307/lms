import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { UpdateStaticReviewForm } from "@features/staticReviews";
import { useAdminStaticReview } from "@entities/staticReview";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

const UpdateStaticReviewPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const handleCloseForm = () => router.push("/admin/settings/main-page/reviews");

    const { data } = useAdminStaticReview({ id });

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ name: data?.content, id })} mb={8} />
            <Heading>{data?.content}</Heading>
            <UpdateStaticReviewForm data={data} onClose={handleCloseForm} mt={24} />
        </Box>
    );
};

export default UpdateStaticReviewPage;
