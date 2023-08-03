import { Badge, Box, BoxProps, Divider, Flex, Group, Text } from "@mantine/core";
import Image from "next/image";
import { PlayCircle, Star } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading, Paragraph, Rating } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { GetGroupResponse } from "@entities/group";
import { CreateCourseReviewForm } from "@features/courseReviews";
import { AccessEndDate, ProgressInfo, TagList } from "./components";
import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: GetGroupResponse;
}

const MainInfoPanel = ({ data, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles({ status: data.status.name });

    const handleCloseCreateReviewModal = () => closeModal("CREATE_COURSE_REVIEW");

    const handleOpenCreateReviewModal = () => {
        openModal({
            modalId: "CREATE_COURSE_REVIEW",
            title: "Оставить отзыв",
            centered: true,
            size: 408,
            children: <CreateCourseReviewForm data={data} onClose={handleCloseCreateReviewModal} />,
        });
    };

    const renderActionButton = () => {
        switch (data.status.name) {
            case "notStarted":
                //TODO: Добавить редирект
                return <Button w="min-content">Начать обучение</Button>;

            case "inProgress":
                //TODO: Добавить редирект и название урока
                return (
                    <Button variant="text" leftIcon={<PlayCircle />} w="min-content">
                        Урок 3: Название урока
                    </Button>
                );
            case "completed":
                return (
                    <Button variant="border" leftIcon={<Star />} w="min-content" onClick={handleOpenCreateReviewModal}>
                        Оценить курс
                    </Button>
                );
            default:
                break;
        }
    };

    return (
        <Box {...props} className={classes.root}>
            <Flex gap={48} mb={32}>
                <Flex direction="column" gap={24} sx={{ flex: 1 }}>
                    <Group>
                        <Flex gap={8}>
                            <Badge className={classes.status}>{data.status.displayName}</Badge>
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
                    <Flex direction="column" gap={16}>
                        <Heading order={1}>{data.name}</Heading>
                        <AccessEndDate availableTo={data.availableTo} />
                    </Flex>
                    <ProgressInfo data={data} w="100%" />
                    {renderActionButton()}
                </Flex>

                <Box className={classes.imageWrapper}>
                    <Image src={data.cover.absolutePath} loader={({ src }) => `${src}`} fill sizes="100vw" alt={data.cover.name} />
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
