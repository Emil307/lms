import { Box, Flex, Loader, Title } from "@mantine/core";
import React from "react";
import { useAbout } from "@entities/staticPage";
import { UpdateAboutForm } from "@features/about";
import { LastUpdatedInfo } from "@shared/ui";

const AboutPage = () => {
    const { data, isLoading } = useAbout();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <Flex direction="column" gap={24}>
                <Title order={1} color="dark">
                    О проекте
                </Title>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
            <UpdateAboutForm mt={32} />
        </Box>
    );
};

export default AboutPage;