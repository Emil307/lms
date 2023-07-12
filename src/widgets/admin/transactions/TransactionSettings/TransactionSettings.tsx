import { Box, Flex, ThemeIcon, BoxProps } from "@mantine/core";
import React from "react";
import { Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { IconClipboard, IconUserCircle } from "@tabler/icons-react";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading } from "@shared/ui";
import { InfoCard } from "@components/InfoCard";
import { DeleteTransactionModal } from "@features/transactions";
import { AdminTransaction, useAdminTransaction } from "@entities/transaction";
import CheckStatusIcon from "public/icons/checkStatus.svg";
import { getFullName } from "@shared/utils";
import { fields } from "./constants";
import useStyles from "./TransactionSettings.styles";

export interface TransactionSettingsProps extends BoxProps {
    id: string;
}

const TransactionSettings = ({ id, ...props }: TransactionSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: transactionData } = useAdminTransaction({ id });

    const customerFullName = getFullName({ data: transactionData?.user.profile });

    const handleOpenUpdateTransaction = () => router.push({ pathname: "/admin/transactions/[id]/edit", query: { id } });

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_TRANSACTION");
        router.push("/admin/transactions");
    };

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_TRANSACTION",
            title: "Удаление транзакции",
            centered: true,
            children: <DeleteTransactionModal id={id} name={transactionData?.entity.type.name} onClose={handleCloseDeleteModal} />,
        });
    };

    return (
        <Box {...props} className={classes.root}>
            <Flex direction="column" gap={32}>
                <Flex gap={48} align="center">
                    <Heading order={2}>Транзакция</Heading>
                    <Button
                        onClick={openDeleteModal}
                        variant="text"
                        leftIcon={
                            <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                <Trash />
                            </ThemeIcon>
                        }>
                        Удалить транзакцию
                    </Button>
                </Flex>
                <Fieldset label="Данные транзакции" icon={<IconClipboard />} legendProps={{ mb: 24 }}>
                    <DisplayField label="Вид сущности" value={transactionData?.entity.type.name} />
                    <DisplayField label="Сущность" value={transactionData?.entity.name} />
                    <DisplayField label="Стоимость" value={`${transactionData?.amount.toLocaleString("ru")} ₽`} />
                </Fieldset>
                <Fieldset label="Покупатель" icon={<IconUserCircle />} legendProps={{ mb: 24 }}>
                    <DisplayField label="Ученик" value={customerFullName} />
                </Fieldset>
                <Fieldset
                    label="Статус и оплата"
                    icon={
                        <ThemeIcon variant="outline" sx={{ border: "none" }}>
                            <CheckStatusIcon />
                        </ThemeIcon>
                    }
                    legendProps={{ mb: 24 }}>
                    <DisplayField label="Статус" value={transactionData?.status.name} />
                    <DisplayField label="Вид оплаты" value={transactionData?.paymentType.name} />
                </Fieldset>
            </Flex>
            <Box>
                <InfoCard<AdminTransaction>
                    variant="whiteBg"
                    fields={fields}
                    hideFieldIfEmpty
                    values={transactionData}
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateTransaction}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Box>
    );
};

export default TransactionSettings;
