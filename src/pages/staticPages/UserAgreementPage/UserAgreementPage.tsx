import { Box, Title, Flex } from "@mantine/core";
import React from "react";
import { BreadCrumbs, ContentByTextEditor, Loader } from "@shared/ui";
import { usePublicOffer } from "@entities/staticPage";
import { breadCrumbsItems } from "./constants";

const UserAgreementPage = () => {
    const { data: publicOfferData, isLoading } = usePublicOffer();

    const renderContent = () => {
        if (isLoading) return <Loader size="lg" sx={{ alignSelf: "center" }} />;

        return <ContentByTextEditor data={publicOfferData?.content} />;
    };

    return (
        <Flex direction="column" gap={32}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    Пользовательское соглашение
                </Title>
            </Box>
            {renderContent()}
        </Flex>
    );
};

export default UserAgreementPage;
