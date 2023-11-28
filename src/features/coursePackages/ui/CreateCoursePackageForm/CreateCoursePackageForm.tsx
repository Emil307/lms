import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { AlignLeft } from "react-feather";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import { useRouter } from "next/router";
import {
    FControlButtons,
    FDateRangePicker,
    FFileInput,
    FInput,
    FRadioGroup,
    FSwitch,
    FTextarea,
    Heading,
    Input,
    ManagedForm,
    Paragraph,
    Radio,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { MutationKeys } from "@shared/constant";
import { ToastType, createNotification, getDiscountPrice } from "@shared/utils";
import { AdminCoursePackageDetails, coursePackageApi } from "@entities/coursePackage";
import { initialValues, keysInvalidateQueries, radioGroupValues } from "./constants";
import { $CreateCoursePackageFormValidation, CreateCoursePackageFormValidation } from "./types";
import { adaptCreateCoursePackageFormRequest } from "./utils";
import useStyles from "./CreateCoursePackageForm.styles";

export interface CreateCoursePackageFormProps extends Omit<BoxProps, "children"> {
    onClose: () => void;
}

const CreateCoursePackageForm = ({ onClose, ...props }: CreateCoursePackageFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const onSuccess = (response: AdminCoursePackageDetails) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание пакета",
            message: "Пакет курсов успешно создан",
        });
        router.push({ pathname: "/admin/settings/course-packages/[id]", query: { id: String(response.id) } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания пакета",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<CreateCoursePackageFormValidation, AdminCoursePackageDetails>
                initialValues={initialValues}
                validationSchema={$CreateCoursePackageFormValidation}
                mutationKey={[MutationKeys.CREATE_COURSE_PACKAGE]}
                keysInvalidateQueries={keysInvalidateQueries}
                mutationFunction={(params) => coursePackageApi.createCoursePackage(adaptCreateCoursePackageFormRequest(params))}
                onSuccess={onSuccess}
                onError={onError}>
                {({ values, errors }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    const discountAmount = getDiscountPrice({
                        price: !errors.price ? Number(values.price) : null,
                        amountDiscount: !errors.discount?.amount ? Number(values.discount.amount) : null,
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
                            <FFileInput
                                name="cover"
                                title="Изменить фото"
                                type="image"
                                fileFormats={["png", "gif", "jpeg", "jpg", "svg", "webp"]}
                                className={classes.coverFileInput}
                                description="До 1Mb"
                            />

                            <Fieldset label="Общее" icon={<IconClipboardText />} maw={512} legendProps={{ mb: 24 }}>
                                <Flex direction="column" gap={8} w="100%">
                                    <FInput name="name" label="Наименование" size="sm" w="100%" />
                                    <FInput name="price" label="Стоимость пакета" type="number" size="sm" className={classes.priceInput} />
                                </Flex>
                            </Fieldset>

                            <Fieldset label="Описание пакетного предложения" icon={<AlignLeft />} maw={512} legendProps={{ mb: 24 }}>
                                <FTextarea name="description" placeholder="Введите текст" minRows={7} />
                            </Fieldset>

                            <Flex className={classes.fieldset}>
                                <Flex className={classes.fieldsetHeading}>
                                    <IconPercentage />
                                    <Heading order={4}>Параметры скидки</Heading>
                                    <FSwitch variant="secondary" name="hasDiscount" />
                                </Flex>
                                {values.hasDiscount && (
                                    <Flex direction="column" gap={16} w="100%">
                                        <FRadioGroup
                                            name="discount.type"
                                            defaultValue="percentage"
                                            className={classes.discountTypeRadioGroup}>
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
                            </Flex>
                            <FControlButtons onClose={onClose} />
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default CreateCoursePackageForm;
