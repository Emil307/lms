import { Box, Flex, Grid, Text, Title } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { FormikProps } from "formik";
import { AlignLeft as AlignLeftIcon, Percent as PercentIcon, Users as UsersIcon } from "react-feather";
import {
    Button,
    FCheckbox,
    FDateRangePicker,
    FFileInput,
    FInput,
    FMultiSelect,
    FRadioGroup,
    FSelect,
    FSwitch,
    FTextarea,
    Input,
    ManagedForm,
    prepareOptionsForSelect,
    Radio,
} from "@shared/ui";
import { MutationKeys, QueryKeys } from "@shared/constant";
import {
    $CreateCourseFormValues,
    courseApi,
    CreateCourseFormValues,
    CreateCourseResponse,
    useAdminCourseResources,
} from "@entities/course";
import { Fieldset } from "@components/Fieldset";
import { createNotification, getDiscountPrice, ToastType } from "@shared/utils";
import { useAdminSubCategories } from "@entities/category";
import FileLeftIcon from "public/icons/file-left.svg";
import UserLeftIcon from "public/icons/user-left.svg";
import { adaptCreateCourseRequest } from "./utils";
import { initialParams, initialValues, radioGroupValues } from "./constants";

export interface CreateCourseFormProps {
    onSuccess: (newCourseId: number) => void;
    onCancel: () => void;
}

