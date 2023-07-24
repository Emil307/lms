import { Box, Flex } from "@mantine/core";
import React from "react";
import { useAbout } from "@entities/staticPage";
import { UpdateAboutForm } from "@features/about";
import { Heading, LastUpdatedInfo, Loader } from "@shared/ui";

const AboutPage = () => {
    const { data, isLoading } = useAbout();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <Flex direction="column" gap={24}>
                <Heading>О проекте</Heading>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
            <UpdateAboutForm mt={32} mb={8} />
        </Box>
    );
};

export default AboutPage;
