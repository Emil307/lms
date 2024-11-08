import { Box, BoxProps, Flex } from "@mantine/core";
import React, { ReactNode } from "react";
import { Button, FCheckbox, FInput, FSwitch, FTextarea, ManagedForm, Paragraph } from "@shared/ui";
import { $UpdateFaqRequest, AdminFaqItem, UpdateFaqRequest, staticPageApi } from "@entities/staticPage";
import { EntityNames, MutationKeys } from "@shared/constant";
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
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.STATIC_FAQ }}
                mutationFunction={updateFaq}
                onSuccess={onSuccess}
                disableOverlay
                onCancel={onClose}>
                {({ values, dirty, isLoading, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <>
                            <Flex className={classes.headingFormContainer}>
                                <Flex className={classes.infoPanelFormContainer}>
                                    <Flex align="center" gap={8}>
                                        <Paragraph variant="text-small-m" color="neutralMain50">
                                            Статус:
                                        </Paragraph>
                                        <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                                    </Flex>
                                    <FCheckbox name="isStatic" label="Отображать на главной" />
                                </Flex>
                                {actionSlot}
                            </Flex>
                            <FInput size="sm" name="question" label="Вопрос" />
                            <FTextarea name="answer" placeholder="Ответ на вопрос" className={classes.answerTextarea} />
                            <Flex className={classes.actions}>
                                <Button variant="border" onClick={onCancel} disabled={isLoading}>
                                    Отменить
                                </Button>
                                <Button variant="secondary" type="submit" loading={isLoading} disabled={!dirty}>
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
