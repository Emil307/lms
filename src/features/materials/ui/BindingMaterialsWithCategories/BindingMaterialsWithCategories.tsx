import React, { useEffect } from "react";
import { FormikConfig } from "formik";
import { Box, Flex } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { Checkbox, FCheckboxGroup, FControlButtons, Form, Loader } from "@shared/ui";
import { useAdminCategories } from "@entities/category";
import { getDataFromSessionStorage } from "@shared/utils";
import { CreateMaterialsDataForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import useStyles from "./BindingMaterialsWithCategories.styles";
import { initialParams } from "./constants";
import { $BindingMaterialsFormValidation, BindingMaterialsFormValidation } from "./types";

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
        ...initialParams,
    });

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const config: FormikConfig<BindingMaterialsFormValidation> = {
        initialValues: { categoryIds: sessionStorageData?.categoryIds || [] },
        validationSchema: $BindingMaterialsFormValidation,
        onSubmit: async (values) => {
            sessionStorage.setItem(MATERIALS_LOCAL_STORAGE_KEY, JSON.stringify({ ...sessionStorageData, ...values }));
            onClose();
        },
    };

    return (
        <Form config={config} disableOverlay>
            <Box className={classes.checkboxGroupWrapper}>
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
            <FControlButtons variant="modal" cancelButtonText="Отмена" onClose={onClose} />
        </Form>
    );
};

export default BindingMaterialsWithCategories;
