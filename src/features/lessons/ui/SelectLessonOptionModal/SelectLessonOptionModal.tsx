import { Flex, ThemeIcon } from "@mantine/core";
import { Button, Heading } from "@shared/ui";
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
        <Flex className={classes.root}>
            <Flex className={classes.card}>
                <Flex className={classes.cardContent}>
                    <Heading order={2}>Выбрать из базы</Heading>
                    <Button variant="secondary" onClick={onSelect}>
                        Выбрать
                    </Button>
                </Flex>
                <ThemeIcon className={classes.wrapperIcon} variant="outline">
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
                <ThemeIcon className={classes.wrapperIcon} variant="outline">
                    <BookIcon />
                </ThemeIcon>
            </Flex>
        </Flex>
    );
};

export default SelectLessonOptionModal;
