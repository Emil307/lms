import { Flex, ThemeIcon } from "@mantine/core";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteFavoriteCourses } from "@entities/course";
import useStyles from "./CleanFavoriteCoursesModal.styles";

export interface CleanFavoriteCoursesModalProps {
    onClose: () => void;
}

const CleanFavoriteCoursesModal = ({ onClose }: CleanFavoriteCoursesModalProps) => {
    const { classes } = useStyles();

    const { mutate: cleanFavoriteCourses, isLoading } = useDeleteFavoriteCourses();

    const handleSubmit = () => {
        cleanFavoriteCourses(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <>
            <Flex gap={16} pb={56}>
                <ThemeIcon className={classes.wrapperAlertIcon} radius={50}>
                    <AlertTriangle />
                </ThemeIcon>
                <Paragraph variant="small-m">Вы действительно хотите очистить избранные курсы?</Paragraph>
            </Flex>
            <ControlButtons
                variant="modal"
                isLoading={isLoading}
                cancelButtonText="Отмена"
                submitButtonText="Очистить"
                onSubmit={handleSubmit}
                onClose={onClose}
            />
        </>
    );
};

export default CleanFavoriteCoursesModal;
