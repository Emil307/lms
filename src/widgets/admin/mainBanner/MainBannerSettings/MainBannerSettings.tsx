import { Box, Flex, FlexProps } from "@mantine/core";
import { IconClipboardText } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading } from "@shared/ui";
import { GetMainBannerResponse, useMainBanner } from "@entities/staticPage";
import { InfoCard } from "@components/InfoCard";
import useStyles from "./MainBannerSettings.styles";
import { fields } from "./constants";

export interface MainBannerSettingsProps extends Omit<FlexProps, "children"> {}

const MainBannerSettings = (props: MainBannerSettingsProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const { data } = useMainBanner();

    const handleOpenUpdateMainBannerPage = () => router.push("/admin/settings/main-page/banner/edit");

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Heading order={2}>Данные для главного баннера</Heading>

                <Fieldset label="Детали" icon={<IconClipboardText />}>
                    <DisplayField label="Заголовок баннера" value={data?.title} />
                    <DisplayField label="Подзаголовок" value={data?.subTitle} />
                    <DisplayField label="Программируемая кнопка" value={data?.buttonText} />
                </Fieldset>
            </Flex>
            <Box>
                <InfoCard<GetMainBannerResponse>
                    image={{
                        src: data?.image?.absolutePath,
                        alt: "banner image",
                    }}
                    variant="whiteBg"
                    fields={fields}
                    hideFieldIfEmpty
                    values={data}
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateMainBannerPage}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Flex>
    );
};

export default MainBannerSettings;
