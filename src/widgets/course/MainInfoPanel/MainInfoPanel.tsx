import { Badge, Box, BoxProps, Flex, Group, ThemeIcon } from "@mantine/core";
import Image from "next/image";
import { CourseDetails } from "@entities/course";
import { Button, Heading, Paragraph } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import IconUsers from "public/icons/users.svg";
import IconStarFour from "public/icons/starFour.svg";
import { FavoriteButton } from "@features/courses";
import { useAuthPay } from "@app/utils";
import useStyles from "./MainInfoPanel.styles";
import { AmountInfo, DiscountInfo, RatingInfo, StartDateAvailableGroup, TagList } from "./components";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
}

const MainInfoPanel = ({ data, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles();

    const { handleBuyEntity, isLoading } = useAuthPay({
        entityId: data.id,
        entityName: data.name,
        entityType: "course",
        entityPrice: data.discountPrice,
    });

    return (
        <Box {...props} className={classes.root}>
            <Flex className={classes.contentBody}>
                <Flex className={classes.contentBodyLeftContainer}>
                    <Flex className={classes.contentBodyTextContainer}>
                        <Group>
                            <Flex gap={8} hidden={!data.category && !data.discount}>
                                <DiscountInfo discount={data.discount} discountPrice={data.discountPrice} fullPrice={data.price} />
                                <Badge className={classes.category} hidden={!data.category}>
                                    {data.category?.name}
                                </Badge>
                            </Flex>
                            <RatingInfo data={data.rating} />
                        </Group>
                        <Heading>{data.name}</Heading>
                        <Flex className={classes.availableGroupInfoContainer}>
                            <StartDateAvailableGroup data={data} />
                            <Flex align="center" gap={6}>
                                <ThemeIcon className={classes.icon}>
                                    <IconUsers />
                                </ThemeIcon>
                                <Paragraph variant="text-small-m">Мест осталось: {data.availableGroup?.freePlacesCount || 0}</Paragraph>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex className={classes.containerActions}>
                        <Flex gap={8}>
                            <Button
                                variant="secondary"
                                disabled={!data.availableGroup?.freePlacesCount}
                                loading={isLoading}
                                onClick={handleBuyEntity}>
                                Купить курс
                            </Button>
                            <FavoriteButton variant="compact" data={data} className={classes.favoriteActionIcon} />
                        </Flex>
                        <Flex direction="column" gap={2}>
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
                    </Flex>
                </Flex>

                <Box className={classes.imageWrapper}>
                    {data.cover && (
                        <Image src={data.cover.absolutePath} loader={({ src }) => `${src}`} fill sizes="100vw" alt={data.cover.name} />
                    )}
                </Box>
            </Flex>
            <Flex className={classes.descriptionContainer} hidden={!data.description}>
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
