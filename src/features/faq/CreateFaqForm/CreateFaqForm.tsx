import { Box, BoxProps, Flex, Text } from "@mantine/core";
import React from "react";
import { Button, FCheckbox, FInput, FSwitch, FTextarea, ManagedForm } from "@shared/ui";
import { $CreateFaqRequest, AdminFaqItem, CreateFaqRequest, staticPageApi } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { initialValues } from "./constants";
import useStyles from "./CreateFaqForm.styles";

export interface CreateFaqFormProps extends BoxProps {
    opened?: boolean;
    onClose: () => void;
}

const CreateFaqForm = ({ opened = true, onClose, ...props }: CreateFaqFormProps) => {
    const { classes } = useStyles();

    const createFaq = (values: CreateFaqRequest) => {
        return staticPageApi.createFaq(values);
    };

    const onSuccess = () => {
        onClose();
    };

    if (!opened) {
        return null;
    }

    return (
        <Box {...props} className={classes.root}>
            <ManagedForm<CreateFaqRequest, AdminFaqItem>
                initialValues={initialValues}
                validationSchema={$CreateFaqRequest}
                mutationKey={[MutationKeys.CREATE_FAQ]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_FAQ] }]}
                mutationFunction={createFaq}
                onSuccess={onSuccess}
                hasConfirmModal
                onCancel={onClose}>
                {({ values, dirty, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <>
                            <Flex align="center" gap={32} mb={24}>
                                <Flex gap={8} align="center">
                                    <Text color="gray45">Статус:</Text>
                                    <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                                </Flex>
                                <FCheckbox name="isStatic" label="Отображать на главной" />
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

export default CreateFaqForm;