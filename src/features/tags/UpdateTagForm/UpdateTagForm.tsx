import { Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import { Button, FInput, ManagedForm } from "@shared/ui";
import { AdminTagFromList, UpdateAdminTagResponse, tagApi } from "@entities/tag";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import { $UpdateTagFormValidation, UpdateTagFormValidation } from "./types";

export interface UpdateTagFormProps extends BoxProps {
    data?: AdminTagFromList;
    onClose: () => void;
}

const UpdateTagForm = ({ data, onClose, ...props }: UpdateTagFormProps) => {
    const updateAdminTag = (values: UpdateTagFormValidation) => {
        return tagApi.updateAdminTag({ ...values, id: String(data?.id) });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления тега",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdateTagFormValidation, UpdateAdminTagResponse>
                initialValues={{
                    ...initialValues,
                    ...data,
                }}
                validationSchema={$UpdateTagFormValidation}
                mutationKey={[MutationKeys.UPDATE_ADMIN_TAG]}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_ADMIN_TAGS] },
                    { queryKey: [QueryKeys.GET_ADMIN_TAG, String(data?.id)] },
                ]}
                mutationFunction={updateAdminTag}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}
                hasConfirmModal>
                {({ onCancel }) => (
                    <Flex direction="column" gap={{ base: 24, xs: 32 }}>
                        <FInput name="name" label="Название" />
                        <Flex gap={8}>
                            <Button variant="border" size="large" onClick={onCancel} w="100%">
                                Отмена
                            </Button>
                            <Button type="submit" variant="secondary" size="large" w="100%">
                                Сохранить
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </ManagedForm>
        </Box>
    );
};

export default UpdateTagForm;
