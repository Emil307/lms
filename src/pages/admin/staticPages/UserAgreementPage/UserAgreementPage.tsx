import React from "react";
import { Box, Flex, Loader, Title } from "@mantine/core";
import { usePublicOffer } from "@entities/staticPage";
import { LastUpdatedInfo } from "@shared/ui";
import { UpdatePublicOfferForm } from "@features/publicOffer";

const UserAgreementPage = () => {
    const { data, isLoading } = usePublicOffer();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <Flex direction="column" gap={24}>
                <Title order={1} color="dark">
                    Публичная оферта
                </Title>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
            <UpdatePublicOfferForm mt={24} />
        </Box>
    );
};

export default UserAgreementPage;
