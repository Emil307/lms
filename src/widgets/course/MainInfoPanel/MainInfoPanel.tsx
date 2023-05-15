import { ActionIcon, Badge, Box, BoxProps, Divider, Flex, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { memo, useMemo } from "react";
import Image from "next/image";
import { Heart } from "react-feather";
import { CourseDetailData } from "@entities/course";
import { Button, Rating } from "@shared/ui";
import { getDiscountedAmount, getLocalizationDate, getPluralString } from "@shared/utils";

import IconCalendar from "public/icons/calendar.svg";
import IconUsers from "public/icons/users.svg";
import IconStarFour from "public/icons/starFour.svg";

import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: CourseDetailData;
}

const MemoizedMainInfoPanel = memo(function MainInfoPanel({ data, ...props }: MainInfoPanelProps) {
    const { classes } = useStyles();

    const renderStartDate = useMemo(() => {
        if (data.dateStart) {
            return <Text className={classes.contentText}>{`Старт: ${getLocalizationDate(data.dateStart)}`}</Text>;
        }
        return <Text className={classes.contentText}>Свободное прохождение</Text>;
    }, [data.dateStart]);

    const renderAmount = useMemo(() => {
        if (data.isDiscount && data.discount.data.value) {
            return (
                <Group sx={{ gap: 6 }}>
                    <Text className={classes.price}>{`${getDiscountedAmount(data.price, data.discount.data.value).toLocaleString(
                        "ru"
                    )} ₽`}</Text>
                    <Text className={classes.priceWithoutDiscount}>{`${data.price.toLocaleString("ru")} ₽`}</Text>
                </Group>
            );
        }
        return <Text className={classes.price}>{`${data.price.toLocaleString("ru")} ₽`}</Text>;
    }, [data.price, data.isDiscount, data.discount.data]);

    const renderTags = useMemo(() => {
        if (!data.tags.data.length) {
            return null;
        }

        return (
            <Group mt={16} sx={{ gap: 4 }}>
                {data.tags.data.map((tag) => (
                    <Badge key={tag.id} className={classes.tag}>
                        #{tag.name}
                    </Badge>
                ))}
            </Group>
        );
    }, [data.tags]);

    return (
        <Box {...props} className={classes.root}>
            <Flex mb={32}>
                <Group sx={{ flexDirection: "column", alignItems: "flex-start", flexWrap: "nowrap", flex: 1 }}>
                    <Group>
                        <Flex gap={8}>
                            {data.isDiscount && (
                                <Badge variant="outline" className={classes.discount}>
                                    {data.discount.data.value} %
                                </Badge>
                            )}
                            <Badge variant="outline" className={classes.category}>
                                {data.categories.data[0].name}
                            </Badge>
                        </Flex>
                        <Flex gap={8}>
                            <Flex gap={4}>
                                <Flex gap={2}>
                                    <Rating defaultValue={1} count={1} readOnly size="small" />
                                    <Text className={classes.ratingValue}>{data.rating}</Text>
                                </Flex>
                                <Text className={classes.ratingMaxValue}>из 5</Text>
                            </Flex>
                            <Divider className={classes.dividerDot} orientation="vertical" size={4} />
                            <Text className={classes.reviewInfo}>{`${data.reviewCount} ${getPluralString(
                                data.reviewCount,
                                "отзыв",
                                "отзыва",
                                "отзывов"
                            )}`}</Text>
                        </Flex>
                    </Group>
                    <Title order={1} color="dark">
                        {data.name}
                    </Title>
                    <Group>
                        <Flex align="center" gap={6}>
                            <ThemeIcon
                                variant="outline"
                                w={24}
                                h={24}
                                mih={24}
                                miw={24}
                                sx={(theme) => ({ border: "none", path: { fill: theme.colors.secondaryHover[0] } })}>
                                <IconCalendar />
                            </ThemeIcon>
                            {renderStartDate}
                        </Flex>
                        <Flex align="center" gap={6}>
                            <ThemeIcon
                                variant="outline"
                                w={24}
                                h={24}
                                mih={24}
                                miw={24}
                                sx={(theme) => ({ border: "none", path: { fill: theme.colors.secondaryHover[0] } })}>
                                <IconUsers />
                            </ThemeIcon>
                            <Text className={classes.contentText}>Мест осталось: {data.availableSeats}</Text>
                        </Flex>
                    </Group>
                    <Group sx={{ columnGap: 24, marginTop: 32 }}>
                        <Flex gap={8}>
                            <Button variant="secondary">Купить курс</Button>
                            <ActionIcon className={classes.favoriteActionIcon}>
                                <Heart />
                            </ActionIcon>
                        </Flex>
                        <Flex direction="column">
                            <Group sx={{ gap: 6 }}>
                                <IconStarFour />
                                <Text>{`${data.lessonCount} ${getPluralString(data.lessonCount, "урок", "урока", "уроков")}`}</Text>
                            </Group>
                            {renderAmount}
                        </Flex>
                    </Group>
                </Group>
                <Group>
                    <Box className={classes.imageWrapper}>
                        <Image
                            src={data.picture.data.path}
                            loader={({ src }) => `${src}`}
                            alt={data.picture.data.name}
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "cover"
                            }} />
                    </Box>
                </Group>
            </Flex>
            <Flex direction="column" gap={8}>
                <Text className={classes.descriptionTitle}>Описание курса</Text>
                <Text className={classes.contentText}>{data.description}</Text>
            </Flex>
            {renderTags}
        </Box>
    );
});

export default MemoizedMainInfoPanel;
