import { Box, Title, Text, Loader } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { usePublicOffer } from "@entities/staticPage";
import { breadCrumbsItems } from "./constants";
import useStyles from "./UserAgreementPage.styles";

const UserAgreementPage = () => {
    const { classes } = useStyles();
    const { data: publicOfferData, isLoading } = usePublicOffer();

    const renderContent = () => {
        if (isLoading) return <Loader size="lg" sx={{ alignSelf: "center" }} />;

        return <Text className={classes.content} dangerouslySetInnerHTML={{ __html: publicOfferData?.content || "" }} />;
    };

    return (
        <Box className={classes.root}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    Пользовательское соглашение
                </Title>
            </Box>
            {renderContent()}
        </Box>
    );
};

export default UserAgreementPage;
