import { Box, BoxProps, Flex } from "@mantine/core";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import { AlignLeft } from "react-feather";
import React from "react";
import dayjs from "dayjs";
import {
    FControlButtons,
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
import {
    GetAdminArticlePackageResponse,
    UpdateArticlePackageResponse,
    articlePackageApi,
    useAdminArticlePackageResourcesCreate,
} from "@entities/articlePackage";
import { ToastType, createNotification, getDiscountPrice } from "@shared/utils";
import { EntityNames, MutationKeys } from "@shared/constant";
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
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.ARTICLE_PACKAGE }}
                mutationFunction={updateArticlePackage}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}>
                {({ values, errors, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    const discountAmount = getDiscountPrice({
                        price: !errors.price ? Number(values.price) : null,
                        amountDiscount: !errors.discount?.amount ? Number(values.discount.amount) : null,
                        type: values.discount.type,
                    });
                    return (
                        <Flex direction="column" gap={32}>
                            <Flex className={classes.infoPanel}>
                                <Flex gap={8}>
                                    <Paragraph variant="text-small-m" color="neutralMain50">
                                        ID:
                                    </Paragraph>
                                    <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                                </Flex>
                                <Flex align="center" gap={8}>
                                    <Paragraph variant="text-small-m" color="neutralMain50">
                                        Статус:
                                    </Paragraph>
                                    <FSwitch name="isActive" variant="secondary" label={labelActivitySwitch} labelPosition="left" />
                                </Flex>
                                <Flex gap={8}>
                                    <Paragraph variant="text-small-m" color="neutralMain50">
                                        Создание:
                                    </Paragraph>
                                    <Paragraph variant="text-small-m">
                                        {data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
                                    </Paragraph>
                                </Flex>
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

                            <Flex className={classes.fieldset} maw={772}>
                                <Flex className={classes.fieldsetHeading}>
                                    <IconPercentage />
                                    <Heading order={4}>Параметры скидки</Heading>
                                    <FSwitch variant="secondary" name="hasDiscount" />
                                </Flex>
                                {values.hasDiscount && (
                                    <Flex direction="column" gap={16} w="100%">
                                        <Flex>
                                            <FRadioGroup name="discount.type" defaultValue="percentage">
                                                {radioGroupValues.map((item) => {
                                                    return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                                })}
                                            </FRadioGroup>
                                        </Flex>
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
                            </Flex>
                            <FControlButtons onClose={onCancel} />
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateArticlePackageForm;
