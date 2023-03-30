import { Box, Title, Text, Flex, Loader } from "@mantine/core";
import React, { useMemo } from "react";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { useAbout } from "@entities/staticPage";
import { AboutCard } from "@features/about";

const AboutPage = () => {
    const { data: aboutData, isLoading } = useAbout();

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: "О проекте", href: { pathname: "/about" } },
    ];

    const renderContent = useMemo(() => {
        if (isLoading) return <Loader size="lg" sx={{ alignSelf: "center" }} />;

        return (
            <Flex direction="column" gap={64}>
                <AboutCard data={aboutData} />
                <Text
                    sx={(theme) => ({
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: "24px",
                        color: theme.colors.dark[0],
                    })}
                    dangerouslySetInnerHTML={{ __html: aboutData?.fullContent || "" }}
                />
            </Flex>
        );
    }, [isLoading]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
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
