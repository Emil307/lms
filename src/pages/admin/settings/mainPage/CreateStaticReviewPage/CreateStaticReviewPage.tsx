import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CreateStaticReviewForm } from "@features/staticReviews";
import { breadCrumbsItems } from "./constants";

const CreateStaticReviewPage = () => {
    const router = useRouter();

    const handleCloseForm = () => router.push("/admin/settings/main-page/reviews");

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Heading>Создание отзыва</Heading>
            <CreateStaticReviewForm onClose={handleCloseForm} />
        </Box>
    );
};

export default CreateStaticReviewPage;
