import { Box, BoxProps, Divider, Text } from "@mantine/core";
import { Fragment, memo, ReactNode, useMemo } from "react";
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
    ...props
}: FieldsetProps) {
    const { classes } = useStyles({ isOpen });

    const renderRows = useMemo(() => {
        if (Array.isArray(children)) {
            return children.map((child, index) => (
                <Fragment key={index}>
                    {child}
                    {showDivider && index !== children.length - 1 && <Divider size="xs" color="grayLight" w="100%" />}
                </Fragment>
            ));
        }

        return children;
    }, [children]);

    return (
        <Box {...props} component="fieldset" className={classes.fieldset}>
            <Box {...legendProps} component="legend" className={classes.legend}>
                {icon}
                <Text className={classes.title}>{label}</Text>
                {extraElement}
            </Box>
            {isOpen && renderRows}
        </Box>
    );
});

export default MemoizedFieldset;
