import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { AlignLeft, Type } from "react-feather";
import { useRouter } from "next/router";
import { FControlButtons, FFileInput, FInput, FSwitch, FTextarea, ManagedForm, Paragraph } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification } from "@shared/utils";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { CreateAdminCourseCollectionResponse, courseCollectionApi } from "@entities/courseCollection";
import { adaptCreateCoursCollectionFormRequest } from "@features/courseCollections/CreateCourseCollectionForm/utils";
import { initialValues } from "./constants";
import { $CreateCourseCollectionFormValidation, CreateCourseCollectionFormValidation } from "./types";
import useStyles from "./CreateCourseCollectionForm.styles";

export interface CreateCourseCollectionFormProps extends BoxProps {
    onClose: () => void;
}

const CreateCourseCollectionForm = ({ onClose, ...props }: CreateCourseCollectionFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const createCourseCollection = (values: CreateCourseCollectionFormValidation) => {
        return courseCollectionApi.createAdminCourseCollection(adaptCreateCoursCollectionFormRequest(values));
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

    return (
        <Box {...props}>
            <ManagedForm<CreateCourseCollectionFormValidation, CreateAdminCourseCollectionResponse>
                initialValues={initialValues}
                validationSchema={$CreateCourseCollectionFormValidation}
                mutationKey={[MutationKeys.CREATE_ADMIN_COURSE_COLLECTION]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_COURSE_COLLECTIONS] }]}
                mutationFunction={createCourseCollection}
                onSuccess={onSuccess}
                onError={onError}>
                {({ values }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";

                    return (
                        <Flex direction="column" gap={32}>
                            <Flex gap={8} align="center">
                                <Paragraph variant="text-small-m" color="gray45">
                                    Статус:
                                </Paragraph>
                                <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                            </Flex>
                            <Box>
                                <FFileInput
                                    className={classes.imageInput}
                                    name="cover"
                                    title="Изменить фото"
                                    type="image"
                                    fileFormats={["png", "gif", "jpeg", "jpg", "svg", "webp"]}
                                    withDeleteButton
                                    description="До 1Mb"
                                />
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
                            <FControlButtons onClose={onClose} />
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default CreateCourseCollectionForm;
