import { Box, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { FaqAccordionList } from "@features/faq";

const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Вопрос-ответ", href: { pathname: "/faq" } },
];

const FaqPage = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    Вопрос-ответ
                </Title>
            </Box>
            <FaqAccordionList />
        </Box>
    );
};

export default FaqPage;
