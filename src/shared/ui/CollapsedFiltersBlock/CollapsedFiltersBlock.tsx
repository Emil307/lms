import { Collapse, Flex, FlexProps } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { FormikProps, FormikValues } from "formik";
import { ToggleFilterButton } from "./components";
import { getCountAppliedFilters } from "./utils";
import useStyles from "./CollapsedFiltersBlock.styles";
import { Form, FormProps } from "../Forms";

export type CollapsedFiltersBlockProps<F extends FormikValues> = Omit<FlexProps, "title" | "onSubmit" | "onChange" | "children"> & {
    formProps: Pick<FormProps<F>, "config" | "disableOverlay" | "onSubmit" | "customRef">;
    titleOpened?: ReactNode;
    titleClosed?: ReactNode;
    queryParams?: Partial<F>;
    isCollapsed?: boolean;
    leftIcon?: ReactNode;
    children?: ReactNode | ((props: FormikProps<F>) => ReactNode);
};

const CollapsedFiltersBlock = <F extends FormikValues>({
    children,
    titleOpened = "Фильтр",
    titleClosed = "Фильтр",
    queryParams,
    formProps: { config, onSubmit = () => undefined, ...restFormProps },
    isCollapsed = false,
    leftIcon,
    ...props
}: CollapsedFiltersBlockProps<F>) => {
    const { classes } = useStyles();
    const [openedFilters, setOpenedFilters] = useState(false);
    const [submittedFormValues, setSubmittedFormValues] = useState<FormikValues>();

    useEffect(() => {
        setOpenedFilters(!isCollapsed);
    }, [isCollapsed]);

    const handleSubmitForm = (formikValues: FormikProps<F>["values"]) => {
        setSubmittedFormValues(formikValues);
        onSubmit(formikValues);
    };

    const handleToggleVisibilityFilters = () => setOpenedFilters((prevState) => !prevState);

    const handleResetForm = (formikContext: FormikProps<F>) => {
        formikContext.resetForm();
        // без таймаута форма не делает submit, так как resetForm не успевает очистить ошибки валидации формы
        setTimeout(() => {
            formikContext.submitForm();
        });
    };

    const countAppliedFilters = getCountAppliedFilters({
        initialValues: config.initialValues,
        currentValues: queryParams || submittedFormValues,
    });

    return (
        <Flex className={classes.root} {...props}>
            {isCollapsed && (
                <ToggleFilterButton
                    isOpened={openedFilters}
                    onClick={handleToggleVisibilityFilters}
                    countAppliedFilters={countAppliedFilters}
                    leftIcon={leftIcon}>
                    {openedFilters ? titleOpened : titleClosed}
                </ToggleFilterButton>
            )}

            <Collapse in={openedFilters} className={classes.inner}>
                <Form {...restFormProps} config={config} onSubmit={handleSubmitForm}>
                    {(formikContext) =>
                        typeof children === "function"
                            ? children({
                                  ...formikContext,
                                  dirty: formikContext.dirty || !!countAppliedFilters,
                                  handleReset: () => handleResetForm(formikContext),
                              })
                            : children
                    }
                </Form>
            </Collapse>
        </Flex>
    );
};

export default CollapsedFiltersBlock;
