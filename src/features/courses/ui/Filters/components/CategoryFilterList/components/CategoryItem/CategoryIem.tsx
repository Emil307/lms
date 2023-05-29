import { Text, Box, BoxProps } from "@mantine/core";
import { CourseCategory } from "@entities/course";
import useStyles from "./CategoryItem.styles";

export interface CategoryItemProps extends BoxProps {
    data: CourseCategory;
    isActive: boolean;
    onClick: (categoryId: number) => void;
}

const CategoryItem = ({ data, isActive, onClick, ...props }: CategoryItemProps) => {
    const { classes } = useStyles({ isActive });

    const handleClick = () => onClick(data.id);

    return (
        <Box {...props} className={classes.root} onClick={handleClick}>
            <Text className={classes.content} lineClamp={1}>
                {data.name}
            </Text>
        </Box>
    );
};

export default CategoryItem;
