import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { ActionIcon, Box, BoxProps, Collapse, Flex, Text, ThemeIcon, Title } from "@mantine/core";
import { useSortable } from "@dnd-kit/sortable";
import { Monitor } from "react-feather";
import IconDragDots from "public/icons/dragDots.svg";
import { AdminFaqItem } from "@entities/staticPage";
import { ListMenu } from "./components/ListMenu";
import useStyles from "./Card.styles";

export interface CardProps extends BoxProps {
    data: AdminFaqItem;
    openUpdateForm: (id: number) => void;
}

const Card = ({ data, openUpdateForm, ...props }: CardProps) => {
    const [opened, setOpened] = useState(false);
    const { classes } = useStyles({ isActive: data.isActive, opened });
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id });

    const toggleOpenedContent = () => setOpened((prev) => !prev);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <Box {...props} ref={setNodeRef} style={style} className={classes.root} onClick={toggleOpenedContent}>
            <Flex align="center" justify="space-between">
                <Flex align="center" gap={16}>
                    <ActionIcon
                        sx={{
                            cursor: "grab",
                        }}
                        {...attributes}
                        {...listeners}>
                        <IconDragDots />
                    </ActionIcon>
                    <Title className={classes.question} order={3}>
                        {data.question}
                    </Title>
                </Flex>
                <Flex align="center" gap={16}>
                    {data.isStatic && (
                        <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none" }}>
                            <Monitor />
                        </ThemeIcon>
                    )}
                    <Box
                        onClick={(event) => {
                            event.stopPropagation();
                        }}>
                        <ListMenu data={data} openUpdateForm={openUpdateForm} />
                    </Box>
                </Flex>
            </Flex>
            <Collapse in={opened}>
                <Text className={classes.answerContent} mt={32}>
                    {data.answer}
                </Text>
            </Collapse>
        </Box>
    );
};

export default Card;
