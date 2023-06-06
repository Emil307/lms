import React, { memo, PropsWithChildren, ReactNode, Ref, useState, MouseEvent } from "react";
import { CSS } from "@dnd-kit/utilities";
import { ActionIcon, Box, Collapse, Flex, Text, ThemeIcon, Title } from "@mantine/core";
import { useSortable } from "@dnd-kit/sortable";
import IconDragDots from "public/icons/dragDots.svg";
import useStyles from "./DndCard.styles";
import { Button } from "@shared/ui";
import { Eye as EyeIcon } from "react-feather";

export interface DndCardProps {
    id: number;
    title: string;
    text: string;
    listMenu: ReactNode;
    isActive: boolean;
    onOpen?: () => void;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    elementRef?: Ref<HTMLDivElement>;
}

const DndCard = ({
    id,
    title,
    isActive,
    listMenu,
    text,
    onOpen,
    leftIcon,
    rightIcon,
    children,
    elementRef,
}: PropsWithChildren<DndCardProps>) => {
    const [expanded, setExpanded] = useState(false);
    const { classes } = useStyles({ isActive, expanded });
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const toggleOpenedContent = () => setExpanded((prev) => !prev);

    const handleOpenIconClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onOpen && onOpen();
    };

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <Box ref={setNodeRef} style={style} className={classes.root} onClick={toggleOpenedContent}>
            <Flex align="center" justify="space-between" ref={elementRef}>
                <Flex align="center" gap={16}>
                    <ActionIcon className={classes.actionIcon} {...attributes} {...listeners}>
                        <IconDragDots />
                    </ActionIcon>
                    {leftIcon && (
                        <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none" }}>
                            {leftIcon}
                        </ThemeIcon>
                    )}
                    <Title className={classes.title} order={3}>
                        {title}
                    </Title>
                </Flex>
                <Flex align="center" gap={16}>
                    {onOpen && (
                        <Button leftIcon={<EyeIcon />} variant="text" handleClick={handleOpenIconClick}>
                            Открыть
                        </Button>
                    )}
                    {rightIcon && (
                        <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none" }}>
                            {rightIcon}
                        </ThemeIcon>
                    )}
                    <Box
                        onClick={(event) => {
                            event.stopPropagation();
                        }}>
                        {listMenu}
                    </Box>
                </Flex>
            </Flex>
            <Collapse in={expanded}>
                <Flex gap={24} direction="column">
                    <Text className={classes.textContent}>{text}</Text>
                    {children}
                </Flex>
            </Collapse>
        </Box>
    );
};

export default memo(DndCard);
