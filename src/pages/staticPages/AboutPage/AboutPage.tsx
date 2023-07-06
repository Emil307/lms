import { Box, Title, Flex } from "@mantine/core";
import React, { useMemo } from "react";
import { BreadCrumbs, ContentByTextEditor, Loader } from "@shared/ui";
import { useAbout } from "@entities/staticPage";
import { AboutCard } from "@features/about";
import { breadCrumbsItems } from "./contants";

const AboutPage = () => {
    const { data: aboutData, isLoading } = useAbout();

    const renderContent = useMemo(() => {
        if (isLoading) return <Loader size="lg" sx={{ alignSelf: "center" }} />;

        return (
            <Flex direction="column" gap={64}>
                <AboutCard data={aboutData} />
                <ContentByTextEditor data={aboutData?.fullContent} />
            </Flex>
        );
    }, [isLoading]);

    return (
        <Flex direction="column" gap={32}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    О проекте
                </Title>
            </Box>
            {renderContent}
        </Flex>
    );
};

export default AboutPage;
