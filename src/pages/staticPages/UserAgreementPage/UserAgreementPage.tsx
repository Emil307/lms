import { Box, MediaQuery, Text } from "@mantine/core";
import React from "react";
import { BreadCrumbs, ContentByTextEditor, Heading, Loader } from "@shared/ui";
import { usePublicOffer } from "@entities/staticPage";
import { breadCrumbsItems } from "./constants";

const UserAgreementPage = () => {
    const { data: publicOfferData, isLoading, isError } = usePublicOffer();

    const renderContent = () => {
        if (isLoading) {
            return <Loader size="lg" sx={{ alignSelf: "center" }} />;
        }

        if (isError) {
            return <Text>Произошла ошибка, попробуйте позднее</Text>;
        }

        return <ContentByTextEditor data={publicOfferData.content} />;
    };

    return (
        <Box>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
            </MediaQuery>
            <Heading mb={32}>Пользовательское соглашение</Heading>
            {renderContent()}
        </Box>
    );
};

export default UserAgreementPage;
