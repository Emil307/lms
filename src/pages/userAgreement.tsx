import { Box, Title, Text, Loader } from "@mantine/core";
import React, { useMemo } from "react";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { usePublicOffer } from "@entities/staticPage";

const UserAgreementPage = () => {
    const { data: publicOfferData, isLoading } = usePublicOffer();

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: "Пользовательское соглашение", href: { pathname: "/userAgreement" } },
    ];

    const renderContent = useMemo(() => {
        if (isLoading) return <Loader size="lg" sx={{ alignSelf: "center" }} />;

        return (
            <Text
                sx={(theme) => ({
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "24px",
                    color: theme.colors.dark[0],
                })}
                dangerouslySetInnerHTML={{ __html: publicOfferData?.content || "" }}
            />
        );
    }, [isLoading]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    Пользовательское соглашение
                </Title>
            </Box>
            {renderContent}
        </Box>
    );
};

export default UserAgreementPage;
