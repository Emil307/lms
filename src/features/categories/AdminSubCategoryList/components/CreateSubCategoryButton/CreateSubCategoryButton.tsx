import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { Button } from "@shared/ui";
import useStyles from "./CreateSubCategoryButton.styles";
import { useMedia } from "@shared/utils";

export interface CreateSubCategoryButtonProps {
    isActiveCategory?: boolean;
    onClick?: () => void;
}

const CreateSubCategoryButton = ({ isActiveCategory, ...props }: CreateSubCategoryButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

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
