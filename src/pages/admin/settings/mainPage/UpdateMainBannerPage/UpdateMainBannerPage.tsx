import { Box, Flex, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, LastUpdatedInfo, Loader } from "@shared/ui";
import { useMainBanner } from "@entities/staticPage";
import { UpdateMainBannerForm } from "@features/mainBanner";
import { getBreadCrumbsItems } from "./utils";

const UpdateMainBannerPage = () => {
    const router = useRouter();
    const { data, isLoading, isError } = useMainBanner();

    const handleCloseUpdateMainBannerForm = () => {
        router.push("/admin/settings/main-page/banner");
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ title: data.title })} mb={8} />
            <Flex direction="column" gap={24} mb={32}>
                <Heading>{data.title}</Heading>
                <LastUpdatedInfo data={data.lastUpdated} scrollable />
            </Flex>
            <UpdateMainBannerForm data={data} onClose={handleCloseUpdateMainBannerForm} />
        </Box>
    );
};

export default UpdateMainBannerPage;
