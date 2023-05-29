import { Box, Text, Flex, Group } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import { AlignLeft } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import {
    Button,
    FDateRangePicker,
    FInput,
    FMultiSelect,
    Form,
    FRadioGroup,
    FSwitch,
    FTextarea,
    Input,
    prepareOptionsForSelect,
    Radio,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { useAdminArticlePackageResource, useCreateArticlePackage } from "@entities/articlePackage";
import { getDiscountPrice } from "@shared/utils";
import { initialValues, radioGroupValues } from "./constants";
import useStyles from "./CreateArticlePackageForm.styles";
import { $createArticlePackageFormValidation, CreateArticlePackageFormValidation } from "./types";
import { adaptCreateArticlePackageFormRequest } from "./utils";

export interface CreateArticlePackageFormProps {
    onClose: () => void;
}

const CreateArticlePackageForm = ({ onClose }: CreateArticlePackageFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const articlePackageResources = useAdminArticlePackageResource();
    const createArticlePackage = useCreateArticlePackage();

    const config: FormikConfig<CreateArticlePackageFormValidation> = {
        initialValues,
        enableReinitialize: true,
        validationSchema: $createArticlePackageFormValidation,
        onSubmit: (values, { setFieldError }) => {
            createArticlePackage.mutate(adaptCreateArticlePackageFormRequest(values), {
                onSuccess: () => {
                    router.push({ pathname: "/admin/settings/article-packages" });
                },
                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        for (const errorField in error.response?.data.errors) {
                            setFieldError(errorField, error.response?.data.errors[errorField][0]);
                        }
                    }
                },
            });
        },
    };
    return (
        <Form config={config}>
            {({ values, dirty, errors }) => {
                const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                const discountAmount = getDiscountPrice({
                    price: !errors.price ? values.price : null,
                    amountDiscount: !errors.discount?.amount ? values.discount.amount : null,
                    type: values.discount.type,
                });
                return (
                    <Flex direction="column" gap={32}>
                        <Flex gap={8} align="center">
                            <Text
                                sx={(theme) => ({
                                    color: theme.colors.gray45[0],
                                })}>
                                Статус:
                            </Text>
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
                                    data={prepareOptionsForSelect({ data: articlePackageResources.data?.tags, value: "id", label: "name" })}
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
                                <FSwitch variant="secondary" name="discount.discountIsActive" />
                            </Box>
                            {values.discount.discountIsActive && (
                                <Flex direction="column" gap={24} w="100%">
                                    <Flex>
                                        <FRadioGroup name="discount.type" defaultValue="percentage">
                                            {radioGroupValues.map((item) => {
                                                return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                            })}
                                        </FRadioGroup>
                                    </Flex>
                                    <Group sx={{ gap: 8 }}>
                                        <FInput name="discount.amount" label="Размер скидки" type="number" size="sm" w="100%" maw={252} />
                                        <FDateRangePicker
                                            name="discount.startingDate"
                                            nameTo="discount.finishingDate"
                                            label="Период действия"
                                            size="sm"
                                            w="100%"
                                            maw={252}
                                        />
                                        <Input value={discountAmount} label="Стоимость со скидкой" size="sm" w="100%" maw={252} disabled />
                                    </Group>
                                </Flex>
                            )}
                        </Box>

                        <Flex gap={8}>
                            <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
                                Отменить
                            </Button>
                            <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                                Сохранить
                            </Button>
                        </Flex>
                    </Flex>
                );
            }}
        </Form>
    );
};

export default CreateArticlePackageForm;
