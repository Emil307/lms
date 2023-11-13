import { Box, Flex, BoxProps } from "@mantine/core";
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
    Heading,
    Input,
    ManagedForm,
    Paragraph,
    prepareOptionsForSelect,
    Radio,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { CreateArticlePackageResponse, articlePackageApi, useAdminArticlePackageResourcesCreate } from "@entities/articlePackage";
import { ToastType, createNotification, getDiscountPrice, useMedia } from "@shared/utils";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { initialValues, radioGroupValues } from "./constants";
import { $CreateArticlePackageFormValidation, CreateArticlePackageFormValidation } from "./types";
import { adaptCreateArticlePackageRequest } from "./utils";
import useStyles from "./CreateArticlePackageForm.styles";

export interface CreateArticlePackageFormProps extends BoxProps {
    onClose: () => void;
}

const CreateArticlePackageForm = ({ onClose, ...props }: CreateArticlePackageFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const isMobile = useMedia("xs");

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
                onError={onError}>
                {({ dirty, values, errors }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    const discountAmount = getDiscountPrice({
                        price: !errors.price ? values.price : null,
                        amountDiscount: !errors.discount?.amount ? values.discount.amount : null,
                        type: values.discount.type,
                    });
                    return (
                        <Flex direction="column" gap={32}>
                            <Flex align="center" gap={8}>
                                <Paragraph variant="text-small-m" color="gray45">
                                    Статус:
                                </Paragraph>
                                <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                            </Flex>

                            <Fieldset label="Общее" icon={<IconClipboardText />} legendProps={{ mb: 24 }} maw={512}>
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
                                    <FInput name="price" label="Стоимость пакета" type="number" size="sm" className={classes.priceInput} />
                                </Flex>
                            </Fieldset>
                            <Fieldset label="Описание пакетного предложения" icon={<AlignLeft />} legendProps={{ mb: 24 }} maw={772}>
                                <FTextarea name="description" placeholder="Введите текст" className={classes.descriptionTextarea} />
                            </Fieldset>

                            <Box component="fieldset" className={classes.fieldset} maw={772}>
                                <Box component="legend" className={classes.legend}>
                                    <IconPercentage />
                                    <Heading order={4}>Параметры скидки</Heading>
                                    <FSwitch variant="secondary" name="hasDiscount" />
                                </Box>
                                {values.hasDiscount && (
                                    <Flex direction="column" gap={16} w="100%">
                                        <FRadioGroup name="discount.type" defaultValue="percentage">
                                            {radioGroupValues.map((item) => {
                                                return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                            })}
                                        </FRadioGroup>
                                        <Flex className={classes.discountFieldsContainer}>
                                            <FInput
                                                name="discount.amount"
                                                label="Размер скидки"
                                                type="number"
                                                size="sm"
                                                className={classes.discountInput}
                                            />
                                            <FDateRangePicker
                                                name="discount.startingDate"
                                                nameTo="discount.finishingDate"
                                                label="Период действия"
                                                size="sm"
                                                className={classes.discountDateRangePicker}
                                            />
                                            <Input
                                                value={discountAmount}
                                                label="Стоимость со скидкой"
                                                size="sm"
                                                className={classes.discountInput}
                                                disabled
                                            />
                                        </Flex>
                                    </Flex>
                                )}
                            </Box>
                            <Flex className={classes.actions}>
                                <Button variant="border" size={isMobile ? "medium" : "large"} onClick={onClose}>
                                    Отменить
                                </Button>
                                <Button type="submit" variant="secondary" size={isMobile ? "medium" : "large"} disabled={!dirty}>
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
