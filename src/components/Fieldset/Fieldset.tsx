import { Box, BoxProps, Divider, Text } from "@mantine/core";
import { memo, ReactNode, useMemo } from "react";
import useStyles from "./Fieldset.styles";

export interface FieldsetProps extends BoxProps {
    icon?: ReactNode;
    label: string;
    children: ReactNode | ReactNode[];
}

const MemoizedFieldset = memo(function Fieldset({ icon, label, children, ...props }: FieldsetProps) {
    const { classes } = useStyles();

    const renderRows = useMemo(() => {
        if (Array.isArray(children)) {
            return children.map((child, index) => (
                <>
                    {child}
                    {index !== children.length - 1 && <Divider size="xs" color="grayLight" w="100%" />}
                </>
            ));
        }

        return children;
    }, [children]);

    return (
        <Box {...props} component="fieldset" className={classes.fieldset}>
            <Box component="legend" className={classes.legend}>
                {icon}
                <Text className={classes.title}>{label}</Text>
            </Box>
            {renderRows}
        </Box>
    );
});

export default MemoizedFieldset;
