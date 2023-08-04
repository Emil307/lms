import { ActionIcon, Badge, Box, BoxProps, Divider, Flex, Group, Text, ThemeIcon } from "@mantine/core";
import Image from "next/image";
import { Heart } from "react-feather";
import dayjs from "dayjs";
import IconCalendar from "public/icons/calendar.svg";
import { CourseDetails, useUpdateCourseFavoriteStatus } from "@entities/course";
import { Button, Heading, Paragraph, Rating } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import IconUsers from "public/icons/users.svg";
import IconStarFour from "public/icons/starFour.svg";
import useStyles from "./MainInfoPanel.styles";
import { AmountInfo, TagList } from "./components";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
}

const MainInfoPanel = ({ data, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles({ isFavorite: data.isFavorite });

    const updateCourseFavoriteStatus = useUpdateCourseFavoriteStatus({ id: String(data.id) });

    const renderStartDate = () => {
        if (data.type === "interactive") {
            return (
                <Paragraph variant="text-small-m">{`Доступ: до ${dayjs(data.upcomingGroup?.educationStartDate).format(
                    "D MMMM YYYY"
                )}`}</Paragraph>
            );
        }
        return <Paragraph variant="text-small-m">Свободное прохождение</Paragraph>;
    };

    const handleToggleFavorite = () => updateCourseFavoriteStatus.mutate({ isFavorite: !data.isFavorite });

    return (
        <Box {...props} className={classes.root}>
            <Flex gap={48} mb={32}>
                <Flex gap={16} direction="column" sx={{ flex: 1 }}>
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
                        <Flex align="center" gap={6}>
                            <ThemeIcon className={classes.icon}>
                                <IconCalendar />
                            </ThemeIcon>
                            {renderStartDate()}
                        </Flex>
                        <Flex align="center" gap={6}>
                            <ThemeIcon className={classes.icon}>
                                <IconUsers />
                            </ThemeIcon>
                            <Paragraph variant="text-small-m">Мест осталось: {data.upcomingGroup?.freePlacesCount}</Paragraph>
                        </Flex>
                    </Group>
                    <Group sx={{ columnGap: 24, marginTop: 32 }}>
                        <Flex gap={8}>
                            {/* //TODO: Добавил функционал покупки курса как бек это добавит */}
                            <Button variant="secondary">Купить курс</Button>
                            <ActionIcon
                                className={classes.favoriteActionIcon}
                                onClick={handleToggleFavorite}
                                disabled={updateCourseFavoriteStatus.isLoading}>
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
