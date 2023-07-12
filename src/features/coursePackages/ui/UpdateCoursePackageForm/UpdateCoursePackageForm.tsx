import { Box, Text, Flex } from "@mantine/core";
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
    ManagedForm,
    Radio,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, getDiscountPrice } from "@shared/utils";
import { AdminCoursePackageDetails, coursePackageApi } from "@entities/coursePackage";
import { radioGroupValues } from "./constants";
import { $UpdateCoursePackageFormValidation, UpdateCoursePackageFormValidation } from "./types";
import { adaptUpdateCoursePackageForm, adaptUpdateCoursePackageFormRequest } from "./utils";
import useStyles from "./UpdateCoursePackageForm.styles";

export interface UpdateCoursePackageFormProps {
    data?: AdminCoursePackageDetails;
    onClose: () => void;
}

const UpdateCoursePackageForm = ({ data, onClose }: UpdateCoursePackageFormProps) => {
    const { classes } = useStyles();

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
                        <Flex mt={24} gap={32} align="center">
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
                            {/* TODO: - информации о последних изменениях на бэке пока нет (кто именно изменил автора) */}
                        </Flex>

                        <FFileInput name="cover" title="Изменить фото" type="image" withDeleteButton h={308} w="100%" maw={512} />

                        <Fieldset label="Общее" icon={<IconClipboardText />} maw={512} legendProps={{ mb: 24 }}>
                            <Flex direction="column" gap={8} w="100%">
                                <FInput name="name" label="Наименование" size="sm" w="100%" />
                                <FInput name="price" label="Стоимость пакета" type="number" size="sm" w="100%" maw={252} />
                            </Flex>
                        </Fieldset>

                        <Fieldset label="Описание пакетного предложения" icon={<AlignLeft />} maw={1162} legendProps={{ mb: 24 }}>
                            <Box w="100%">
                                <FTextEditor name="description" placeholder="Введите текст" h={320} />
                            </Box>
                        </Fieldset>

                        <Box component="fieldset" className={classes.fieldset}>
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
                                    <Flex gap={8}>
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
                                    </Flex>
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
    );
};

export default UpdateCoursePackageForm;
