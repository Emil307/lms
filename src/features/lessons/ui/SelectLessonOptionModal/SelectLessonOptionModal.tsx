import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { Button, Heading, Paragraph } from "@shared/ui";
import FoldersIcon from "public/icons/folders.svg";
import BookIcon from "public/icons/book.svg";
import useStyles from "./SelectLessonOptionModal.styles";

export interface SelectLessonOptionModalProps {
    onCreate: () => void;
    onSelect: () => void;
}

const SelectLessonOptionModal = ({ onCreate, onSelect }: SelectLessonOptionModalProps) => {
    const { classes } = useStyles();

    return (
        <Box>
            <Paragraph className={classes.description} variant="small-m" color="neutralMain50">
                Выберите способ добавления урока
            </Paragraph>
            <Flex className={classes.content}>
                <Flex className={classes.card}>
                    <Flex className={classes.cardContent}>
                        <Heading order={2}>Выбрать из базы</Heading>
                        <Button variant="secondary" onClick={onSelect}>
                            Выбрать
                        </Button>
                    </Flex>
                    <ThemeIcon className={classes.wrapperIcon}>
                        <FoldersIcon />
                    </ThemeIcon>
                </Flex>
                <Flex className={classes.card}>
                    <Flex className={classes.cardContent}>
                        <Heading order={2}>Создать новый</Heading>
                        <Button variant="secondary" onClick={onCreate}>
                            Выбрать
                        </Button>
                    </Flex>
                    <ThemeIcon className={classes.wrapperIcon}>
                        <BookIcon />
                    </ThemeIcon>
                </Flex>
            </Flex>
        </Box>
    );
};

export default SelectLessonOptionModal;
