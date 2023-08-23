import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";
import { AddCoursesToStudentModal } from "@features/courses";
import useStyles from "./AddStudentCourseButton.styles";

export interface AddStudentCourseButtonProps {
    studentId: string;
}

const AddStudentCourseButton = ({ studentId }: AddStudentCourseButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseAddCoursesToStudentModal = () => closeModal("ATTACH_COURSES_TO_STUDENT");

    const openAddCoursesToStudentModal = () => {
        openModal({
            modalId: "ATTACH_COURSES_TO_STUDENT",
            title: "Добавить курс",
            children: <AddCoursesToStudentModal studentId={studentId} onClose={handleCloseAddCoursesToStudentModal} />,
            size: 912,
            className: classes.addCoursesToStudentModalWrapper,
        });
    };

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={openAddCoursesToStudentModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={openAddCoursesToStudentModal}>
            Добавить курс
        </Button>
    );
};

export default AddStudentCourseButton;
