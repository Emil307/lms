import { ChevronDown, ChevronUp, Filter } from "react-feather";
import { Badge, Flex, ThemeIcon } from "@mantine/core";
import { Button, ButtonProps, Paragraph } from "@shared/ui";
import useStyles from "./ToggleFilterButton.styles";

export interface ToggleFilterButtonProps extends ButtonProps {
    isOpened?: boolean;
    countAppliedFilters: number;
}

const ToggleFilterButton = ({
    isOpened = false,
    countAppliedFilters,
    children,
    leftIcon = <Filter />,
    ...props
}: ToggleFilterButtonProps) => {
    const { classes } = useStyles({ isOpened });

    const renderIconToggleButton = () => {
        return (
            <Flex align="center" gap={8}>
                {!!countAppliedFilters && (
                    <Badge variant="filled" color="secondary" px={12} py={4}>
                        <Paragraph variant="text-small-semi" color="neutralWhite">
                            {countAppliedFilters}
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
            leftIcon={leftIcon && <ThemeIcon className={classes.wrapperLeftIcon}>{leftIcon}</ThemeIcon>}
            rightIcon={renderIconToggleButton()}
            {...props}>
            {children}
        </Button>
    );
};

export default ToggleFilterButton;
