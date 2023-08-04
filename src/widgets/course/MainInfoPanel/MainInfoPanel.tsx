import { ActionIcon, Badge, Box, BoxProps, Divider, Flex, Group, Text, ThemeIcon } from "@mantine/core";
import Image from "next/image";
import { Heart } from "react-feather";
import { GetCourseResponse } from "@entities/course";
import { Button, Heading, Paragraph, Rating } from "@shared/ui";
import { getPluralString, isMyCourse } from "@shared/utils";
import IconUsers from "public/icons/users.svg";
import IconStarFour from "public/icons/starFour.svg";
import useStyles from "./MainInfoPanel.styles";
import { AmountInfo, TagList } from "./components";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: GetCourseResponse;
}

const MainInfoPanel = ({ data, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles();

    //TODO: Добавить как бкеенд добавит это https://addamant.planfix.ru/task/94326/?comment=8748025
    // const renderStartDate = useMemo(() => {
    //     if (data.dateStart) {
    //         return <Text className={classes.contentText}>{`Старт: ${getLocalizationDate(data.dateStart)}`}</Text>;
    //     }
    //     return <Text className={classes.contentText}>Свободное прохождение</Text>;
    // }, [data.dateStart]);

    //TODO: Добавить функционал добавления курса в избранное
    const handleToggleFavorite = () => undefined;

    if (isMyCourse(data)) {
        return null;
    }

    return (
        <Box {...props} className={classes.root}>
            <Flex gap={48} mb={32}>
                <Flex direction="column" sx={{ flex: 1 }}>
                    <Group>
                        <Flex gap={8}>
                            {data.discount && <Badge className={classes.discount}>{data.discount.amount} %</Badge>}
                            <Badge className={classes.category}>{data.category?.name}</Badge>
                        </Flex>
                        <Flex gap={8}>
                            <Flex gap={4}>
                                <Flex gap={2}>
                                    <Rating defaultValue={1} count={1} readOnly size="small" />
                                    <Text className={classes.ratingValue}>{data.rating.averageRating}</Text>
                                </Flex>
                                <Text className={classes.ratingMaxValue}>из 5</Text>
                            </Flex>
                            <Divider className={classes.dividerDot} orientation="vertical" size={4} />
                            <Text className={classes.reviewInfo}>{`${data.rating.reviewsCount} ${getPluralString(
                                data.rating.reviewsCount,
                                "отзыв",
                                "отзыва",
                                "отзывов"
                            )}`}</Text>
                        </Flex>
                    </Group>
                    <Heading>{data.name}</Heading>
                    <Group>
                        {/* //TODO: Вернуть как бек начнет возращать инфу о  начале старта курса (группы) */}
                        {/* <Flex align="center" gap={6}>
                           <ThemeIcon className={classes.icon}>
                                <IconCalendar />
                            </ThemeIcon>
                            {renderStartDate}
                        </Flex> */}
                        <Flex align="center" gap={6}>
                            <ThemeIcon className={classes.icon}>
                                <IconUsers />
                            </ThemeIcon>
                            {/* //TODO: Вернуть как бек начнет возращать инфу о  кол-ве оставшихся мест в группе */}
                            {/* <Paragraph variant="text-small-m" >Мест осталось: {data.availableSeats}</Paragraph> */}
                        </Flex>
                    </Group>
                    <Group sx={{ columnGap: 24, marginTop: 32 }}>
                        <Flex gap={8}>
                            <Button variant="secondary">Купить курс</Button>
                            <ActionIcon className={classes.favoriteActionIcon} onClick={handleToggleFavorite}>
                                <Heart />
                            </ActionIcon>
                        </Flex>
                        <Flex direction="column">
                            <Flex gap={6}>
                                <IconStarFour />
                                <Paragraph variant="text-small-m">{`${data.lessonsCount} ${getPluralString(
                                    data.lessonsCount,
                                    "урок",
                                    "урока",
                                    "уроков"
                                )}`}</Paragraph>
                            </Flex>
                            <AmountInfo data={data} />
                        </Flex>
                    </Group>
                </Flex>
                <Box className={classes.imageWrapper}>
                    {data.cover && (
                        <Image src={data.cover.absolutePath} loader={({ src }) => `${src}`} fill sizes="100vw" alt={data.cover.name} />
                    )}
                </Box>
            </Flex>
            <Flex direction="column" gap={8}>
                <Paragraph variant="text-small-m" color="gray45">
                    Описание курса
                </Paragraph>
                <Paragraph variant="small-m">{data.description}</Paragraph>
            </Flex>
            <TagList data={data.tags} mt={16} />
        </Box>
    );
};

export default MainInfoPanel;
