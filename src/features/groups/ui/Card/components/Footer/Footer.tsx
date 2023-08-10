import { Card as MCard, CardProps as MCardProps } from "@mantine/core";
import { memo } from "react";
import { PlayCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import IconStarDefault from "public/icons/icon24px/rating/star-default.svg";
import { Button } from "@shared/ui";
import { GroupFromList } from "@entities/group";
import { CreateCourseReviewForm } from "@features/courseReviews";

export interface FooterProps extends Omit<MCardProps, "children" | "onClick"> {
    data: Pick<GroupFromList, "courseId" | "groupId" | "status">;
    onClick?: (id: unknown) => void;
}

const MemoizedFooter = memo(function Footer({ data, onClick, ...props }: FooterProps) {
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

    const handleOpenMyCourseDetailsPage = () => onClick?.(data.groupId);

    const renderActionContent = () => {
        switch (data.status.name) {
            case "inProgress":
                //TODO: Добавить название урока как бек добавит
                return (
                    <Button variant="text" leftIcon={<PlayCircle />}>
                        Урок 1. Название урока
                    </Button>
                );

            case "notStarted":
                return (
                    <Button variant="primary" onClick={handleOpenMyCourseDetailsPage}>
                        Начать обучение
                    </Button>
                );

            default:
                return (
                    <Button variant="border" leftIcon={<IconStarDefault />} onClick={handleOpenCreateReviewModal}>
                        Оценить курс
                    </Button>
                );
        }
    };

    return (
        <MCard.Section {...props} m={0}>
            {renderActionContent()}
        </MCard.Section>
    );
});

export default MemoizedFooter;
