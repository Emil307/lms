import { Flex, Title } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Prompt, Tabs } from "@shared/ui";
import { MainBannerDetails } from "@widgets/admin/mainBanner";
import { tabsList } from "./constants";

const MainBannerPage = () => {
    const router = useRouter();
    const [showPrompt, setShowPrompt] = useState(true);

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
            <Tabs value={tabsList[1].value} tabs={tabsList} onTabChange={handleChangeTab} />
            {showPrompt && (
                <Prompt
                    content="Данные из этого раздела используются для главного баннера на титульной странице."
                    onClose={handleClosePrompt}
                />
            )}
            <MainBannerDetails />
        </Flex>
    );
};

export default MainBannerPage;