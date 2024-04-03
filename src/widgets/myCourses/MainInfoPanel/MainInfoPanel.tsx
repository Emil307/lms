import { Badge, Box, BoxProps, Flex, Group } from "@mantine/core";
import Image from "next/image";
import { PlayCircle, Star } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Button, Heading, Paragraph } from "@shared/ui";
import { GetGroupResponse } from "@entities/group";
import { CreateCourseReviewForm } from "@features/courseReviews";
import { AvailableDate, ProgressInfo, RatingInfo, TagList } from "./components";
import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: GetGroupResponse;
}
const MainInfoPanel = ({ data, ...props }: MainInfoPanelProps) => {
    const router = useRouter();
    const { classes } = useStyles({ status: data.status.name });

    const handleCloseCreateReviewModal = () => closeModal("CREATE_COURSE_REVIEW");

    const handleOpenCreateReviewModal = () => {
        openModal({
            modalId: "CREATE_COURSE_REVIEW",
            title: "Оставить отзыв",
            size: 408,
            children: <CreateCourseReviewForm data={data} onClose={handleCloseCreateReviewModal} />,
        });
    };

    const handleOpenNextLessonFromMyCoursePage = () =>
        router.push({
            pathname: "/my-courses/[id]/lessons/[lessonId]",
            query: { id: String(data.groupId), lessonId: String(data.nextLesson?.id) },
        });

    const renderActionButton = () => {
        switch (data.status.name) {
            case "inProgress":
                if (!data.nextLesson) {
                    return null;
                }
                return (
                    <Button
                        className={classes.nextLessonButton}
                        variant="text"
                        leftIcon={<PlayCircle />}
                        onClick={handleOpenNextLessonFromMyCoursePage}
                        w="min-content">
                        {data.nextLesson.name}
                    </Button>
                );
            default:
                if (data.modalShowed && !data.isReviewed) {
                    return (
                        <Button variant="border" leftIcon={<Star />} w="min-content" onClick={handleOpenCreateReviewModal}>
                            Оценить курс
                        </Button>
                    );
                }
                return null;
        }
    };

    return (
        <Box {...props} className={classes.root}>
            <Flex className={classes.contentBody}>
                <Flex className={classes.contentBodyLeftContainer}>
                    <Flex direction="column" gap={16}>
                        <Group>
                            <Flex gap={8}>
                                <Badge className={classes.status}>{data.status.displayName}</Badge>
                                {data.category && <Badge className={classes.category}>{data.category.name}</Badge>}
                            </Flex>
                            <RatingInfo data={data.rating} />
                        </Group>
                        <Heading order={1}>{data.name}</Heading>
                        <AvailableDate availableTo={data.availableTo} />
                    </Flex>
                    <ProgressInfo data={data} />
                    {renderActionButton()}
                </Flex>
                <Box className={classes.imageWrapper}>
                    {data.cover && <Image src={data.cover.absolutePath} fill sizes="100vw" alt={data.cover.name} />}
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
