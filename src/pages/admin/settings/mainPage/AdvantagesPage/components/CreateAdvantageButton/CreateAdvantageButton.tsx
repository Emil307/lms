import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { CreateAdvantageForm } from "@features/advantages";
import useStyles from "./CreateAdvantageButton.styles";
import { useMedia } from "@shared/utils";

const CreateAdvantageButton = () => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

    const handleCloseCreateAdvantageModal = () => closeModal("CREATE_ADVANTAGE");

    const openCreateAdvantageModal = () => {
        openModal({
            modalId: "CREATE_ADVANTAGE",
            title: "Создание карточки",
            children: <CreateAdvantageForm onClose={handleCloseCreateAdvantageModal} />,
        });
    };

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} onClick={openCreateAdvantageModal}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} onClick={openCreateAdvantageModal}>
            Добавить карточку
        </Button>
    );
};

export default CreateAdvantageButton;
