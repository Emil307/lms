import { Flex } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Heading, LastUpdatedInfo, Prompt, Tabs } from "@shared/ui";
import { useMainBanner } from "@entities/staticPage";
import { MainBannerSettings } from "@widgets/admin/mainBanner";
import { tabsList } from "./constants";

const MainBannerPage = () => {
    const router = useRouter();
    const [openedPrompt, setOpenedPrompt] = useState(true);
    const { data } = useMainBanner();

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
        <Flex direction="column" gap={32}>
            <Flex direction="column" gap={24}>
                <Heading>Титульная страница</Heading>
                <LastUpdatedInfo data={data?.lastUpdated} scrollable />
                <Tabs value={tabsList[1].value} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} />
                <Prompt
                    isOpened={openedPrompt}
                    content="Данные из этого раздела используются для главного баннера на титульной странице."
                    onClose={handleClosePrompt}
                />
            </Flex>
            <MainBannerSettings />
        </Flex>
    );
};

export default MainBannerPage;
