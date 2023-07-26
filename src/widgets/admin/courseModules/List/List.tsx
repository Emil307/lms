import { Flex, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { PlusCircle as PlusCircleIcon, Folder as FolderIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useIntersection } from "@mantine/hooks";
import { useRouter } from "next/router";
import { Button, DndCard, Heading, Loader } from "@shared/ui";
import { CourseModuleWithoutLessons, useCourseModules } from "@entities/courseModule";
import { CreateCourseModuleModal } from "@features/courseModules";
import { useUpdateCourseModuleOrder } from "@entities/courseModule";
import { ListMenu } from "./components";
import { initialValues } from "./constants";
import useStyles from "./List.styles";

interface ModuleListProps {
    courseId: string;
}

const List = ({ courseId }: ModuleListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: modulesData, hasNextPage, fetchNextPage, isError } = useCourseModules({ ...initialValues, courseId });

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

    const handleCloseCreateModuleModal = () => closeModal("CREATE_COURSE_MODULE");

    const handleOpenCreateModuleModal = () => {
        const moduleNumber = modulesData ? modulesData.pagination.total + 1 : 1;
        openModal({
            modalId: "CREATE_COURSE_MODULE",
            title: "Создание модуля",
            centered: true,
            children: <CreateCourseModuleModal courseId={courseId} moduleNumber={moduleNumber} onClose={handleCloseCreateModuleModal} />,
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = modules.findIndex(({ id }) => id === active.id);
            const newIndex = modules.findIndex(({ id }) => id === over?.id);
            const updatedArray = arrayMove(modules, oldIndex, newIndex);

            setModules(updatedArray);
            updateModuleOrder.mutate({ moduleId: String(active.id), after: newIndex ? updatedArray[newIndex - 1].id : 0 });
        }
    };

    const renderContent = () => {
        if (!modules.length) {
            return <Text className={classes.emptyText}>В данном курсе пока нет модулей.</Text>;
        }
        return (
            <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
                <SortableContext items={modules}>
                    {modules.map((module, index) => {
                        return (
                            <DndCard
                                id={module.id}
                                title={module.name}
                                text={module.description}
                                listMenu={<ListMenu data={module} courseId={courseId} moduleNumber={index + 1} />}
                                onOpen={() => handleGoCourseModulePage(module.id)}
                                isActive={module.isActive}
                                leftIcon={<FolderIcon />}
                                elementRef={lastElementRef}
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
            <Flex gap={48} align="center">
                <Heading order={2}>Модули курса</Heading>
                <Button onClick={handleOpenCreateModuleModal} variant="text" leftIcon={<PlusCircleIcon />}>
                    Добавить модуль
                </Button>
            </Flex>
            <Flex className={classes.wrapper}>{renderContent()}</Flex>
        </Flex>
    );
};

export default List;
