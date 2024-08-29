import { Box, Flex } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Heading, LastUpdatedInfo, Prompt, Tabs } from "@shared/ui";
import { AdminList as AdminAdvantageList } from "@features/advantages";
import { useAdminAdvantages } from "@entities/staticPage";
import { initialParams, tabsList } from "./constants";
import { CreateAdvantageButton } from "./components";
import useStyles from "./AdvantagesPage.styles";

const AdvantagesPage = () => {
    const router = useRouter();
    const [openedPrompt, setOpenedPrompt] = useState(true);

    const { classes } = useStyles();

    const { data: advantagesData } = useAdminAdvantages(initialParams);

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            case "banner":
                return router.push({ pathname: "/admin/settings/main-page/banner" });
            case "advantages":
                return router.push({ pathname: "/admin/settings/main-page/advantages" });
            default:
                return router.push({ pathname: "/admin/settings/main-page/banner" });
        }
    };

    const handleClosePrompt = () => setOpenedPrompt(false);

    return (
        <Flex direction="column" gap={32}>
            <Flex direction="column" gap={24}>
                <Heading>Титульная страница</Heading>
                <LastUpdatedInfo data={advantagesData?.meta.lastUpdated} />
                <Tabs value={tabsList[1].value} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} />
                <Prompt
                    isOpened={openedPrompt}
                    content="Данные из этого раздела используются для главного баннера на титульной странице."
                    onClose={handleClosePrompt}
                />
            </Flex>

            <Box>
                <Flex className={classes.headingContainer}>
                    <Heading order={2}>Карточки преимуществ</Heading>
                    <CreateAdvantageButton />
                </Flex>
                <AdminAdvantageList />
            </Box>
        </Flex>
    );
};

export default AdvantagesPage;
