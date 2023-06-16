import React, { useEffect } from "react";
import { FormikConfig } from "formik";
import { Box, Flex } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { Button, Checkbox, FCheckboxGroup, Form, Loader } from "@shared/ui";
import { useAdminCategories } from "@entities/category";
import { getDataFromSessionStorage } from "@shared/utils";
import { CreateMaterialsDataForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import useStyles from "./BindingMaterialsWithCategories.styles";
import { INITIAL_CATEGORIES_FILTER } from "./constants";
import { $bindingMaterialsFormValidationSchema, BindingMaterialsFormValidationSchema } from "./types";

export interface BindingMaterialsWithCategoriesProps {
    onClose: () => void;
}

const BindingMaterialsWithCategories = ({ onClose }: BindingMaterialsWithCategoriesProps) => {
    const { classes } = useStyles();

    const sessionStorageData = getDataFromSessionStorage<CreateMaterialsDataForm>(MATERIALS_LOCAL_STORAGE_KEY);

    const {
        data: categoriesData,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useAdminCategories({
        ...INITIAL_CATEGORIES_FILTER,
    });

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const config: FormikConfig<BindingMaterialsFormValidationSchema> = {
        initialValues: { categoryIds: sessionStorageData?.categoryIds || [] },
        validationSchema: $bindingMaterialsFormValidationSchema,
        onSubmit: async (values) => {
            sessionStorage.setItem(MATERIALS_LOCAL_STORAGE_KEY, JSON.stringify({ ...sessionStorageData, ...values }));
            onClose();
        },
    };

    return (
        <Form config={config} disableOverlay>
            <Box h={472} mb={16} sx={{ overflow: "auto" }}>
                <FCheckboxGroup name="categoryIds">
                    <Flex direction="column" w="100%" gap={8}>
                        {categoriesData?.data.map((item) => (
                            <Box key={item.id} ref={lastElemRef} className={classes.categoryItem}>
                                <Checkbox value={String(item.id)} label={item.name} />
                            </Box>
                        ))}
                        {isFetching && <Loader sx={{ alignSelf: "center" }} />}
                    </Flex>
                </FCheckboxGroup>
            </Box>
            <Flex gap={8}>
                <Button type="button" size="large" variant="border" onClick={onClose} w="100%">
                    Отмена
                </Button>
                <Button type="submit" size="large" variant="secondary" w="100%">
                    Сохранить
                </Button>
            </Flex>
        </Form>
    );
};

export default BindingMaterialsWithCategories;
