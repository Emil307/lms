import { Flex } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Heading, Prompt, Tabs } from "@shared/ui";
import { AdminList as AdminStaticReviewList } from "@features/staticReviews";
import { tabsList } from "./constants";
import { CreateStaticReviewButton } from "./components";
import useStyles from "./StaticReviewsPage.styles";

const StaticReviewsPage = () => {
    const router = useRouter();
    const [openedPrompt, setOpenedPrompt] = useState(true);

    const { classes } = useStyles();

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            case "banner":
                return router.push({ pathname: "/admin/settings/main-page/banner" });
            case "advantages":
                return router.push({ pathname: "/admin/settings/main-page/advantages" });
            default:
                return router.push({ pathname: "/admin/settings/main-page/reviews" });
        }
    };

    const handleClosePrompt = () => setOpenedPrompt(false);

    return (
        <Flex direction="column" gap={24}>
            <Heading>Титульная страница</Heading>
            <Tabs value={tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} />

            <Flex direction="column" gap={32}>
                <Prompt
                    isOpened={openedPrompt}
                    content="Отзывы из данного раздела отображаются на главной странице."
                    onClose={handleClosePrompt}
                />
                <Flex className={classes.headingContainer}>
                    <Heading order={2}>Отзывы для титульной страницы</Heading>
                    <CreateStaticReviewButton />
                </Flex>
                <AdminStaticReviewList />
            </Flex>
        </Flex>
    );
};

export default StaticReviewsPage;
