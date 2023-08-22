import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { AddCourseToCoursePackageModal } from "@features/coursePackages";
import { useMedia } from "@shared/utils";
import useStyles from "./AddCoursesToCoursePackageButton.styles";

export interface AddCoursesToCoursePackageButtonProps {
    coursePackageId: string;
}

const AddCoursesToCoursePackageButton = ({ coursePackageId }: AddCoursesToCoursePackageButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseAddCourseToPackageModal = () => closeModal("ADD_COURSE_TO_PACKAGE");

    const openAddCourseToPackageModal = () => {
        openModal({
            modalId: "ADD_COURSE_TO_PACKAGE",
            title: "Добавить курс",
            children: <AddCourseToCoursePackageModal coursePackageId={coursePackageId} onClose={handleCloseAddCourseToPackageModal} />,
            size: 912,
            className: classes.addCoursesToCoursePackageModalWrapper,
        });
    };

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={openAddCourseToPackageModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={openAddCourseToPackageModal}>
            Добавить курс
        </Button>
    );
};

export default AddCoursesToCoursePackageButton;
