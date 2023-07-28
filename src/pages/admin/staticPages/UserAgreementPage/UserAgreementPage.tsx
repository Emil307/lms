import React from "react";
import { Box, Flex } from "@mantine/core";
import { usePublicOffer } from "@entities/staticPage";
import { Heading, LastUpdatedInfo, Loader } from "@shared/ui";
import { UpdatePublicOfferForm } from "@features/publicOffer";

const UserAgreementPage = () => {
    const { data, isLoading } = usePublicOffer();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <Flex direction="column" gap={24}>
                <Heading>Публичная оферта</Heading>
                <LastUpdatedInfo data={data?.lastUpdated} scrollable />
            </Flex>
            <UpdatePublicOfferForm mt={24} mb={8} />
        </Box>
    );
};

export default UserAgreementPage;
