import { Box, BoxProps, Checkbox as MCheckbox, CheckboxProps as MCheckboxProps, Flex } from "@mantine/core";
import { memo, useCallback, useMemo } from "react";
import { AlertTriangle, Check } from "react-feather";
import { Paragraph } from "@shared/ui";
import useStyles from "./Checkbox.styles";

export interface CheckboxProps extends MCheckboxProps {
    wrapperProps?: Omit<BoxProps, "children">;
}

const MemoizedCheckbox = memo(function Checkbox({ error, wrapperProps, ...props }: CheckboxProps) {
    const { classes } = useStyles();

    const getIcon = useCallback(() => <Check />, []);

    const renderError = useMemo(
        () =>
            error && (
                <Flex className={classes.error}>
                    <AlertTriangle />
                    <Paragraph variant="text-smaller">{error}</Paragraph>
                </Flex>
            ),
        [error]
    );

    return (
        <Box {...wrapperProps}>
            <MCheckbox {...props} classNames={classes} icon={getIcon} />
            {renderError}
        </Box>
    );
});

export default MemoizedCheckbox;
