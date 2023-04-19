import { Box, Flex, Title } from "@mantine/core";
import React, { useState } from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Prompt, Tabs } from "@shared/ui";
import { List as StaticReviewList } from "@features/staticReviews";
import { tabsList } from "./constants";

const StaticReviewsPage = () => {
    const router = useRouter();
    const [showPrompt, setShowPrompt] = useState(true);

    const redirectCreateReview = () => router.push({ pathname: "/admin/settings/main-page/reviews/create" });

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            case "banner":
                router.push({ pathname: "/admin/settings/main-page/banner" });
                break;
            case "advantages":
                router.push({ pathname: "/admin/settings/main-page/advantages" });
                break;
            default:
                router.push({ pathname: "/admin/settings/main-page/reviews" });
                break;
        }
    };

    const handleClosePrompt = () => setShowPrompt(false);

    return (
        <Flex direction="column" gap={32}>
            <Title order={1} color="dark">
                Титульная страница
            </Title>
            <Tabs value={tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} />
            {showPrompt && <Prompt content="Отзывы из данного раздела отображаются на главной странице." onClose={handleClosePrompt} />}
            <Box>
                <Flex gap={48} align="center">
                    <Title order={2} color="dark">
                        Отзывы для титульной страницы
                    </Title>
                    <Button variant="text" leftIcon={<PlusCircle />} onClick={redirectCreateReview}>
                        Добавить отзыв
                    </Button>
                </Flex>
                <StaticReviewList />
            </Box>
        </Flex>
    );
};

export default StaticReviewsPage;
