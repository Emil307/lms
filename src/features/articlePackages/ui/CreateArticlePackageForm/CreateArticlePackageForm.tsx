import { Box, Text, Flex, Group, BoxProps } from "@mantine/core";
import React from "react";
import { AlignLeft } from "react-feather";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import { useRouter } from "next/router";
import {
    Button,
    FDateRangePicker,
    FInput,
    FMultiSelect,
    FRadioGroup,
    FSwitch,
    FTextarea,
    Input,
    ManagedForm,
    prepareOptionsForSelect,
    Radio,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { CreateArticlePackageResponse, articlePackageApi, useAdminArticlePackageResourcesCreate } from "@entities/articlePackage";
import { ToastType, createNotification, getDiscountPrice } from "@shared/utils";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { initialValues, radioGroupValues } from "./constants";
import useStyles from "./CreateArticlePackageForm.styles";
import { $CreateArticlePackageFormValidation, CreateArticlePackageFormValidation } from "./types";
import { adaptCreateArticlePackageRequest } from "./utils";

export interface CreateArticlePackageFormProps extends BoxProps {
    onClose: () => void;
}

const CreateArticlePackageForm = ({ onClose, ...props }: CreateArticlePackageFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const articlePackageResources = useAdminArticlePackageResourcesCreate();

    const createArticlePackage = (values: CreateArticlePackageFormValidation) => {
        return articlePackageApi.createArticlePackage(adaptCreateArticlePackageRequest(values));
    };

    const onSuccess = (response: CreateArticlePackageResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание пакета",
            message: "Пакет успешно создан",
        });
        router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id: String(response.id) } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания пакета",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<CreateArticlePackageFormValidation, CreateArticlePackageResponse>
                initialValues={initialValues}
                validationSchema={$CreateArticlePackageFormValidation}
                mutationKey={[MutationKeys.CREATE_ARTICLE_PACKAGE]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGES] }]}
                mutationFunction={createArticlePackage}
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
                                    <Text className={classes.title}>Параметры скидки</Text>
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

export default CreateArticlePackageForm;
