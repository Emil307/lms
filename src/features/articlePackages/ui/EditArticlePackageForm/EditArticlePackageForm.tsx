import { Box, Flex, Group, Text } from "@mantine/core";
import { FormikConfig } from "formik";
import axios from "axios";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import { AlignLeft } from "react-feather";
import dayjs from "dayjs";
import { Button, FDateRangePicker, FInput, FMultiSelect, Form, FRadioGroup, FSwitch, FTextarea, Input, Radio } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { AdminArticlePackageDetails, useAdminArticlePackageResource, useUpdateArticlePackage } from "@entities/articlePackage";
import { adaptDataForEditArticlePackageForm, adaptUpdateArticlePackageFormRequest, getDiscountPrice } from "./utils";
import { initialValues, radioGroupValues } from "./constants";
import { $updateArticlePackageFormValidation, UpdateArticlePackageFormValidation } from "./types";
import useStyles from "./EditArticlePackageForm.styles";

export interface EditArticlePackageFormProps {
    data?: AdminArticlePackageDetails;
    onClose: () => void;
}

const EditArticlePackageForm = ({ data, onClose }: EditArticlePackageFormProps) => {
    const { classes } = useStyles();
    const articlePackageResources = useAdminArticlePackageResource();

    const categoriesOptions = articlePackageResources.data?.categories.map((item) => ({
        value: String(item.id),
        label: item.name,
    }));

    const tagsOptions = articlePackageResources.data?.tags.map((item) => ({
        value: String(item.id),
        label: item.name,
    }));

    const { mutate: updateArticlePackage } = useUpdateArticlePackage(String(data?.id));

    const config: FormikConfig<UpdateArticlePackageFormValidation> = {
        initialValues: {
            ...initialValues,
            ...adaptDataForEditArticlePackageForm(data),
        },
        enableReinitialize: true,
        validationSchema: $updateArticlePackageFormValidation,
        onSubmit: async (values, { setFieldError }) => {
            updateArticlePackage(adaptUpdateArticlePackageFormRequest(values), {
                onSuccess: () => {
                    onClose();
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
                        <Flex gap={32} align="center">
                            <Box className={classes.infoItem}>
                                ID: <span>{data?.id}</span>
                            </Box>
                            <Flex gap={8}>
                                <Text className={classes.infoItem}>Статус:</Text>
                                <FSwitch name="isActive" variant="secondary" label={labelActivitySwitch} labelPosition="left" />
                            </Flex>
                            <Box className={classes.infoItem}>
                                Создание: <span>{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                            </Box>
                            {/* TODO: - информации о последних изменениях на бэке пока нет (логирования)*/}
                        </Flex>

                        <Fieldset label="Общее" icon={<IconClipboardText />} maw={512}>
                            <Flex direction="column" gap={8} w="100%">
                                <FInput name="name" label="Наименование" size="sm" />
                                <FMultiSelect data={categoriesOptions || []} name="categories" label="Категории" />
                                <FMultiSelect data={tagsOptions || []} name="tags" label="Теги" />
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
                                <FSwitch variant="secondary" name="discountIsActive" />
                            </Box>
                            {values.discountIsActive && (
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

export default EditArticlePackageForm;
