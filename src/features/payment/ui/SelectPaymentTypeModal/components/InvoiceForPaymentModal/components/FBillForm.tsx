import { Flex, Group } from "@mantine/core";
import { ChevronLeft } from "react-feather";
import React from "react";
import { FControlButtons, FInput } from "@shared/ui";
import useStyles from "./FBillFormStyles";

interface FBillFormProps {
    onClose: () => void;
    setOpen?: boolean;
}

const FBillForm = ({ onClose, setOpen }: FBillFormProps) => {
    const { classes } = useStyles();

    return (
        <Flex direction="column" gap={24}>
            <Flex direction="column" gap={8}>
                <FInput name="organizationName" label="Название организации" />
                <FInput name="organizationOGRN" label="ОГРН" />
                <FInput name="organizationPaymentAccount" label="Расчетный счет" type="number" />
                <FInput name="organizationINN" label="ИНН" type="number" />
                <FInput name="organizationKPP" label="КПП" type="number" />
                <FInput name="organizationJuridicalAddress" label="Юридический адрес" />
                <FInput name="organizationBankName" label="Банк" />
            </Flex>
            <Group position="left" mt="md">
                <FControlButtons
                    variant="modal"
                    cancelButtonText="Назад"
                    submitButtonText="Скачать"
                    onClose={onClose}
                    cancelButtonProps={{
                        className: setOpen ? classes.cancelButton : undefined,
                        leftIcon: <ChevronLeft />,
                    }}
                />
            </Group>
        </Flex>
    );
};

export default FBillForm;
