import { Flex, Box, BoxProps, ThemeIcon } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { IconUserCircle } from "@tabler/icons-react";
import { IconClipboard } from "@tabler/icons";
import { Button, FInput, FSelect, ManagedForm, prepareOptionsForSelect } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import {
    AdminTransactionEntityTypeName,
    CreateAdminTransactionResponse,
    transactionApi,
    useAdminTransactionCreateResources,
} from "@entities/transaction";
import CheckStatusIcon from "public/icons/checkStatus.svg";
import { initialValues } from "./constant";
import { $CreateTransactionFormValidation, CreateTransactionFormValidation } from "./types";
import { adaptCreateTransactionRequest } from "./utils";
import { EntitySelect } from "./components";

export interface CreateTransactionFormProps extends BoxProps {
    onClose: () => void;
}

const CreateTransactionForm = ({ onClose, ...props }: CreateTransactionFormProps) => {
    const router = useRouter();

    const transactionResources = useAdminTransactionCreateResources();

    const createTransaction = (values: CreateTransactionFormValidation) => {
        return transactionApi.createAdminTransaction(adaptCreateTransactionRequest(values));
    };

    const onSuccess = (response: CreateAdminTransactionResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание транзакции ",
            message: "Транзакция успешно создана",
        });
        router.push({ pathname: "/admin/transactions/[id]", query: { id: response.id.toString() } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания транзакции",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<CreateTransactionFormValidation, CreateAdminTransactionResponse>
                initialValues={initialValues}
                validationSchema={$CreateTransactionFormValidation}
                mutationKey={[MutationKeys.CREATE_ADMIN_TRANSACTION]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_TRANSACTIONS] }]}
                mutationFunction={createTransaction}
                onSuccess={onSuccess}
                onError={onError}
                hasConfirmModal
                onCancel={onClose}>
                {({ dirty, onCancel, values, setFieldValue }) => {
                    const resetEntitySelect = () => {
                        setFieldValue("entityId", "");
                    };

                    return (
                        <Flex direction="column" gap={32}>
                            <Fieldset label="Данные транзакции" icon={<IconClipboard />} legendProps={{ mb: 24 }}>
                                <Flex direction="column" gap={8} w="100%">
                                    <FSelect
                                        name="entityType"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: transactionResources.data?.entityTypes,
                                            value: "type",
                                            label: "name",
                                        })}
                                        clearable
                                        onChange={resetEntitySelect}
                                        label="Вид сущности"
                                        disabled={transactionResources.isLoading}
                                    />
                                    <EntitySelect name="entityId" entityType={values.entityType as AdminTransactionEntityTypeName} />
                                    <FInput name="amount" label="Стоимость (₽)" type="number" size="sm" w="100%" />
                                </Flex>
                            </Fieldset>
                            <Fieldset label="Покупатель" icon={<IconUserCircle />} legendProps={{ mb: 24 }}>
                                <Box w="100%">
                                    <FSelect
                                        name="userId"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: transactionResources.data?.users,
                                            value: "id",
                                            label: ({ profile }) => [profile.lastName, profile.firstName, profile.patronymic].join(" "),
                                        })}
                                        clearable
                                        label="Ученик"
                                        disabled={transactionResources.isLoading}
                                    />
                                </Box>
                            </Fieldset>
                            <Fieldset
                                label="Статус и оплата"
                                icon={
                                    <ThemeIcon>
                                        <CheckStatusIcon />
                                    </ThemeIcon>
                                }
                                legendProps={{ mb: 24 }}>
                                <Flex gap={8} w="100%">
                                    <FSelect
                                        name="status"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: transactionResources.data?.statuses,
                                            value: "status",
                                            label: "name",
                                        })}
                                        clearable
                                        label="Статус"
                                        disabled={transactionResources.isLoading}
                                        w="100%"
                                    />
                                    <FSelect
                                        name="paymentType"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: transactionResources.data?.paymentTypes,
                                            value: "type",
                                            label: "name",
                                        })}
                                        clearable
                                        label="Вид оплаты"
                                        disabled={transactionResources.isLoading}
                                        w="100%"
                                    />
                                </Flex>
                            </Fieldset>
                            <Flex gap={8} mt={32}>
                                <Button variant="border" size="large" onClick={onCancel} w="100%" maw={252}>
                                    Отмена
                                </Button>
                                <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                                    Сохранить
                                </Button>
                            </Flex>
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default CreateTransactionForm;
