import { PlusCircle } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { CreateScheduleForm } from "@features/groups";
import useStyles from "./CreateGroupScheduleButton.styles";

export interface CreateGroupScheduleButtonProps {
    groupId: string;
}

const CreateGroupScheduleButton = ({ groupId }: CreateGroupScheduleButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 744px)");

    const handleCloseCreateGroupScheduleModal = () => closeModal("CREATE_SCHEDULE");

    const handleOpenCreateGroupScheduleModal = () => {
        openModal({
            modalId: "CREATE_SCHEDULE",
            title: "Добавление занятия",
            children: <CreateScheduleForm groupId={groupId} onClose={handleCloseCreateGroupScheduleModal} />,
        });
    };

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={handleOpenCreateGroupScheduleModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={handleOpenCreateGroupScheduleModal}>
            Добавить занятие
        </Button>
    );
};

export default CreateGroupScheduleButton;
