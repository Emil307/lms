import { Box, BoxProps, Divider, Flex } from "@mantine/core";
import { Fragment, memo, ReactNode, useMemo } from "react";
import { Heading } from "@shared/ui";
import useStyles from "./Fieldset.styles";

export interface FieldsetProps extends BoxProps {
    icon?: ReactNode;
    label: string;
    extraElement?: ReactNode;
    isOpen?: boolean;
    showDivider?: boolean;
    legendProps?: BoxProps;
    children: ReactNode | ReactNode[];
}

const MemoizedFieldset = memo(function Fieldset({
    icon,
    label,
    showDivider = true,
    isOpen = true,
    extraElement,
    children,
    legendProps,
    className,
    ...props
}: FieldsetProps) {
    const { classes, cx } = useStyles({ isOpen });

    const renderRows = useMemo(() => {
        if (Array.isArray(children)) {
            return children.map((child, index) => {
                if (!child) {
                    return;
                }
                return (
                    <Fragment key={index}>
                        {child}
                        {showDivider && index !== children.length - 1 && <Divider size="xs" color="grayLight" w="100%" />}
                    </Fragment>
                );
            });
        }

        return children;
    }, [children]);

    return (
        <Box {...props} component="fieldset" className={cx(classes.fieldset, className)}>
            <Box component="legend">
                <Flex {...legendProps} className={classes.legendContent}>
                    {icon}
                    <Heading order={4}>{label}</Heading>
                    {extraElement}
                </Flex>
            </Box>
            {isOpen && renderRows}
        </Box>
    );
});

export default MemoizedFieldset;
