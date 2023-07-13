import { Box, BoxProps } from "@mantine/core";
import { CourseCategory } from "@entities/course";
import { Paragraph } from "@shared/ui";
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
            <Paragraph variant="text-small-semi" className={classes.content}>
                {data.name}
            </Paragraph>
        </Box>
    );
};

export default CategoryItem;
