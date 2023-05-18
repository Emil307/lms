import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { IconAlignLeft, IconClipboardText } from "@tabler/icons-react";
import Image from "next/image";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { useMainBanner } from "@entities/staticPage";
import useStyles from "./Details.styles";

const Details = () => {
    const { classes } = useStyles();
    const { data } = useMainBanner();

    //TODO: Добавить редирект на страницу редактирования банера
    const openBannerEditPage = () => undefined;

    return (
        <Box>
            <Box className={classes.info}>
                <Flex direction="column">
                    <Title order={2}>Данные для главного баннера</Title>

                    <Fieldset mt={32} label="Детали" icon={<IconClipboardText />}>
                        <DisplayField label="Заголовок баннера" value={data?.title} />
                        <DisplayField label="Подзаголовок" value={data?.subTitle} />
                        <DisplayField label="Программируемая кнопка" value={data?.buttonText} />
                    </Fieldset>

                    <Fieldset mt={24} label="Содержание цитаты" icon={<IconAlignLeft />}>
                        <DisplayField label="Автор" value={`${data?.authorFirstName} ${data?.authorLastName}`} />
                        <DisplayField label="Об авторе" value={data?.authorAbout} />
                        <DisplayField label="Цитата" value={data?.authorShortQuote} />
                    </Fieldset>
                </Flex>
                <Box>
                    <Flex className={classes.bannerCardInfo}>
                        <Box className={classes.imageWrapper}>
                            <Image
                                src={data?.image.data.absolutePath || ""}
                                loader={({ src }) => `${src}`}
                                alt={data?.image.data.name || ""}
                                fill
                                sizes="100vw"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
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
