import { Box, Flex } from "@mantine/core";
import React, { useState } from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading, Prompt, Tabs } from "@shared/ui";
import { AdminList as AdminStaticReviewList } from "@features/staticReviews";
import { tabsList } from "./constants";

const StaticReviewsPage = () => {
    const router = useRouter();
    const [openedPrompt, setOpenedPrompt] = useState(true);

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

    const handleClosePrompt = () => setOpenedPrompt(false);

    return (
        <Flex direction="column" gap={24}>
            <Heading>Титульная страница</Heading>
            <Tabs value={tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} />
            <Prompt
                isOpened={openedPrompt}
                content="Отзывы из данного раздела отображаются на главной странице."
                onClose={handleClosePrompt}
            />
            <Box>
                <Flex gap={48} align="center">
                    <Heading order={2}>Отзывы для титульной страницы</Heading>
                    <Button variant="text" leftIcon={<PlusCircle />} onClick={redirectCreateReview}>
                        Добавить отзыв
                    </Button>
                </Flex>
                <AdminStaticReviewList mt={24} />
            </Box>
        </Flex>
    );
};

export default StaticReviewsPage;
