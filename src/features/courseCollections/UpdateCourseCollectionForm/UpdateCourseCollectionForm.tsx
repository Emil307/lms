import { Box, Text, Flex, BoxProps, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle, AlignLeft, Type } from "react-feather";
import { Image as ImageIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Button, FInput, FSwitch, FTextarea, ManagedForm } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification, getIcon } from "@shared/utils";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { GetAdminCourseCollectionResponse, UpdateAdminCourseCollectionResponse, courseCollectionApi } from "@entities/courseCollection";
import { SelectIconModal } from "@features/externalIcons";
import { initialValues } from "./constants";
import useStyles from "./UpdateCourseCollectionForm.styles";
import { adaptUpdateCourseCollectionForm } from "./utils";
import { $UpdateCourseCollectionFormValidation, UpdateCourseCollectionFormValidation } from "./types";

export interface UpdateCourseCollectionFormProps extends BoxProps {
    data?: GetAdminCourseCollectionResponse;
    onClose: () => void;
}

const UpdateCourseCollectionForm = ({ data, onClose, ...props }: UpdateCourseCollectionFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const updateCourseCollection = (values: UpdateCourseCollectionFormValidation) => {
        return courseCollectionApi.updateAdminCourseCollection({ ...values, id: String(data?.id) });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        router.push({ pathname: "/admin/settings/course-collections/[id]", query: { id: String(data?.id) } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления подборки курсов",
        });
    };

    const renderIconError = (error?: string) =>
        error && (
            <Flex className={classes.wrapperIconError}>
                <AlertTriangle />
                <Text>{error}</Text>
            </Flex>
        );

    return (
        <Box {...props}>
            <ManagedForm<UpdateCourseCollectionFormValidation, UpdateAdminCourseCollectionResponse>
                initialValues={{ ...initialValues, ...adaptUpdateCourseCollectionForm(data) }}
                validationSchema={$UpdateCourseCollectionFormValidation}
                mutationKey={[MutationKeys.UPDATE_ADMIN_COURSE_COLLECTION, String(data?.id)]}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_ADMIN_COURSE_COLLECTIONS] },
                    { queryKey: [QueryKeys.GET_ADMIN_COURSE_COLLECTION, String(data?.id)] },
                ]}
                mutationFunction={updateCourseCollection}
                onSuccess={onSuccess}
                onError={onError}
                hasConfirmModal
                onCancel={onClose}>
                {({ dirty, values, errors, onCancel, setFieldValue }) => {
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
                            centered: true,
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
                                <Text color="gray45">Статус:</Text>
                                <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                            </Flex>

                            <Box>
                                <Flex className={classes.wrapperIcon} onClick={openSelectIconModal}>
                                    {icon}
                                    <Box className={classes.imageBack}>
                                        <ThemeIcon variant="outline" className={classes.control}>
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
                                    w="100%"
                                    description="до 120 символов"
                                    maw={772}
                                    sx={{
                                        textarea: {
                                            minHeight: 190,
                                        },
                                    }}
                                />
                            </Fieldset>

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

export default UpdateCourseCollectionForm;
