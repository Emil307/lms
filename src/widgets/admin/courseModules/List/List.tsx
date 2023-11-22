import { Flex, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Folder as FolderIcon } from "react-feather";
import { useIntersection } from "@mantine/hooks";
import { useRouter } from "next/router";
import { DndCard, Heading, Loader, Paragraph } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { CourseModuleWithoutLessons, useCourseModules } from "@entities/courseModule";
import { useUpdateCourseModuleOrder } from "@entities/courseModule";
import { useMedia } from "@shared/utils";
import { AddModuleButton, ListMenu } from "./components";
import { initialValues } from "./constants";
import useStyles from "./List.styles";

interface ModuleListProps {
    courseId: string;
}

const List = ({ courseId }: ModuleListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: modulesData, hasNextPage, fetchNextPage, isError } = useCourseModules({ ...initialValues, courseId });

    const isMobile = useMedia("sm");

    const userRole = useUserRole();

    const updateModuleOrder = useUpdateCourseModuleOrder(courseId);

    const [modules, setModules] = useState<CourseModuleWithoutLessons[] | undefined>(modulesData?.data);

    const { ref: lastElementRef, entry } = useIntersection();

    useEffect(() => {
        if (modulesData?.data) {
            setModules(modulesData.data);
        }
    }, [modulesData?.data]);

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry, hasNextPage]);

    const handleGoCourseModulePage = (moduleId: number) => {
        router.push({ pathname: "/admin/courses/[id]/modules/[moduleId]", query: { id: courseId, moduleId: String(moduleId) } });
    };

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!modules) {
        return <Loader />;
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over?.id && active.id !== over.id) {
            const oldIndex = modules.findIndex(({ id }) => id === active.id);
            const newIndex = modules.findIndex(({ id }) => id === over.id);
            const updatedArray = arrayMove(modules, oldIndex, newIndex);

            setModules(updatedArray);
            updateModuleOrder.mutate({ moduleId: String(active.id), after: newIndex ? updatedArray[newIndex - 1].id : 0 });
        }
    };

    const getListMenu = (module: CourseModuleWithoutLessons, moduleNumber: number) => {
        if (isMobile || userRole !== Roles.teacher) {
            return <ListMenu data={module} courseId={courseId} moduleNumber={moduleNumber} />;
        }
        return null;
    };

    const renderContent = () => {
        if (!modules.length) {
            return (
                <Paragraph variant="small-m" color="neutral_gray">
                    В данном курсе пока нет модулей.
                </Paragraph>
            );
        }
        return (
            <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
                <SortableContext items={modules} disabled={modules.length === 1}>
                    {modules.map((module, index) => {
                        return (
                            <DndCard
                                id={module.id}
                                title={module.name}
                                text={module.description}
                                listMenu={getListMenu(module, index + 1)}
                                onOpen={() => handleGoCourseModulePage(module.id)}
                                isActive={module.isActive}
                                leftIcon={<FolderIcon />}
                                elementRef={lastElementRef}
                                hideDrag={userRole === Roles.teacher}
                                key={module.id}
                            />
                        );
                    })}
                </SortableContext>
            </DndContext>
        );
    };

    return (
        <Flex direction="column" gap={32} maw={1162} w="100%">
            <Flex className={classes.heading}>
                <Heading order={2}>Модули курса</Heading>
                <AddModuleButton
                    courseId={courseId}
                    moduleNumber={modulesData ? modulesData.pagination.total + 1 : 1}
                    hidden={userRole === Roles.teacher}
                />
            </Flex>
            <Flex className={classes.wrapper}>{renderContent()}</Flex>
        </Flex>
    );
};

export default List;
