import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { AlignLeft } from "react-feather";
import { IconClipboardText, IconPercentage } from "@tabler/icons-react";
import dayjs from "dayjs";
import {
    Button,
    FDateRangePicker,
    FFileInput,
    FInput,
    FRadioGroup,
    FSwitch,
    FTextEditor,
    Heading,
    Input,
    LastUpdatedInfo,
    ManagedForm,
    Paragraph,
    Radio,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, getDiscountPrice, useMedia } from "@shared/utils";
import { AdminCoursePackageDetails, coursePackageApi } from "@entities/coursePackage";
import { radioGroupValues } from "./constants";
import { $UpdateCoursePackageFormValidation, UpdateCoursePackageFormValidation } from "./types";
import { adaptUpdateCoursePackageForm, adaptUpdateCoursePackageFormRequest } from "./utils";
import useStyles from "./UpdateCoursePackageForm.styles";

export interface UpdateCoursePackageFormProps extends Omit<BoxProps, "children"> {
    data?: AdminCoursePackageDetails;
    onClose: () => void;
}

const UpdateCoursePackageForm = ({ data, onClose, ...props }: UpdateCoursePackageFormProps) => {
    const { classes } = useStyles();

    const isMobile = useMedia("xs");

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание пакета",
            message: "Пакет курсов успешно создан",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания пакета",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdateCoursePackageFormValidation, AdminCoursePackageDetails>
                initialValues={adaptUpdateCoursePackageForm(data)}
                validationSchema={$UpdateCoursePackageFormValidation}
                mutationKey={[MutationKeys.UPDATE_COURSE_PACKAGE]}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_ADMIN_COURSE_PACKAGES] },
                    { queryKey: [QueryKeys.GET_ADMIN_COURSE_PACKAGE, data?.id.toString()] },
                ]}
                mutationFunction={(params) =>
                    coursePackageApi.updateCoursePackage(adaptUpdateCoursePackageFormRequest(params, String(data?.id)))
                }
                onSuccess={onSuccess}
                hasConfirmModal
                onCancel={onClose}
                onError={onError}>
                {({ values, errors, dirty, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    const discountAmount = getDiscountPrice({
                        price: !errors.price ? values.price : null,
                        amountDiscount: !errors.discount?.amount ? values.discount.amount : null,
                        type: values.discount.type,
                    });

                    return (
                        <Flex direction="column" gap={32}>
                            <Flex className={classes.infoPanel}>
                                <Flex gap={8}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        ID:
                                    </Paragraph>
                                    <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                                </Flex>
                                <Flex align="center" gap={8}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        Статус:
                                    </Paragraph>
                                    <FSwitch name="isActive" variant="secondary" label={labelActivitySwitch} labelPosition="left" />
                                </Flex>
                                <Flex gap={8}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        Создание:
                                    </Paragraph>
                                    <Paragraph variant="text-small-m">
                                        {data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
                                    </Paragraph>
                                </Flex>
                                <LastUpdatedInfo data={data?.lastUpdated} />
                            </Flex>

                            <FFileInput
                                name="cover"
                                title="Изменить фото"
                                type="image"
                                fileFormats={["png", "gif", "jpeg", "jpg", "svg", "webp"]}
                                withDeleteButton
                                className={classes.coverFileInput}
                                description="До 1Mb"
                            />

                            <Fieldset label="Общее" icon={<IconClipboardText />} maw={512} legendProps={{ mb: 24 }}>
                                <Flex direction="column" gap={8} w="100%">
                                    <FInput name="name" label="Наименование" size="sm" w="100%" />
                                    <FInput name="price" label="Стоимость пакета" type="number" size="sm" className={classes.priceInput} />
                                </Flex>
                            </Fieldset>

                            <Fieldset label="Описание пакетного предложения" icon={<AlignLeft />} maw={1162} legendProps={{ mb: 24 }}>
                                <Box w="100%">
                                    <FTextEditor name="description" placeholder="Введите текст" className={classes.textEditorDescription} />
                                </Box>
                            </Fieldset>

                            <Box component="fieldset" className={classes.fieldset}>
                                <Box component="legend" className={classes.legend}>
                                    <IconPercentage />
                                    <Heading order={4}>Параметры скидки</Heading>
                                    <FSwitch variant="secondary" name="hasDiscount" />
                                </Box>
                                {values.hasDiscount && (
                                    <Flex direction="column" gap={16} w="100%">
                                        <Flex>
                                            <FRadioGroup
                                                name="discount.type"
                                                defaultValue="percentage"
                                                className={classes.discountTypeRadioGroup}>
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
                            </Box>
                            <Flex className={classes.actions}>
                                <Button variant="border" size={isMobile ? "medium" : "large"} onClick={onCancel}>
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

export default UpdateCoursePackageForm;
