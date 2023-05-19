import React from "react";
import { Box, Flex, Loader, Text, Title } from "@mantine/core";
import { useAdminFaq } from "@entities/staticPage";
import { List as FaqList } from "@widgets/admin/faq";
import { LastUpdatedInfo } from "@shared/ui";

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
                <Title order={1} color="dark">
                    Вопрос-ответ
                </Title>
                <LastUpdatedInfo data={faqData.meta.lastUpdated} />
            </Flex>

            <FaqList maw={1162} />
        </Box>
    );
};

export default FaqPage;
