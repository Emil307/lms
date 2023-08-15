import { ChevronDown, ChevronUp, Filter } from "react-feather";
import { Badge, Flex, ThemeIcon } from "@mantine/core";
import { Button, ButtonProps, Paragraph } from "@shared/ui";
import useStyles from "./ToggleFilterButton.styles";

export interface ToggleFilterButtonProps extends Omit<ButtonProps, "children"> {
    isOpened?: boolean;
    countAppliedQueries: number;
}

const ToggleFilterButton = ({ isOpened = false, countAppliedQueries, ...props }: ToggleFilterButtonProps) => {
    const { classes } = useStyles({ isOpened });

    const renderIconToggleButton = () => {
        return (
            <Flex className={classes.root}>
                {!!countAppliedQueries && (
                    <Badge variant="filled" color="done" px={12} py={4}>
                        <Paragraph variant="text-small-semi" color="white">
                            {countAppliedQueries}
                        </Paragraph>
                    </Badge>
                )}

                <ThemeIcon className={classes.iconToggle}>{isOpened ? <ChevronUp /> : <ChevronDown />}</ThemeIcon>
            </Flex>
        );
    };

    return (
        <Button
            variant="text"
            leftIcon={
                <ThemeIcon className={classes.wrapperLeftIcon}>
                    <Filter />
                </ThemeIcon>
            }
            rightIcon={renderIconToggleButton()}
            {...props}>
            Фильтр
        </Button>
    );
};

export default ToggleFilterButton;