const CreateCourseForm = ({ onSuccess, onCancel }: CreateCourseFormProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const { data: coursesResources, isLoading: isLoadingResources } = useAdminCourseResources();
    const { data: subCategoriesResource, isLoading: isLoadingSubCategories } = useAdminSubCategories({
        ...initialParams,
        filter: { parentId: selectedCategory },
    });

    const createCourse = (values: CreateCourseFormValues) => {
        return courseApi.createCourse(adaptCreateCourseRequest(values));
    };

    const onChangeFormValues = ({ setFieldValue, values }: FormikProps<CreateCourseFormValues>) => {
        if (Number(values.price) === 0 && values.hasDiscount) {
            setFieldValue("hasDiscount", false);
        }
        if (selectedCategory !== values.category) {
            setFieldValue("subCategory", "");
            setSelectedCategory(values.category);
        }
    };

    const optionsForSelects = useMemo(() => {
        const categories = prepareOptionsForSelect({
            data: coursesResources?.categories,
            value: "id",
            label: "name",
            isActive: "isActive",
        });
        const subCategories = prepareOptionsForSelect({
            data: subCategoriesResource,
            value: "id",
            label: "name",
            isActive: "isActive",
        });
        const tags = prepareOptionsForSelect({
            data: coursesResources?.tags,
            value: "id",
            label: "name",
        });
        const teacherIds = prepareOptionsForSelect({
            data: coursesResources?.teachers,
            value: "id",
            label: (data) => `${data.profile?.lastName} ${data.profile?.firstName}`,
        });
        const authorIds = prepareOptionsForSelect({
            data: coursesResources?.authors,
            value: "id",
            label: (data) => `${data.lastName} ${data.firstName}`,
        });

        return { categories, subCategories, tags, teacherIds, authorIds };
    }, [coursesResources, subCategoriesResource]);

    const onSuccessCreate = (response: CreateCourseResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание Курса",
            message: "Курс успешно создан",
        });
        onSuccess(response.id);
    };

    return (
        <Box mt={24}>
            <ManagedForm<CreateCourseFormValues, CreateCourseResponse>
                onChange={onChangeFormValues}
                initialValues={initialValues}
                validationSchema={$CreateCourseFormValues}
                mutationKey={[MutationKeys.CREATE_COURSE]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_COURSES] }]}
                mutationFunction={createCourse}
                onSuccess={onSuccessCreate}
                hasConfirmModal
                validateOnChange={false}>
                {({ values, dirty }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <Flex gap={32} direction="column">
                            <Flex align="center" gap={32}>
                                <Flex gap={8} align="center">
                                    <Text color="gray45">Статус:</Text>
                                    <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                                </Flex>
                                <Flex gap={8} align="center">
                                    <Text color="gray45">Тип курса:</Text>
                                    <FCheckbox name="isInteractive" label="Интерактивный" />
                                </Flex>
                                <Flex gap={8} align="center">
                                    <Text color="gray45">Отображать в популярных:</Text>
                                    <FCheckbox name="isPopular" label="Да" />
                                </Flex>
                            </Flex>

                            <Title order={2}>Настройки курса</Title>
                            <FFileInput name="cover" title="Изменить фото" type="image" withDeleteButton h={308} w="100%" maw={512} />

                            <Fieldset label="Общая информация" icon={<FileLeftIcon />} maw={512} showDivider={false}>
                                <FInput size="sm" name="name" label="Название курса" w="100%" />
                                <FSelect
                                    name="category"
                                    size="sm"
                                    data={optionsForSelects.categories}
                                    clearable
                                    label="Категория"
                                    disabled={isLoadingResources || !optionsForSelects.categories.length}
                                    w="100%"
                                />
                                <FSelect
                                    name="subCategory"
                                    size="sm"
                                    data={optionsForSelects.subCategories}
                                    clearable
                                    label="Тематика (подкатегория)"
                                    disabled={isLoadingSubCategories || !optionsForSelects.subCategories.length}
                                    w="100%"
                                />
                                <FMultiSelect
                                    name="tagIds"
                                    size="sm"
                                    data={optionsForSelects.tags}
                                    clearable
                                    label="Теги"
                                    disabled={isLoadingResources || !optionsForSelects.tags.length}
                                    w="100%"
                                />
                                <Grid grow gutter={21} align="center">
                                    <Grid.Col span={1}>
                                        <FInput name="price" label="Стоимость курса (₽)" type="number" size="sm" w={252} />
                                    </Grid.Col>
                                    <Grid.Col span={1}>
                                        <FSwitch
                                            name="isDemonstrative"
                                            label="Доступен для сотрудников"
                                            labelPosition="left"
                                            variant="secondary"
                                        />
                                    </Grid.Col>
                                </Grid>
                            </Fieldset>

                            <Fieldset label="Описание курса" icon={<AlignLeftIcon />} maw={772} showDivider={false}>
                                <FTextarea name="description" placeholder="Описание курса" w="100%" />
                            </Fieldset>

                            <Fieldset
                                label="Скидка на курс"
                                icon={<PercentIcon />}
                                showDivider={false}
                                extraElement={<FSwitch name="hasDiscount" variant="secondary" disabled={!Number(values.price)} />}
                                isOpen={values.hasDiscount && !!values.price}
                                maw={772}>
                                <FRadioGroup name="discount.type">
                                    {radioGroupValues.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                    })}
                                </FRadioGroup>
                                <Flex gap={8} w="100%" mt={8}>
                                    <FInput name="discount.amount" label="Размер скидки" size="sm" type="number" maw={252} w="100%" />
                                    <FDateRangePicker
                                        name="discount.startingDate"
                                        nameTo="discount.finishingDate"
                                        label="Период действия"
                                        size="sm"
                                        maw={252}
                                        w="100%"
                                    />
                                    <Input
                                        label="Стоимость со скидкой"
                                        value={getDiscountPrice({
                                            price: Number(values.price),
                                            amountDiscount: Number(values.discount.amount),
                                            type: values.discount.type,
                                        })}
                                        size="sm"
                                        disabled
                                        maw={252}
                                        w="100%"
                                    />
                                </Flex>
                            </Fieldset>

                            <Fieldset
                                label="Преподаватели курса"
                                icon={<UsersIcon />}
                                extraElement={<FSwitch name="hasTeachers" variant="secondary" disabled={isLoadingResources} />}
                                isOpen={values.hasTeachers}
                                maw={772}
                                legendProps={{ mb: values.hasTeachers ? 24 : 0 }}>
                                <FMultiSelect
                                    name="teacherIds"
                                    size="sm"
                                    data={optionsForSelects.teacherIds}
                                    clearable
                                    label="Закрепленные преподаватели"
                                    disabled={isLoadingResources || !optionsForSelects.teacherIds.length}
                                    w="100%"
                                />
                            </Fieldset>

                            <Fieldset
                                label="Авторы курса"
                                icon={<UserLeftIcon />}
                                extraElement={<FSwitch name="hasAuthors" variant="secondary" disabled={isLoadingResources} />}
                                isOpen={values.hasAuthors}
                                maw={772}
                                legendProps={{ mb: values.hasAuthors ? 24 : 0 }}>
                                <FMultiSelect
                                    name="authorIds"
                                    size="sm"
                                    data={optionsForSelects.authorIds}
                                    clearable
                                    label="Найти авторов"
                                    disabled={isLoadingResources || !optionsForSelects.authorIds.length}
                                    w="100%"
                                />
                            </Fieldset>

                            <Flex gap={8} mt={24}>
                                <Button variant="border" onClick={onCancel} maw={252} w="100%">
                                    Отменить
                                </Button>
                                <Button variant="secondary" type="submit" disabled={!dirty} maw={252} w="100%">
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

export default CreateCourseForm;
