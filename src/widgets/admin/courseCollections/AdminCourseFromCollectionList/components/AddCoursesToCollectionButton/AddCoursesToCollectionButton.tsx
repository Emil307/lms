import { PlusCircle } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { Button } from "@shared/ui";
import useStyles from "./AddCoursesToCollectionButton.styles";

export interface AddCoursesToCollectionButtonProps {
    isActiveCategory?: boolean;
    onClick?: () => void;
}

const AddCoursesToCollectionButton = ({ isActiveCategory, ...props }: AddCoursesToCollectionButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 744px)");

    if (isTablet) {
        return (
            <ActionIcon className={classes.actionIcon} {...props}>
                <PlusCircle />
            </ActionIcon>
        );
    }

    return (
        <Button variant="text" leftIcon={<PlusCircle />} {...props}>
            Добавить курс
        </Button>
    );
};

export default AddCoursesToCollectionButton;
