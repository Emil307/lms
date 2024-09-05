import { Flex, FlexProps } from "@mantine/core";
import { useMemo } from "react";
import { useField } from "formik";
import { CourseCategory } from "@entities/course";
import { CategoryItem } from "./components";
import useStyles from "./CategoryFilterList.styles";

export interface CategoryFilterListProps extends FlexProps {
    name: string;
    data?: CourseCategory[];
    onSubmit?: () => void;
}

const CategoryFilterList = ({ data, name, onSubmit, ...props }: CategoryFilterListProps) => {
    const { classes } = useStyles();
    const [field, _meta, helpers] = useField(name);

    const handleSelectCategory = (id: number) => {
        if (!id) {
            helpers.setValue(null);
            return onSubmit?.();
        }

        if (field.value === id) {
            helpers.setValue(null);
        } else {
            helpers.setValue(String(id));
        }

        onSubmit?.();
    };

    const renderItems = useMemo(
        () =>
            data?.map((category) => {
                const isActive = field.value === category.id.toString();
                return (
                    <CategoryItem key={category.id} data={category} isActive={isActive} onClick={() => handleSelectCategory(category.id)} />
                );
            }),
        [data, field.value]
    );

    if (!data?.length) {
        return null;
    }

    return (
        <Flex {...props} className={classes.root}>
            {renderItems}
        </Flex>
    );
};

export default CategoryFilterList;
