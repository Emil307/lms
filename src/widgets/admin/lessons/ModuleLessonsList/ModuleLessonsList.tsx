import { Flex, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useIntersection } from "@mantine/hooks";
import { useRouter } from "next/router";
import { Button, DndCard, Heading, Loader, Paragraph } from "@shared/ui";
import { AdminLessonFromList, useAdminModuleLessons, useUpdateLessonOrder } from "@entities/lesson";
import { CreateLessonModal, LessonListModal, SelectLessonOptionModal } from "@features/lessons";
import PositivelyIcon from "@public/icons/positively.svg";
import FalsyIcon from "@public/icons/falsy.svg";
import { ListMenu } from "./components";
import { getInitialValues } from "./utils";
import useStyles from "./ModuleLessonsList.styles";

interface ModuleLessonsListProps {
    courseId: string;
    moduleId: string;
    moduleName: string;
}

const ModuleLessonsList = ({ courseId, moduleId, moduleName }: ModuleLessonsListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: lessonsData, hasNextPage, fetchNextPage, isError } = useAdminModuleLessons(getInitialValues(moduleId));

    const { mutate: updateLessonOrder } = useUpdateLessonOrder({ moduleId });

    const [lessons, setLessons] = useState<AdminLessonFromList[] | undefined>(lessonsData?.data);

    const { ref: lastElementRef, entry } = useIntersection();

    useEffect(() => {
        if (lessonsData?.data) {
            setLessons(lessonsData.data);
        }
    }, [lessonsData?.data]);

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry, hasNextPage]);

    const handleGoAdminLessonPage = (lessonId: number) => {
        router.push({
            pathname: "/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]",
            query: { id: courseId, moduleId: String(moduleId), lessonId: String(lessonId) },
        });
    };

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!lessons) {
        return <Loader />;
    }

    const handleCloseLessonListModal = () => closeModal("LESSON_LIST");
    const handleCloseCreateLessonModal = () => closeModal("CREATE_LESSON");

    const handleOpenSelectLessonOptionModal = () => {
        openModal({
            modalId: "SELECT_LESSON_OPTION",
            title: (
                <Flex className={classes.lessonOptionHeader}>
                    <Heading order={3}>Добавить урок</Heading>
                    <Paragraph variant="small-m" color="gray45">
                        Выберите способ добавления урока
                    </Paragraph>
                </Flex>
            ),
            centered: true,
            size: 912,
            children: <SelectLessonOptionModal onCreate={handleOpenCreateLessonModal} onSelect={handleOpenSelectLessonsModal} />,
        });
    };

    const handleOpenCreateLessonModal = () => {
        const lessonNumber = lessonsData ? lessonsData.pagination.total + 1 : 1;
        openModal({
            modalId: "CREATE_LESSON",
            title: "Создание урока",
            centered: true,
            children: (
                <CreateLessonModal
                    courseId={courseId}
                    lessonNumber={lessonNumber}
                    moduleId={moduleId}
                    onClose={handleCloseCreateLessonModal}
                />
            ),
        });
    };

    const handleOpenSelectLessonsModal = () => {
        openModal({
            modalId: "LESSON_LIST",
            title: "Выбрать из базы уроков",
            centered: true,
            size: 912,
            mah: 912,
            children: <LessonListModal courseId={courseId} moduleId={moduleId} onClose={handleCloseLessonListModal} />,
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = lessons.findIndex(({ id }) => id === active.id);
            const newIndex = lessons.findIndex(({ id }) => id === over?.id);
            const updatedArray = arrayMove(lessons, oldIndex, newIndex);
            setLessons(updatedArray);
            updateLessonOrder({ lessonId: String(active.id), after: newIndex ? updatedArray[newIndex - 1].id : 0 });
        }
    };

    const renderLabelValue = (isTrue: boolean) => {
        if (isTrue) {
            return (
                <>
                    <Paragraph variant="small-m">Да</Paragraph>
                    <PositivelyIcon className={classes.icon} />
                </>
            );
        }
        return (
            <>
                <Paragraph variant="small-m">Нет</Paragraph>
                <FalsyIcon className={classes.icon} />
            </>
        );
    };

    const renderContent = () => {
        if (!lessons.length) {
            return <Text className={classes.emptyText}>В данном модуле пока нет уроков.</Text>;
        }
        return (
            <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
                <SortableContext items={lessons}>
                    {lessons.map((lesson, index) => {
                        return (
                            <DndCard
                                id={lesson.id}
                                title={lesson.name}
                                text={lesson.description}
                                listMenu={
                                    <ListMenu
                                        data={lesson}
                                        courseId={courseId}
                                        moduleId={moduleId}
                                        moduleName={moduleName}
                                        lessonNumber={index + 1}
                                    />
                                }
                                onOpen={() => handleGoAdminLessonPage(lesson.id)}
                                isActive={lesson.isActive}
                                elementRef={lastElementRef}
                                key={lesson.id}>
                                <Flex gap={24}>
                                    <Flex gap={6}>
                                        <Paragraph variant="small-semi">Проверочный тест:</Paragraph>
                                        {renderLabelValue(lesson.hasTest)}
                                    </Flex>
                                    <Flex gap={6}>
                                        <Paragraph variant="small-semi">Домашнее задание:</Paragraph>
                                        {renderLabelValue(lesson.hasHomework)}
                                    </Flex>
                                </Flex>
                            </DndCard>
                        );
                    })}
                </SortableContext>
            </DndContext>
        );
    };

    return (
        <Flex direction="column" gap={32} maw={1162} w="100%">
            <Flex gap={48} align="center">
                <Heading order={2}>Уроки модуля</Heading>
                <Button onClick={handleOpenSelectLessonOptionModal} variant="text" leftIcon={<PlusCircleIcon />}>
                    Добавить урок
                </Button>
            </Flex>
            <Flex className={classes.wrapper}>{renderContent()}</Flex>
        </Flex>
    );
};

export default ModuleLessonsList;
