import { Box, Flex } from "@mantine/core";
import React from "react";
import { IconAlignLeft, IconClipboardText } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading } from "@shared/ui";
import { useMainBanner } from "@entities/staticPage";
import useStyles from "./Details.styles";

const Details = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const { data } = useMainBanner();

    const openBannerEditPage = () => router.push("/admin/settings/main-page/banner/edit");

    const getFullName = () => {
        if (!data?.authorFirstName && !data?.authorLastName) {
            return "-";
        }

        return `${data.authorFirstName} ${data.authorLastName}`;
    };

    return (
        <Box>
            <Box className={classes.info}>
                <Flex direction="column">
                    <Heading order={2}>Данные для главного баннера</Heading>

                    <Fieldset mt={32} label="Детали" icon={<IconClipboardText />}>
                        <DisplayField label="Заголовок баннера" value={data?.title} />
                        <DisplayField label="Подзаголовок" value={data?.subTitle} />
                        <DisplayField label="Программируемая кнопка" value={data?.buttonText} />
                    </Fieldset>

                    <Fieldset mt={24} label="Содержание цитаты" icon={<IconAlignLeft />}>
                        <DisplayField label="Автор" value={getFullName()} />
                        <DisplayField label="Об авторе" value={data?.authorAbout} />
                        <DisplayField label="Цитата" value={data?.authorShortQuote} />
                    </Fieldset>
                </Flex>
                <Box>
                    <Flex className={classes.bannerCardInfo}>
                        <Box className={classes.imageWrapper}>
                            {data?.image && (
                                <Image
                                    src={data.image.absolutePath}
                                    loader={({ src }) => `${src}`}
                                    alt={data.image.name}
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </Box>
                        <Flex direction="column" gap={8}>
                            <DisplayField label="Заголовок баннера" value={data?.title} variant="compact" />
                            <DisplayField label="Программириемая кнопка" value={data?.buttonText} variant="compact" />
                            <DisplayField
                                label="Карточка с цитатой"
                                value={data?.authorShortQuote ? "Есть" : "Отсутствует"}
                                variant="compact"
                            />
                        </Flex>
                        <Button variant="secondary" onClick={openBannerEditPage}>
                            Редактировать данные
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default Details;
