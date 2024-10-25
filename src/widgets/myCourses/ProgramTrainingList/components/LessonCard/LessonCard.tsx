import { Badge, Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { Lock, PlayCircle } from "react-feather";
import { memo } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Button, Heading, Paragraph } from "@shared/ui";
import { GroupModuleLesson } from "@entities/group";
import useStyles from "./LessonCard.styles";

export interface LessonCardProps extends Omit<FlexProps, "children"> {
    data: GroupModuleLesson;
    moduleName: string;
    groupId: string;
    groupStartDate: Date;
}

const MemoizedLessonCard = memo(function LessonCard({ data, moduleName, groupId, groupStartDate, ...props }: LessonCardProps) {
    const router = useRouter();
    const { classes, cx } = useStyles({ status: data.lessonStatus.name });

    const handleOpenLessonDetailsPage = () => {
        if (data.lessonStatus.name !== "blocked" && data.lessonStatus.name !== "notStarted") {
            router.push({ pathname: "/my-courses/[id]/lessons/[lessonId]", query: { id: groupId, lessonId: String(data.id) } });
        }
    };

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
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex direction="column" gap={8}>
                {renderStatus()}
                <Flex direction="column" gap={2}>
                    <Heading className={classes.lessonName} order={4} onClick={handleOpenLessonDetailsPage}>
                        {data.name}
                    </Heading>
                    <Paragraph variant="text-caption">{moduleName}</Paragraph>
                </Flex>
                <Flex gap={8}>
                    {data.hasTest && <Paragraph variant="text-small-semi">Тест</Paragraph>}
                    {data.hasHomework && <Paragraph variant="text-small-semi">Домашнее задание</Paragraph>}
                </Flex>
            </Flex>
            <Paragraph variant="text-small-m" color="neutralMain50">
                {data.description}
            </Paragraph>
            {data.lessonStatus.name === "inProgress" && (
                <Button variant="text" leftIcon={<PlayCircle />} w="min-content" onClick={handleOpenLessonDetailsPage}>
                    Пройти урок
                </Button>
            )}
            {data.lessonStatus.name === "notStarted" && (
                <Paragraph variant="text-small-semi">Обучение начнется {dayjs(groupStartDate).format("DD.MM.YYYY")}</Paragraph>
            )}
        </Flex>
    );
});

export default MemoizedLessonCard;
