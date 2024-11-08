import { Card as MCard, CardProps as MCardProps, Text } from "@mantine/core";
import { memo } from "react";
import { PlayCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import IconStarDefault from "public/icons/icon24px/rating/star-default.svg";
import { Button } from "@shared/ui";
import { GroupFromList } from "@entities/group";
import { CreateCourseReviewForm } from "@features/courseReviews";

export interface FooterProps extends Omit<MCardProps, "children" | "onClick"> {
    data: Pick<GroupFromList, "courseId" | "groupId" | "status" | "nextLesson" | "isReviewed">;
}

const MemoizedFooter = memo(function Footer({ data, ...props }: FooterProps) {
    const router = useRouter();
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

    const renderActionContent = () => {
        switch (data.status.name) {
            case "notStarted":
                return null;
            case "inProgress":
                if (!data.nextLesson) {
                    return null;
                }
                return (
                    <Button variant="text" leftIcon={<PlayCircle />} onClick={handleOpenNextLessonFromMyCoursePage}>
                        <Text h={24} lineClamp={1}>
                            {data.nextLesson.name}
                        </Text>
                    </Button>
                );
            default:
                //TODO: Добавить проверку data.modalShowed, когда добавит бек
                if (!data.isReviewed) {
                    return (
                        <Button variant="border" leftIcon={<IconStarDefault />} onClick={handleOpenCreateReviewModal}>
                            Оценить курс
                        </Button>
                    );
                }
                return null;
        }
    };

    return (
        <MCard.Section {...props} m={0} onClick={(event) => event.stopPropagation()}>
            {renderActionContent()}
        </MCard.Section>
    );
});

export default MemoizedFooter;
