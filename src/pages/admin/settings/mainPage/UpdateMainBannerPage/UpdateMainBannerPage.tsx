import { Box, Flex } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, LastUpdatedInfo, Loader } from "@shared/ui";
import { useMainBanner } from "@entities/staticPage";
import { UpdateMainBannerForm } from "@features/mainBanner";
import { getBreadCrumbsItems } from "./utils";

const UpdateMainBannerPage = () => {
    const router = useRouter();
    const { data, isLoading } = useMainBanner();

    const handleCloseEditForm = () => {
        router.push("/admin/settings/main-page/banner");
    };

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ title: data?.title })} mb={8} />
            <Flex direction="column" gap={24} mb={32}>
                <Heading>{data?.title}</Heading>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
            {isLoading && <Loader />}
            <UpdateMainBannerForm data={data} onClose={handleCloseEditForm} />
        </Box>
    );
};

export default UpdateMainBannerPage;