import React from "react";
import { Box, Flex, Text } from "@mantine/core";
import { useAdminFaq } from "@entities/staticPage";
import { List as FaqList } from "@widgets/admin/faq";
import { Heading, LastUpdatedInfo, Loader } from "@shared/ui";

const FaqPage = () => {
    const { data: faqData, isLoading, isError } = useAdminFaq();

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее.</Text>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <Flex direction="column" gap={24} mb={32}>
                <Heading>Вопрос-ответ</Heading>
                <LastUpdatedInfo data={faqData.meta.lastUpdated} scrollable />
            </Flex>

            <FaqList maw={1162} />
        </Box>
    );
};

export default FaqPage;
