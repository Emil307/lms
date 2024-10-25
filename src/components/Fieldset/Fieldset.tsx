import { Box, BoxProps, Divider, Flex } from "@mantine/core";
import { memo, ReactNode, useMemo } from "react";
import { Heading } from "@shared/ui";
import useStyles from "./Fieldset.styles";

export interface FieldsetProps extends BoxProps {
    icon?: ReactNode;
    label: string;
    extraElement?: ReactNode;
    isOpen?: boolean;
    gap?: number;
    showDivider?: boolean;
    legendProps?: BoxProps;
    children: ReactNode | ReactNode[];
}

const MemoizedFieldset = memo(function Fieldset({
    icon,
    label,
    showDivider = true,
    isOpen = true,
    gap = 16,
    extraElement,
    children,
    legendProps,
    className,
    ...props
}: FieldsetProps) {
    const { classes, cx } = useStyles({ isOpen });

    const renderRows = useMemo(() => {
        if (Array.isArray(children)) {
            return (
                <Flex direction="column" gap={!showDivider ? gap : 0}>
                    {children.map((child, index) => {
                        if (!child) {
                            return;
                        }
                        return (
                            <Box className={classes.item} key={index}>
                                {child}
                                {showDivider && index !== children.length - 1 && (
                                    <Divider size="xs" color="neutralGray200" w="100%" my={8} />
                                )}
                            </Box>
                        );
                    })}
                </Flex>
            );
        }

        return <Box className={classes.item}>{children}</Box>;
    }, [children]);

    return (
        <Flex {...props} className={cx(classes.root, className)}>
            <Flex {...legendProps} className={classes.headingContainer}>
                {icon}
                <Heading order={4}>{label}</Heading>
                {extraElement}
            </Flex>
            {isOpen && renderRows}
        </Flex>
    );
});

export default MemoizedFieldset;
