import { PlusCircle } from "react-feather";
import { ActionIcon } from "@mantine/core";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";
import useStyles from "./AddCoursesToCollectionButton.styles";

export interface AddCoursesToCollectionButtonProps {
    isActiveCategory?: boolean;
    onClick?: () => void;
}

const AddCoursesToCollectionButton = ({ isActiveCategory, ...props }: AddCoursesToCollectionButtonProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

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
