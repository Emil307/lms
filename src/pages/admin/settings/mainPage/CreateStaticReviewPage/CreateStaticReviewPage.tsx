import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CreateStaticReviewForm } from "@features/staticReviews";
import { breadCrumbsItems } from "./constants";

const CreateStaticReviewPage = () => {
    const router = useRouter();

    const handleCloseForm = () => router.push("/admin/students");

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark">
                Создание отзыва
            </Title>
            <CreateStaticReviewForm onClose={handleCloseForm} />
        </Box>
    );
};

export default CreateStaticReviewPage;
