import { Badge, Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { Lock, PlayCircle } from "react-feather";
import { memo } from "react";
import { useRouter } from "next/router";
import { Button, Heading, Paragraph } from "@shared/ui";
import { GroupModuleLesson } from "@entities/group";
import useStyles from "./LessonCard.styles";

export interface LessonCardProps extends Omit<FlexProps, "children"> {
    data: GroupModuleLesson;
    moduleName: string;
    courseId?: number;
}

const MemoizedLessonCard = memo(function LessonCard({ data, moduleName, courseId, ...props }: LessonCardProps) {
    const router = useRouter();
    const { classes } = useStyles({ status: data.lessonStatus.name });

    const handleOpenLessonDetailsPage = () =>
        router.push({ pathname: "/my-courses/[id]/lessons/[lessonId]", query: { id: String(courseId), lessonId: String(data.id) } });

    const renderStatus = () => {
        if (data.lessonStatus.name === "blocked") {
            return (
                <Badge className={classes.lockLessonInfo}>
                    <ThemeIcon className={classes.wrapperLockIcon}>
                        <Lock />
                    </ThemeIcon>
                    Нет доступа
                </Badge>
            );
        }

        return <Badge className={classes.status}>{data.lessonStatus.displayName}</Badge>;
    };

    return (
        <Flex {...props} className={classes.root}>
            <Flex direction="column" gap={8}>
                {renderStatus()}
                <Flex direction="column" gap={2}>
                    <Heading order={4}>{data.name}</Heading>
                    <Paragraph variant="text-caption">{moduleName}</Paragraph>
                </Flex>
                <Flex gap={8}>
                    {data.hasTest && <Paragraph variant="text-small-semi">Тест</Paragraph>}
                    {data.hasHomework && <Paragraph variant="text-small-semi">Домашнее задание</Paragraph>}
                </Flex>
            </Flex>
            <Paragraph variant="text-small-m" color="gray45">
                {data.description}
            </Paragraph>
            {data.lessonStatus.name === "inProgress" && (
                <Button variant="text" leftIcon={<PlayCircle />} w="min-content" onClick={handleOpenLessonDetailsPage}>
                    Пройти урок
                </Button>
            )}
        </Flex>
    );
});

export default MemoizedLessonCard;
