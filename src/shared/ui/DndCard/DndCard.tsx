import React, { memo, PropsWithChildren, ReactNode, Ref, useState, MouseEvent } from "react";
import { CSS } from "@dnd-kit/utilities";
import { ActionIcon, Box, Collapse, Flex, ThemeIcon } from "@mantine/core";
import { useSortable } from "@dnd-kit/sortable";
import { Eye as EyeIcon } from "react-feather";
import IconDragDots from "public/icons/dragDots.svg";
import { Button, Heading, Paragraph } from "@shared/ui";
import useStyles from "./DndCard.styles";

export interface DndCardProps {
    id: number;
    title: string;
    text: string;
    listMenu?: ReactNode;
    isActive: boolean;
    onOpen?: () => void;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    elementRef?: Ref<HTMLDivElement>;
    hideDrag?: boolean;
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
    hideDrag,
}: PropsWithChildren<DndCardProps>) => {
    const [expanded, setExpanded] = useState(false);
    const { classes } = useStyles({ isActive, expanded, hasOpenButton: !!onOpen });
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
            <Flex align="center" justify="space-between" gap={16} ref={elementRef}>
                <Flex align="center" gap={16}>
                    {!hideDrag && (
                        <ActionIcon className={classes.actionIcon} {...attributes} {...listeners}>
                            <IconDragDots />
                        </ActionIcon>
                    )}
                    {leftIcon && <ThemeIcon color={isActive ? "primaryHover" : "neutralGray300"}>{leftIcon}</ThemeIcon>}
                    <Heading className={classes.title} order={3}>
                        {title}
                    </Heading>
                </Flex>
                <Flex align="center" gap={16}>
                    {onOpen && (
                        <Button className={classes.openButton} leftIcon={<EyeIcon />} variant="text" handleClick={handleOpenIconClick}>
                            Открыть
                        </Button>
                    )}
                    {rightIcon && <ThemeIcon color="primaryHover">{rightIcon}</ThemeIcon>}
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
                    <Paragraph variant="small-m" color="neutralMain50" className={classes.textContent}>
                        {text}
                    </Paragraph>
                    {children}
                </Flex>
            </Collapse>
        </Box>
    );
};

export default memo(DndCard);
