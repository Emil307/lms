import { Box, Flex, Text } from "@mantine/core";
import React from "react";
import { BreadCrumbs, ContentByTextEditor, Display, Loader } from "@shared/ui";
import { usePublicOffer } from "@entities/staticPage";
import { breadCrumbsItems } from "./constants";
import useStyles from "./UserAgreementPage.styles";

const UserAgreementPage = () => {
    const { classes } = useStyles();
    const { data: publicOfferData, isLoading, isError } = usePublicOffer();

    const renderContent = () => {
        if (isLoading) {
            return <Loader size="lg" sx={{ alignSelf: "center" }} />;
        }

        if (isError) {
            return <Text>Произошла ошибка, попробуйте позднее</Text>;
        }

        return <ContentByTextEditor data={publicOfferData.content} />;
    };

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={16} />
            <Flex className={classes.wrapper}>
                <Display>Пользовательское соглашение</Display>
                {renderContent()}
            </Flex>
        </Box>
    );
};

export default UserAgreementPage;
