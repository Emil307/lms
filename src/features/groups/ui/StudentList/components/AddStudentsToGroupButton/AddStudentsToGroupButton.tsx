import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { AddStudentsToGroupModal } from "@features/groups";
import { useMedia } from "@shared/utils";
import useStyles from "./AddStudentsToGroupButton.styles";

export interface AddStudentsToGroupButtonProps {
    groupId: string;
    courseId: number;
}

const AddStudentsToGroupButton = ({ groupId, courseId }: AddStudentsToGroupButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseAddStudentsToGroupModal = () => closeModal("ADD_STUDENTS_TO_GROUP");

    const handleOpenAddStudentsToGroupModal = () => {
        openModal({
            modalId: "ADD_STUDENTS_TO_GROUP",
            title: "Добавление ученика",
            children: <AddStudentsToGroupModal groupId={groupId} courseId={courseId} onClose={handleCloseAddStudentsToGroupModal} />,
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
