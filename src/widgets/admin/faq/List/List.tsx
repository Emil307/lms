import { Box, BoxProps } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { PlusCircle, Trash } from "react-feather";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { AdminFaqItem, useAdminFaq, useUpdateFaqOrder } from "@entities/staticPage";
import { CreateFaqForm, DeleteFaqModal, UpdateFaqForm } from "@features/faq";
import useStyles from "./List.styles";
import { Card } from "./components";

export interface ListProps extends BoxProps {}

const List = (props: ListProps) => {
    const { classes } = useStyles();
    const [currentUpdateItemId, setCurrentUpdateItemId] = useState<number | null>(null);
    const [openedCreateForm, setOpenedCreateForm] = useState(false);
    const [faqItems, setFaqItems] = useState<AdminFaqItem[]>([]);

    const { data: faqData } = useAdminFaq();
    const updateFaqOrder = useUpdateFaqOrder();

    const handleOpenCreateForm = () => setOpenedCreateForm(true);
    const handleCloseCreateForm = () => setOpenedCreateForm(false);

    const handleOpenUpdateForm = (id: number) => setCurrentUpdateItemId(id);
    const handleCloseUpdateForm = () => setCurrentUpdateItemId(null);

    useEffect(() => {
        setFaqItems(faqData?.data || []);
    }, [faqData?.data]);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = faqItems.findIndex(({ id }) => id === active.id);
            const newIndex = faqItems.findIndex(({ id }) => id === over?.id);
            const updatedArray = arrayMove(faqItems, oldIndex, newIndex);

            setFaqItems(updatedArray);
            updateFaqOrder.mutate({ id: Number(active.id), after: newIndex ? updatedArray[newIndex - 1].id : 0 });
        }
    }

    const renderDeleteButton = (data: AdminFaqItem) => {
        const handleCloseDeleteModal = () => closeModal("DELETE_QUESTION");

        const openDeleteModal = () => {
            openModal({
                modalId: "DELETE_QUESTION",
                title: "Удаление вопроса",
                centered: true,
                children: <DeleteFaqModal id={data.id} question={data.question} onClose={handleCloseDeleteModal} />,
            });
        };

        return (
            <Button leftIcon={<Trash />} variant="text" onClick={openDeleteModal}>
                Удалить
            </Button>
        );
    };

    return (
        <Box {...props} className={classes.root}>
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={faqItems}>
                    {faqItems.map((item) => {
                        if (currentUpdateItemId === item.id) {
                            return (
                                <UpdateFaqForm
                                    key={item.id}
                                    data={item}
                                    onClose={handleCloseUpdateForm}
                                    actionSlot={renderDeleteButton(item)}
                                />
                            );
                        }
                        return <Card key={item.id} data={item} openUpdateForm={handleOpenUpdateForm} />;
                    })}
                </SortableContext>
            </DndContext>
            <CreateFaqForm opened={openedCreateForm} onClose={handleCloseCreateForm} />
            <Button className={classes.buttonAddQuestion} leftIcon={<PlusCircle />} variant="white" onClick={handleOpenCreateForm}>
                Добавить вопрос
            </Button>
        </Box>
    );
};

export default List;
