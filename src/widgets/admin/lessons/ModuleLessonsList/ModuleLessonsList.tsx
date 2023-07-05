import { Flex, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useIntersection } from "@mantine/hooks";
import { Button, DndCard, Loader } from "@shared/ui";
import { AdminLessonFromList, useAdminModuleLessons } from "@entities/lesson";
import { CreateLessonModal, LessonListModal, SelectLessonOptionModal } from "@features/lessons";
import { ListMenu } from "./components";
import { getInitialValues } from "./utils";
import useStyles from "./ModuleLessonsList.styles";

interface ModuleLessonsListProps {
    courseId: string;
    moduleId: string;
    moduleName: string;
}

const ModuleLessonsList = ({ courseId, moduleId, moduleName }: ModuleLessonsListProps) => {
    const { classes } = useStyles();
    const { data: lessonsData, hasNextPage, fetchNextPage, isError } = useAdminModuleLessons(getInitialValues(moduleId));
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

    const handleGoAdminLessonPage = () => {
        //TODO: Сделать переход на деталку урока в админке
        // router.push({ pathname: "/admin/courses/[id]/module/[moduleId]", query: { id: courseId, moduleId: String(moduleId) } })
    };

    //TODO: Добавить смену порядка уроков, когда будет готов эндпоинт на бэке
    // const updateLessonOrder = useUpdateLessonOrder();

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
                    <Title order={3}>Добавить урок</Title>
                    <Text className={classes.lessonOptionDescription}>Выберите способ добавления урока</Text>
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
            //TODO: Добавить смену порядка модулей, когда будет готов эндпоинт на бэке
            // updateCourseModuleOrder.mutate({ id: Number(active.id), after: newIndex ? updatedArray[newIndex - 1].id : 0 });
        }
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
                                onOpen={handleGoAdminLessonPage}
                                isActive={lesson.isActive}
                                elementRef={lastElementRef}
                                key={lesson.id}
                            />
                        );
                    })}
                </SortableContext>
            </DndContext>
        );
    };

    return (
        <Flex direction="column" gap={32} maw={1162} w="100%">
            <Flex gap={48} align="center">
                <Title order={2}>Уроки модуля</Title>
                <Button onClick={handleOpenSelectLessonOptionModal} variant="text" leftIcon={<PlusCircleIcon />}>
                    Добавить урок
                </Button>
            </Flex>
            <Flex className={classes.wrapper}>{renderContent()}</Flex>
        </Flex>
    );
};

export default ModuleLessonsList;
