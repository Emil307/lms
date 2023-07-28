import { Box, Flex, BoxProps, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle, AlignLeft, Type } from "react-feather";
import { Image as ImageIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { Button, FInput, FSwitch, FTextarea, ManagedForm, Paragraph } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification, getIcon } from "@shared/utils";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { CreateAdminCourseCollectionResponse, courseCollectionApi } from "@entities/courseCollection";
import { SelectIconModal } from "@features/externalIcons";
import { initialValues } from "./constants";
import { $CreateCourseCollectionFormValidation, CreateCourseCollectionFormValidation } from "./types";
import useStyles from "./CreateCourseCollectionForm.styles";

export interface CreateCourseCollectionFormProps extends BoxProps {
    onClose: () => void;
}

const CreateCourseCollectionForm = ({ onClose, ...props }: CreateCourseCollectionFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMediaQuery("(max-width: 576px)");

    const createCourseCollection = (values: CreateCourseCollectionFormValidation) => {
        return courseCollectionApi.createAdminCourseCollection(values);
    };

    const onSuccess = (response: CreateAdminCourseCollectionResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание подборки",
            message: "Подборка курсов успешно создана",
        });
        router.push({ pathname: "/admin/settings/course-collections/[id]", query: { id: response.id.toString() } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания подборки",
        });
    };

    const renderIconError = (error?: string) =>
        error && (
            <Flex className={classes.wrapperIconError}>
                <AlertTriangle />
                <Paragraph variant="text-smaller">{error}</Paragraph>
            </Flex>
        );

    return (
        <Box {...props}>
            <ManagedForm<CreateCourseCollectionFormValidation, CreateAdminCourseCollectionResponse>
                initialValues={initialValues}
                validationSchema={$CreateCourseCollectionFormValidation}
                mutationKey={[MutationKeys.CREATE_ADMIN_COURSE_COLLECTION]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_COURSE_COLLECTIONS] }]}
                mutationFunction={createCourseCollection}
                onSuccess={onSuccess}
                onError={onError}
                hasConfirmModal
                onCancel={onClose}>
                {({ dirty, values, onCancel, setFieldValue, errors }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    const icon = getIcon({ iconName: values.iconName });

                    const handleCloseSelectIconModal = () => closeModal("SELECT_ICON");

                    const handleSubmitSelectIconModal = (iconName?: string) => {
                        setFieldValue("iconName", iconName);
                        closeModal("SELECT_ICON");
                    };

                    const openSelectIconModal = () => {
                        openModal({
                            modalId: "SELECT_ICON",
                            title: "Изображение подборки",
                            children: (
                                <SelectIconModal
                                    initialSelectedIcon={values.iconName}
                                    onSubmit={handleSubmitSelectIconModal}
                                    onClose={handleCloseSelectIconModal}
                                />
                            ),
                            size: 912,
                        });
                    };

                    return (
                        <Flex direction="column" gap={32}>
                            <Flex gap={8} align="center">
                                <Paragraph variant="text-small-m" color="gray45">
                                    Статус:
                                </Paragraph>
                                <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                            </Flex>
                            <Box>
                                <Flex className={classes.wrapperIcon} onClick={openSelectIconModal}>
                                    {icon}
                                    <Box className={classes.imageBack}>
                                        <ThemeIcon className={classes.control}>
                                            <ImageIcon />
                                        </ThemeIcon>
                                    </Box>
                                </Flex>
                                {renderIconError(errors.iconName)}
                            </Box>
                            <Fieldset label="Заголовок" icon={<Type />} maw={512} legendProps={{ mb: 24 }}>
                                <FInput name="name" label="Название подборки" size="sm" w="100%" />
                            </Fieldset>
                            <Fieldset label="Краткое описание" icon={<AlignLeft />} maw={772} legendProps={{ mb: 24 }}>
                                <FTextarea
                                    name="description"
                                    placeholder="Введите текст"
                                    description="до 120 символов"
                                    className={classes.descriptionTextarea}
                                />
                            </Fieldset>
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

export default CreateCourseCollectionForm;
