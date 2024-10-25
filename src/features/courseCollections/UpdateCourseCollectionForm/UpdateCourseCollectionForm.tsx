import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { AlignLeft, Type } from "react-feather";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { FControlButtons, FFileInput, FInput, FSwitch, FTextarea, LastUpdatedInfo, ManagedForm, Paragraph } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification } from "@shared/utils";
import { EntityNames, MutationKeys } from "@shared/constant";
import { GetAdminCourseCollectionResponse, UpdateAdminCourseCollectionResponse, courseCollectionApi } from "@entities/courseCollection";
import { initialValues } from "./constants";
import { adaptUpdateCourseCollectionForm } from "./utils";
import { $UpdateCourseCollectionFormValidation, UpdateCourseCollectionFormValidation } from "./types";
import useStyles from "./UpdateCourseCollectionForm.styles";

export interface UpdateCourseCollectionFormProps extends BoxProps {
    data?: GetAdminCourseCollectionResponse;
    onClose: () => void;
}

const UpdateCourseCollectionForm = ({ data, onClose, ...props }: UpdateCourseCollectionFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const updateCourseCollection = (values: UpdateCourseCollectionFormValidation) => {
        const adaptedValues = {
            ...adaptUpdateCourseCollectionForm(String(data?.id), values),
        };
        return courseCollectionApi.updateAdminCourseCollection(adaptedValues);
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

    return (
        <Box {...props}>
            <ManagedForm<UpdateCourseCollectionFormValidation, UpdateAdminCourseCollectionResponse>
                initialValues={{
                    ...initialValues,
                    ...adaptUpdateCourseCollectionForm(String(data?.id), data),
                }}
                validationSchema={$UpdateCourseCollectionFormValidation}
                mutationKey={[MutationKeys.UPDATE_ADMIN_COURSE_COLLECTION, String(data?.id)]}
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.COURSE_COLLECTION }}
                mutationFunction={updateCourseCollection}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}>
                {({ values, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";

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
                                <LastUpdatedInfo data={data?.lastUpdated} />
                            </Flex>
                            <Box className={classes.imageInputWrapper}>
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
                            <FControlButtons onClose={onCancel} />
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateCourseCollectionForm;
