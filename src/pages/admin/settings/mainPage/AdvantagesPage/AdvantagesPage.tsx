import { Box, Flex, Title } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, LastUpdatedInfo, Prompt, Tabs } from "@shared/ui";
import { AdminList as AdminAdvantageList, CreateAdvantageForm } from "@features/advantages";
import { useAdminAdvantages } from "@entities/staticPage";
import { initialParams, tabsList } from "./constants";

const AdvantagesPage = () => {
    const router = useRouter();
    const [openedPrompt, setOpenedPrompt] = useState(true);

    const { data: advantagesData } = useAdminAdvantages(initialParams);

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

    const handleCloseCreateAdvantageModal = () => closeModal("CREATE_ADVANTAGE");

    const openCreateAdvantageModal = () => {
        openModal({
            modalId: "CREATE_ADVANTAGE",
            title: "Создание карточки",
            centered: true,
            children: <CreateAdvantageForm onClose={handleCloseCreateAdvantageModal} />,
        });
    };

    const handleClosePrompt = () => setOpenedPrompt(false);

    return (
        <Flex direction="column" gap={24}>
            <Title order={1} color="dark">
                Титульная страница
            </Title>
            <LastUpdatedInfo data={advantagesData?.meta.lastUpdated} />
            <Tabs value={tabsList[2].value} tabs={tabsList} onTabChange={handleChangeTab} />
            <Prompt
                isOpened={openedPrompt}
                content="Данные из этого раздела используются для главного баннера на титульной странице."
                onClose={handleClosePrompt}
            />
            <Box>
                <Flex gap={48} align="center">
                    <Title order={2} color="dark">
                        Карточки преимуществ
                    </Title>
                    <Button variant="text" leftIcon={<PlusCircle />} onClick={openCreateAdvantageModal}>
                        Добавить карточку
                    </Button>
                </Flex>
                <AdminAdvantageList />
            </Box>
        </Flex>
    );
};

export default AdvantagesPage;
