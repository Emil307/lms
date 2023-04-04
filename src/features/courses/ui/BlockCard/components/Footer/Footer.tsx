import { Card as MCard, CardProps as MCardProps } from "@mantine/core";
import { memo } from "react";
import { PlayCircle } from "react-feather";
import IconStarDefault from "public/icons/icon24px/rating/star-default.svg";
import { Button } from "@shared/ui";
import { CourseBlock } from "@entities/course";

export interface FooterProps extends Omit<MCardProps, "children"> {
    data: Pick<CourseBlock, "currentLesson" | "onProgress" | "isNew">;
}

const MemoizedFooter = memo(function Footer({ data, ...props }: FooterProps) {
    const renderActionContent = () => {
        if (data.onProgress) {
            return (
                <Button variant="text" leftIcon={<PlayCircle />}>
                    {data.currentLesson?.title}
                </Button>
            );
        }
        if (data.isNew) {
            return <Button variant="primary">Начать обучение</Button>;
        }
        return (
            <Button variant="border" leftIcon={<IconStarDefault />}>
                Оценить курс
            </Button>
        );
    };

    return <MCard.Section {...props}>{renderActionContent()}</MCard.Section>;
});

export default MemoizedFooter;
