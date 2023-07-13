import { Flex, FlexProps } from "@mantine/core";
import { useMemo } from "react";
import { useField } from "formik";
import { CourseCategory } from "@entities/course";
import { CategoryItem } from "./components";
import useStyles from "./CategoryFilterList.styles";
import { categoryAll } from "./constants";

export interface CategoryFilterListProps extends FlexProps {
    name: string;
    data?: CourseCategory[];
}

const CategoryFilterList = ({ data, name, ...props }: CategoryFilterListProps) => {
    const { classes } = useStyles();
    const [field, _meta, helpers] = useField(name);

    const handleSelectCategory = (id: number) => {
        if (!id) {
            return helpers.setValue("");
        }
        helpers.setValue(String(id));
    };

    const renderItems = useMemo(
        () =>
            data?.map((category) => {
                const isActive = field.value === category.id.toString();
                return <CategoryItem key={category.id} data={category} isActive={isActive} onClick={handleSelectCategory} />;
            }),
        [data, field.value]
    );

    if (!data?.length) {
        return null;
    }

    return (
        <Flex {...props} className={classes.root}>
            <CategoryItem key={categoryAll.id} data={categoryAll} isActive={!field.value} onClick={handleSelectCategory} />
            {renderItems}
        </Flex>
    );
};

export default CategoryFilterList;
