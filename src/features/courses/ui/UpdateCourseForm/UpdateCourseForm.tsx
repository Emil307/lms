import { Box, Flex } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { FormikProps } from "formik";
import { AlignLeft as AlignLeftIcon, Percent as PercentIcon, Users as UsersIcon } from "react-feather";
import IconBurger from "@public/icons/burger.svg";
import {
    FCheckbox,
    FControlButtons,
    FDateRangePicker,
    FFileInput,
    FInput,
    FMultiSelect,
    FRadioGroup,
    FSelect,
    FSwitch,
    FTextarea,
    FTextEditor,
    Heading,
    Input,
    ManagedForm,
    Paragraph,
    prepareOptionsForSelect,
    Radio,
} from "@shared/ui";
import { EntityNames, FilterTypes, MutationKeys } from "@shared/constant";
import {
    $UpdateCourseFormValues,
    AdminCourse,
    courseApi,
    UpdateCourseFormValues,
    UpdateCourseResponse,
    useAdminCourseResources,
} from "@entities/course";
import { Fieldset } from "@components/Fieldset";
import { createNotification, getDiscountPrice, ToastType } from "@shared/utils";
import { useAdminSubCategories } from "@entities/category";
import FileLeftIcon from "public/icons/file-left.svg";
import UserLeftIcon from "public/icons/user-left.svg";
import { adaptDataForUpdateCourseForm, adaptUpdateCourseRequest } from "./utils";
import { initialParams, radioGroupValues } from "./constants";
import useStyles from "./UpdateCourseForm.styles";

export interface UpdateCourseFormProps {
    data: AdminCourse;
    onSuccess: () => void;
    onCancel: () => void;
}

const UpdateCourseForm = ({ data, onSuccess, onCancel }: UpdateCourseFormProps) => {
    const { classes } = useStyles();
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(String(data.category?.id || ""));
    const { data: coursesResources, isLoading: isLoadingResources } = useAdminCourseResources({ type: FilterTypes.MANIPULATION });
    const { data: subCategoriesResource, isLoading: isLoadingSubCategories } = useAdminSubCategories({
        ...initialParams,
        filter: { parentId: selectedCategory },
    });

    const updateCourse = (values: UpdateCourseFormValues) => {
        return courseApi.updateCourse(adaptUpdateCourseRequest(String(data.id), values));
    };

    const onChangeFormValues = ({ setFieldValue, values }: FormikProps<UpdateCourseFormValues>) => {
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

    const onSuccessUpdate = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Редактирование Курса",
            message: "Курс успешно изменен",
        });
        onSuccess();
    };

    return (
        <Box mt={24}>
            <ManagedForm<UpdateCourseFormValues, UpdateCourseResponse>
                onChange={onChangeFormValues}
                initialValues={adaptDataForUpdateCourseForm(data)}
                validationSchema={$UpdateCourseFormValues}
                mutationKey={[MutationKeys.UPDATE_COURSE]}
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.COURSE }}
                mutationFunction={updateCourse}
                onSuccess={onSuccessUpdate}
                onCancel={onCancel}
                validateOnChange={false}>
                {({ values, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <Flex gap={32} direction="column">
                            <Flex className={classes.wrapper}>
                                <Flex className={classes.item}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        Статус:
                                    </Paragraph>
                                    <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                                </Flex>
                                <Flex className={classes.item}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        Тип курса:
                                    </Paragraph>
                                    <FCheckbox name="isInteractive" label="Интерактивный" />
                                </Flex>
                                <Flex className={classes.item}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        Отображать в популярных:
                                    </Paragraph>
                                    <FCheckbox name="isPopular" label="Да" />
                                </Flex>
                            </Flex>

                            <Heading order={2}>Настройки курса</Heading>

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

                            <Fieldset label="Общая информация" icon={<FileLeftIcon />} maw={512} gap={8} showDivider={false}>
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
                                <FInput size="sm" name="duration" label="Продолжительность курса" w="100%" />
                                <FInput className={classes.costInput} name="price" label="Стоимость курса (₽)" type="number" size="sm" />
                            </Fieldset>

                            <Fieldset label="Краткое описание курса" icon={<IconBurger width={24} />} maw={772} showDivider={false}>
                                <FTextarea name="shortDescription" placeholder="Краткое Описание курса" minRows={9} />
                            </Fieldset>

                            <Fieldset label="Описание курса" icon={<AlignLeftIcon />} maw={1320} showDivider={false}>
                                <FTextEditor name="description" contentHeight={320} w="100%" />
                            </Fieldset>

                            <Fieldset
                                label="Скидка на курс"
                                icon={<PercentIcon />}
                                showDivider={false}
                                extraElement={<FSwitch name="hasDiscount" variant="secondary" disabled={!Number(values.price)} />}
                                isOpen={values.hasDiscount && !!values.price}
                                legendProps={{ mb: values.hasDiscount ? 24 : 0 }}
                                maw={772}>
                                <FRadioGroup name="discount.type" className={classes.discountRadio}>
                                    {radioGroupValues.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                    })}
                                </FRadioGroup>
                                <Flex className={classes.discount}>
                                    <FInput
                                        className={classes.discountItem}
                                        name="discount.amount"
                                        label="Размер скидки"
                                        type="number"
                                        size="sm"
                                    />
                                    <FDateRangePicker
                                        className={classes.discountItem}
                                        name="discount.startingDate"
                                        nameTo="discount.finishingDate"
                                        label="Период действия"
                                        size="sm"
                                    />
                                    <Input
                                        className={classes.discountItem}
                                        label="Стоимость со скидкой (₽)"
                                        value={getDiscountPrice({
                                            price: Number(values.price),
                                            amountDiscount: Number(values.discount.amount),
                                            type: values.discount.type,
                                        })}
                                        size="sm"
                                        disabled
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
                            <FControlButtons onClose={onCancel} />
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateCourseForm;
