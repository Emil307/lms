import { Box, Flex, Loader, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, LastUpdatedInfo } from "@shared/ui";
import { useMainBanner } from "@entities/staticPage";
import { MainBannerEditForm } from "@features/mainBanner";
import { getBreadCrumbsItems } from "./utils";

const MainBannerEditPage = () => {
    const router = useRouter();
    const { data, isLoading } = useMainBanner();

    const handleCloseEditForm = () => {
        router.push("/admin/settings/main-page/banner");
    };

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ title: data?.title })} mb={8} />
            <Flex direction="column" gap={24} mb={32}>
                <Title order={1} color="dark">
                    {data?.title}
                </Title>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
            {isLoading && <Loader />}
            <MainBannerEditForm data={data} onClose={handleCloseEditForm} />
        </Box>
    );
};

export default MainBannerEditPage;
