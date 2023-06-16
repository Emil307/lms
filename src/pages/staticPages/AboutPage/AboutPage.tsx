import { Box, Title, Text, Flex } from "@mantine/core";
import React, { useMemo } from "react";
import { BreadCrumbs, Loader } from "@shared/ui";
import { useAbout } from "@entities/staticPage";
import { AboutCard } from "@features/about";
import { breadCrumbsItems } from "./contants";
import useStyles from "./AboutPage.styles";

const AboutPage = () => {
    const { classes } = useStyles();
    const { data: aboutData, isLoading } = useAbout();

    const renderContent = useMemo(() => {
        if (isLoading) return <Loader size="lg" sx={{ alignSelf: "center" }} />;

        return (
            <Flex direction="column" gap={64}>
                <AboutCard data={aboutData} />
                <Text className={classes.fullContent} dangerouslySetInnerHTML={{ __html: aboutData?.fullContent || "" }} />
            </Flex>
        );
    }, [isLoading]);

    return (
        <Box className={classes.root}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    О проекте
                </Title>
            </Box>
            {renderContent}
        </Box>
    );
};

export default AboutPage;
