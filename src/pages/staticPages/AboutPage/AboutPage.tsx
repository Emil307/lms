import { Box, Flex, MediaQuery, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { BreadCrumbs, ContentByTextEditor, Heading, Loader } from "@shared/ui";
import { useAbout } from "@entities/staticPage";
import { AboutCard } from "@features/about";
import { breadCrumbsItems } from "./contants";

const AboutPage = () => {
    const { data: aboutData, isLoading, isError } = useAbout();

    const renderContent = useMemo(() => {
        if (isLoading) {
            return <Loader size="lg" sx={{ alignSelf: "center" }} />;
        }

        if (isError) {
            return <Text>Произошла ошибка, попробуйте позднее</Text>;
        }

        return (
            <Flex direction="column" gap={64}>
                <AboutCard data={aboutData} />
                <ContentByTextEditor data={aboutData.fullContent} />
            </Flex>
        );
    }, [isLoading]);

    return (
        <Box>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
            </MediaQuery>
            <Heading mb={32}>О проекте</Heading>
            {renderContent}
        </Box>
    );
};

export default AboutPage;
