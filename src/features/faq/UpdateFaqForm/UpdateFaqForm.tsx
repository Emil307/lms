import { Box, BoxProps, Flex, Text } from "@mantine/core";
import React, { ReactNode } from "react";
import { Button, FCheckbox, FInput, FSwitch, FTextarea, ManagedForm } from "@shared/ui";
import { $UpdateFaqRequest, AdminFaqItem, UpdateFaqRequest, staticPageApi } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { initialValues } from "./constants";
import useStyles from "./UpdateFaqForm.styles";

export interface UpdateFaqFormProps extends BoxProps {
    data: AdminFaqItem;
    onClose: () => void;
    actionSlot?: ReactNode;
}

const UpdateFaqForm = ({ data, actionSlot, onClose, ...props }: UpdateFaqFormProps) => {
    const { classes } = useStyles();

    const updateFaq = (values: UpdateFaqRequest) => {
        return staticPageApi.updateFaq({ ...values, id: data.id });
    };

    const onSuccess = () => {
        onClose();
    };

    return (
        <Box {...props} className={classes.root}>
            <ManagedForm<UpdateFaqRequest, AdminFaqItem>
                initialValues={{ ...initialValues, ...data }}
                validationSchema={$UpdateFaqRequest}
                mutationKey={[MutationKeys.UPDATE_FAQ]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_FAQ] }]}
                mutationFunction={updateFaq}
                onSuccess={onSuccess}
                hasConfirmModal
                onCancel={onClose}>
                {({ values, dirty, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <>
                            <Flex justify="space-between" mb={24}>
                                <Flex align="center" gap={32}>
                                    <Flex gap={8} align="center">
                                        <Text color="gray45">Статус:</Text>
                                        <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                                    </Flex>
                                    <FCheckbox name="isStatic" label="Отображать на главной" />
                                </Flex>
                                {actionSlot}
                            </Flex>
                            <FInput size="sm" name="question" label="Вопрос" />
                            <FTextarea name="answer" mt={8} placeholder="Ответ на вопрос" />
                            <Flex gap={8} mt={24}>
                                <Button variant="border" onClick={onCancel}>
                                    Отменить
                                </Button>
                                <Button variant="secondary" type="submit" disabled={!dirty}>
                                    Сохранить
                                </Button>
                            </Flex>
                        </>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateFaqForm;
