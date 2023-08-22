import { ActionIcon } from "@mantine/core";
import React from "react";
import { Plus as PlusIcon } from "react-feather";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";
import useStyles from "./AddVideoButton.styles";

interface AddVideoButtonProps {
    editMode: boolean;
    onAddFile: () => void;
}

const AddVideoButton = ({ editMode, onAddFile }: AddVideoButtonProps) => {
    const { classes } = useStyles();

    const isMobile = useMedia("sm");

    if (!editMode) {
        return null;
    }

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={onAddFile}>
                <PlusIcon />
            </ActionIcon>
        );
    }

    return (
        <Button className={classes.button} variant="white" leftIcon={<PlusIcon />} size="small" onClick={onAddFile}>
            Загрузить видео
        </Button>
    );
};

export default AddVideoButton;
