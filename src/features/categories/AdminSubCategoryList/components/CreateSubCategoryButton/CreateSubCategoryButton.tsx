import { PlusCircle } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { Button } from "@shared/ui";
import useStyles from "./CreateSubCategoryButton.styles";

export interface CreateSubCategoryButtonProps {
    isActiveCategory?: boolean;
    onClick?: () => void;
}

const CreateSubCategoryButton = ({ isActiveCategory, ...props }: CreateSubCategoryButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 744px)");

    if (!isActiveCategory) {
        return null;
    }

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} {...props}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} {...props}>
            Добавить подкатегорию
        </Button>
    );
};

export default CreateSubCategoryButton;
