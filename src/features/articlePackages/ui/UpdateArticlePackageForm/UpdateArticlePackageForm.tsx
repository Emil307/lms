import { Box, BoxProps, Flex, Group, Text } from "@mantine/core";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import { AlignLeft } from "react-feather";
import React from "react";
import {
    Button,
    FDateRangePicker,
    FInput,
    FMultiSelect,
    FRadioGroup,
    FSwitch,
    FTextarea,
    Heading,
    Input,
    ManagedForm,
    prepareOptionsForSelect,
    Radio,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import {
    GetAdminArticlePackageResponse,
    UpdateArticlePackageResponse,
    articlePackageApi,
    useAdminArticlePackageResourcesCreate,
} from "@entities/articlePackage";
import { ToastType, createNotification, getDiscountPrice } from "@shared/utils";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { adaptUpdateArticlePackageForm, adaptUpdateArticlePackageRequest } from "./utils";
import { radioGroupValues } from "./constants";
import { $UpdateArticlePackageFormValidation, UpdateArticlePackageFormValidation } from "./types";
import useStyles from "./UpdateArticlePackageForm.styles";

export interface UpdateArticlePackageFormProps extends BoxProps {
    data?: GetAdminArticlePackageResponse;
    onClose: () => void;
}

const UpdateArticlePackageForm = ({ data, onClose, ...props }: UpdateArticlePackageFormProps) => {
    const { classes } = useStyles();

    const articlePackageResources = useAdminArticlePackageResourcesCreate();

    const updateArticlePackage = (values: UpdateArticlePackageFormValidation) => {
        return articlePackageApi.updateArticlePackage({ ...adaptUpdateArticlePackageRequest(values), id: String(data?.id) });
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
            title: "Ошибка обновления пакета статей",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdateArticlePackageFormValidation, UpdateArticlePackageResponse>
                initialValues={adaptUpdateArticlePackageForm(data)}
                validationSchema={$UpdateArticlePackageFormValidation}
                mutationKey={[MutationKeys.UPDATE_ARTICLE_PACKAGE]}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGES] },
                    { queryKey: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, String(data?.id)] },
                ]}
                mutationFunction={updateArticlePackage}
                onSuccess={onSuccess}
                onError={onError}
                hasConfirmModal
                onCancel={onClose}>
                {({ dirty, values, errors, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    const discountAmount = getDiscountPrice({
                        price: !errors.price ? values.price : null,
                        amountDiscount: !errors.discount?.amount ? values.discount.amount : null,
                        type: values.discount.type,
                    });
                    return (
                        <Flex direction="column" gap={32}>
                            <Flex gap={8} align="center">
                                <Text color="gray45">Статус:</Text>
                                <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                            </Flex>

                            <Fieldset label="Общее" icon={<IconClipboardText />} maw={512}>
                                <Flex direction="column" gap={8} w="100%">
                                    <FInput name="name" label="Наименование" size="sm" />
                                    <FMultiSelect
                                        data={prepareOptionsForSelect({
                                            data: articlePackageResources.data?.categories,
                                            value: "id",
                                            label: "name",
                                        })}
                                        name="categories"
                                        label="Категории"
                                    />
                                    <FMultiSelect
                                        data={prepareOptionsForSelect({
                                            data: articlePackageResources.data?.tags,
                                            value: "id",
                                            label: "name",
                                        })}
                                        name="tags"
                                        label="Теги"
                                    />
                                    <FInput name="price" label="Стоимость пакета" type="number" size="sm" w="50%" />
                                </Flex>
                            </Fieldset>
                            <Fieldset label="Описание пакетного предложения" icon={<AlignLeft />} maw={772}>
                                <FTextarea
                                    name="description"
                                    placeholder="Введите текст"
                                    w="100%"
                                    maw={772}
                                    sx={{
                                        textarea: {
                                            minHeight: 190,
                                        },
                                    }}
                                />
                            </Fieldset>

                            <Box component="fieldset" className={classes.fieldset} maw={772}>
                                <Box component="legend" className={classes.legend}>
                                    <IconPercentage />
                                    <Heading order={4}>Параметры скидки</Heading>
                                    <FSwitch variant="secondary" name="hasDiscount" />
                                </Box>
                                {values.hasDiscount && (
                                    <Flex direction="column" gap={24} w="100%">
                                        <Flex>
                                            <FRadioGroup name="discount.type" defaultValue="percentage">
                                                {radioGroupValues.map((item) => {
                                                    return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                                })}
                                            </FRadioGroup>
                                        </Flex>
                                        <Group sx={{ gap: 8 }}>
                                            <FInput
                                                name="discount.amount"
                                                label="Размер скидки"
                                                type="number"
                                                size="sm"
                                                w="100%"
                                                maw={252}
                                            />
                                            <FDateRangePicker
                                                name="discount.startingDate"
                                                nameTo="discount.finishingDate"
                                                label="Период действия"
                                                size="sm"
                                                w="100%"
                                                maw={252}
                                            />
                                            <Input
                                                value={discountAmount}
                                                label="Стоимость со скидкой"
                                                size="sm"
                                                w="100%"
                                                maw={252}
                                                disabled
                                            />
                                        </Group>
                                    </Flex>
                                )}
                            </Box>
                            <Flex gap={8}>
                                <Button variant="border" size="large" onClick={onCancel} w="100%" maw={252}>
                                    Отменить
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

export default UpdateArticlePackageForm;
