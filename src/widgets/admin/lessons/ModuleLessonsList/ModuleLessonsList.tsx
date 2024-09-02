import { Flex } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useRouter } from "next/router";
import { DndCard, Heading, Paragraph } from "@shared/ui";
import { useUpdateLessonOrder } from "@entities/lesson";
import { useUserRole } from "@entities/auth";
import PositivelyIcon from "@public/icons/positively.svg";
import FalsyIcon from "@public/icons/falsy.svg";
import { CourseModule, CourseModuleLesson } from "@entities/courseModule";
import { useMedia } from "@shared/utils";
import { Roles } from "@shared/types";
import { AddLessonButton, ListMenu } from "./components";
import useStyles from "./ModuleLessonsList.styles";

interface ModuleLessonsListProps {
    courseId: string;
    module: CourseModule;
}

const ModuleLessonsList = ({ courseId, module }: ModuleLessonsListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const userRole = useUserRole();

    const moduleId = String(module.id);

    const { mutate: updateLessonOrder } = useUpdateLessonOrder({ moduleId });

    const [lessons, setLessons] = useState<CourseModuleLesson[]>(module.lessons);

    useEffect(() => {
        setLessons(module.lessons);
    }, [module.lessons]);

    const handleGoAdminLessonPage = (lessonId: number) => {
        router.push({
            pathname: "/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]",
            query: { id: courseId, moduleId: String(moduleId), lessonId: String(lessonId) },
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id && active.id !== over.id) {
            const oldIndex = lessons.findIndex(({ id }) => id === active.id);
            const newIndex = lessons.findIndex(({ id }) => id === over.id);
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

    const getListMenu = (lesson: CourseModuleLesson, lessonNumber: number) => {
        if (isMobile || userRole?.name !== Roles.teacher) {
            return <ListMenu data={lesson} courseId={courseId} moduleId={moduleId} moduleName={module.name} lessonNumber={lessonNumber} />;
        }
        return null;
    };

    const renderContent = () => {
        if (!lessons.length) {
            return (
                <Paragraph variant="small-m" color="neutral_gray">
                    В данном модуле пока нет уроков.
                </Paragraph>
            );
        }
        return (
            <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
                <SortableContext items={lessons} disabled={lessons.length === 1}>
                    {lessons.map((lesson, index) => {
                        return (
                            <DndCard
                                id={lesson.id}
                                title={lesson.name}
                                text={lesson.description}
                                listMenu={getListMenu(lesson, index + 1)}
                                onOpen={() => handleGoAdminLessonPage(lesson.id)}
                                isActive={lesson.isActive}
                                hideDrag={userRole?.name === Roles.teacher}
                                key={lesson.id}>
                                <Flex className={classes.homeworkAndTest}>
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
            <Flex className={classes.heading}>
                <Heading order={2}>Уроки модуля</Heading>
                <AddLessonButton courseId={courseId} module={module} hidden={userRole?.name === Roles.teacher} />
            </Flex>
            <Flex className={classes.wrapper}>{renderContent()}</Flex>
        </Flex>
    );
};

export default ModuleLessonsList;
