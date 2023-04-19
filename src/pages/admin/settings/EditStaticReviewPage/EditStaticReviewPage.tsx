import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { EditStaticReviewForm } from "@features/staticReviews";
import { useAdminStaticReview } from "@entities/staticReview";
import { getBreadCrumbsItems } from "./utils";

interface TRouterQueries {
    id: string;
}

const EditStaticReviewPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const handleCloseForm = () => router.push("/admin/settings/main-page/reviews");

    const { data } = useAdminStaticReview(id);

    const fullName = `${data?.firstName} ${data?.lastName}`;

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ fullName, id })} mb={8} />
            <Title order={1} color="dark">
                {fullName}
            </Title>
            <EditStaticReviewForm data={data} onClose={handleCloseForm} />
        </Box>
    );
};

export default EditStaticReviewPage;
