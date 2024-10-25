import { Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import { Button, FCheckbox, FInput, FSwitch, FTextarea, ManagedForm, Paragraph } from "@shared/ui";
import { $CreateFaqRequest, AdminFaqItem, CreateFaqRequest, staticPageApi } from "@entities/staticPage";
import { EntityNames, MutationKeys } from "@shared/constant";
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
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.STATIC_FAQ }}
                mutationFunction={createFaq}
                onSuccess={onSuccess}
                disableOverlay>
                {({ values, dirty, isLoading }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <>
                            <Flex className={classes.infoPanelFormContainer}>
                                <Flex align="center" gap={8}>
                                    <Paragraph variant="text-small-m" color="neutralMain50">
                                        Статус:
                                    </Paragraph>
                                    <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                                </Flex>
                                <FCheckbox name="isStatic" label="Отображать на главной" />
                            </Flex>
                            <FInput size="sm" name="question" label="Вопрос" />
                            <FTextarea name="answer" placeholder="Ответ на вопрос" className={classes.answerTextarea} />
                            <Flex className={classes.actions}>
                                <Button variant="border" onClick={onClose} disabled={isLoading}>
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

export default CreateFaqForm;
