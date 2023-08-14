import { PlusCircle } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { AddStudentsToGroupModal } from "@features/groups";
import useStyles from "./AddStudentsToGroupButton.styles";

export interface AddStudentsToGroupButtonProps {
    groupId: string;
}

const AddStudentsToGroupButton = ({ groupId }: AddStudentsToGroupButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 744px)");

    const handleCloseAddStudentsToGroupModal = () => closeModal("ADD_STUDENTS_TO_GROUP");

    const handleOpenAddStudentsToGroupModal = () => {
        openModal({
            modalId: "ADD_STUDENTS_TO_GROUP",
            title: "Добавление ученика",
            children: <AddStudentsToGroupModal groupId={groupId} onClose={handleCloseAddStudentsToGroupModal} />,
            size: 912,
            mah: 912,
            className: classes.addStudentsToGroupModalWrapper,
        });
    };

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={handleOpenAddStudentsToGroupModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={handleOpenAddStudentsToGroupModal}>
            Добавить ученика
        </Button>
    );
};

export default AddStudentsToGroupButton;
