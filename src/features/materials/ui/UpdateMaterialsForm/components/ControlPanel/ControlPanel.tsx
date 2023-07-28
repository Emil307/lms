import { ActionIcon, Flex, FlexProps } from "@mantine/core";
import { Settings } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useFormikContext } from "formik";
import { FSwitch } from "@shared/ui";
import { BindingMaterialsWithCategories, CreateMaterialsDataForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import { getDataFromSessionStorage } from "@shared/utils";
import useStyles from "./ControlPanel.styles";
import { UpdateMaterialsFormValidation } from "../../types";

export interface ControlPanelProps extends FlexProps {}

const ControlPanel = (props: ControlPanelProps) => {
    const { classes } = useStyles();

    const { values } = useFormikContext<UpdateMaterialsFormValidation>();
    const sessionStorageData = getDataFromSessionStorage<CreateMaterialsDataForm>(MATERIALS_LOCAL_STORAGE_KEY);

    const handleCloseModal = () => closeModal("BINDING_CATEGORIES_WITH_MATERIALS");

    const openSettingsModal = () => {
        sessionStorage.setItem(MATERIALS_LOCAL_STORAGE_KEY, JSON.stringify({ ...sessionStorageData, ...values }));
        openModal({
            modalId: "BINDING_CATEGORIES_WITH_MATERIALS",
            title: "Привязать материалы к категориям",
            children: <BindingMaterialsWithCategories onClose={handleCloseModal} />,
        });
    };

    return (
        <Flex {...props} className={classes.root}>
            <FSwitch name="isBinding" variant="secondary" label="Привязать материалы к категориям" />
            <ActionIcon className={classes.actionIcon} onClick={openSettingsModal}>
                <Settings />
            </ActionIcon>
        </Flex>
    );
};

export default ControlPanel;
