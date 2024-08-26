import { Box, Flex, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { BreadCrumbs, Display, Loader } from "@shared/ui";
import { useAbout } from "@entities/staticPage";
import { AboutCard } from "@features/about";
import { breadCrumbsItems } from "./constants";
import useStyles from "./AboutPage.styles";

const AboutPage = () => {
    const { classes } = useStyles();
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
            </Flex>
        );
    }, [isLoading]);

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={16} />
            <Flex className={classes.wrapper}>
                <Display>О проекте</Display>
                {renderContent}
            </Flex>
        </Box>
    );
};

export default AboutPage;
