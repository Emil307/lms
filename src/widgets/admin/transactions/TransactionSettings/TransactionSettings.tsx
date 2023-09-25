import { Box, Flex, ThemeIcon, BoxProps } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { IconClipboard, IconUserCircle } from "@tabler/icons-react";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading } from "@shared/ui";
import { InfoCard } from "@components/InfoCard";
import { GetAdminTransactionResponse, useAdminTransaction } from "@entities/transaction";
import CheckStatusIcon from "public/icons/checkStatus.svg";
import { getFullName } from "@shared/utils";
import { fields } from "./constants";
import useStyles from "./TransactionSettings.styles";
import { DeleteTransactionButton } from "./components";

export interface TransactionSettingsProps extends Omit<BoxProps, "children"> {
    id: string;
}

const TransactionSettings = ({ id, ...props }: TransactionSettingsProps) => {
    const router = useRouter();
    const { classes, cx } = useStyles();
    const { data: transactionData } = useAdminTransaction({ id });

    const customerFullName = getFullName({ data: transactionData?.user.profile });

    const handleOpenUpdateTransactionPage = () => router.push({ pathname: "/admin/transactions/[id]/edit", query: { id } });

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Транзакция</Heading>
                    <DeleteTransactionButton data={transactionData} />
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
                        <ThemeIcon>
                            <CheckStatusIcon />
                        </ThemeIcon>
                    }
                    legendProps={{ mb: 24 }}>
                    <DisplayField label="Статус" value={transactionData?.status.name} />
                    <DisplayField label="Вид оплаты" value={transactionData?.paymentType.name} />
                </Fieldset>
            </Flex>
            <Box>
                <InfoCard<GetAdminTransactionResponse>
                    values={transactionData}
                    variant="whiteBg"
                    fields={fields}
                    hideFieldIfEmpty
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateTransactionPage}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Flex>
    );
};

export default TransactionSettings;
