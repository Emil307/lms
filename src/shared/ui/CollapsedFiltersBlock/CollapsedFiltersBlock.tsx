import { Collapse, Flex, FlexProps } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { ToggleFilterButton } from "./components";
import { getCountAppliedFilters } from "./utils";
import useStyles from "./CollapsedFiltersBlock.styles";

export type CollapsedFiltersBlockProps<F> = Omit<FlexProps, "title" | "onSubmit" | "children"> & {
    title?: ReactNode;
    queryParams?: Partial<F>;
    initialValues?: Required<F>;
    isCollapsed?: boolean;
    children?: ReactNode; //| ((props: FormikProps<F>) => ReactNode);
};

/**
 * Компонент для обертки фильтров, чтобы получать свернутый вариант
 * @template F - Тип фильтра Formik.
 * @template Е - Тип object для передачи дополнительных параметров для запроса, не включаемые в фильтр Formik.
 */
const CollapsedFiltersBlock = <F,>({
    children,
    title,
    queryParams,
    isCollapsed,
    initialValues,
    ...props
}: CollapsedFiltersBlockProps<F>) => {
    const { classes } = useStyles();
    const [openedFilters, setOpenedFilters] = useState(false);

    useEffect(() => {
        setOpenedFilters(!isCollapsed);
    }, [isCollapsed]);

    const handleToggleVisibilityFilters = () => setOpenedFilters((prevState) => !prevState);

    return (
        <Flex className={classes.root} {...props}>
            {isCollapsed && (
                <ToggleFilterButton
                    isOpened={openedFilters}
                    onClick={handleToggleVisibilityFilters}
                    countAppliedFilters={getCountAppliedFilters(queryParams, initialValues)}>
                    {title}
                </ToggleFilterButton>
            )}

            <Collapse in={openedFilters} className={classes.inner}>
                {children}
            </Collapse>
        </Flex>
    );
};

export default CollapsedFiltersBlock;