import { Flex } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Heading, LastUpdatedInfo, Prompt, Tabs } from "@shared/ui";
import { MainBannerDetails } from "@widgets/admin/mainBanner";
import { useMainBanner } from "@entities/staticPage";
import { tabsList } from "./constants";

const MainBannerPage = () => {
    const router = useRouter();
    const [openedPrompt, setOpenedPrompt] = useState(true);
    const { data } = useMainBanner();

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
            <LastUpdatedInfo data={data?.lastUpdated} />
            <Tabs value={tabsList[1].value} tabs={tabsList} onTabChange={handleChangeTab} />
            <Prompt
                isOpened={openedPrompt}
                content="Данные из этого раздела используются для главного баннера на титульной странице."
                onClose={handleClosePrompt}
            />
            <MainBannerDetails />
        </Flex>
    );
};

export default MainBannerPage;
