import { Flex, Text, ThemeIcon, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { PlusCircle as PlusCircleIcon, Folder as FolderIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useIntersection } from "@mantine/hooks";
import { Button, DndCard, Loader } from "@shared/ui";
import { CourseModule, useCourseModules } from "@entities/courseModule";
import { CreateCourseModuleModal } from "@features/courseModules";
import { ListMenu } from "./components";
import { initialValues } from "./constants";
import useStyles from "./List.styles";
import { useRouter } from "next/router";

interface ModuleListProps {
    courseId: string;
}

const List = ({ courseId }: ModuleListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: modulesData, hasNextPage, fetchNextPage, isError } = useCourseModules({ ...initialValues, courseId });
    const [modules, setModules] = useState<CourseModule[] | undefined>(modulesData?.data);

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
        router.push({ pathname: "/admin/courses/[id]/module/[moduleId]", query: { id: courseId, moduleId: String(moduleId) } });
    };

    //TODO: Добавить смену порядка модулей, когда будет готов эндпоинт на бэке
    // const updateCourseModuleOrder = useUpdateCourseModuleOrder();

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
            //TODO: Добавить смену порядка модулей, когда будет готов эндпоинт на бэке
            // updateCourseModuleOrder.mutate({ id: Number(active.id), after: newIndex ? updatedArray[newIndex - 1].id : 0 });
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
                <Title order={2}>Модули курса</Title>
                <Button
                    onClick={handleOpenCreateModuleModal}
                    variant="text"
                    leftIcon={
                        <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                            <PlusCircleIcon />
                        </ThemeIcon>
                    }>
                    Добавить модуль
                </Button>
            </Flex>
            <Flex className={classes.wrapper}>{renderContent()}</Flex>
        </Flex>
    );
};

export default List;
