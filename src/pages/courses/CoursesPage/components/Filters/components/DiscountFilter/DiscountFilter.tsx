import { Box, Flex, FlexProps } from "@mantine/core";
import { useMemo } from "react";
import { useField } from "formik";
import { Paragraph } from "@shared/ui";
import useStyles from "./DiscountFilter.styles";

export interface DiscountFilter extends FlexProps {
    name: string;
}

const DiscountFilter = ({ name, onSubmit, ...props }: DiscountFilter) => {
    const [field, _meta, helpers] = useField(name);
    const isActive = Boolean(field.value);
    const { classes } = useStyles(isActive);

    const handleClick = () => {
        helpers.setValue(!field.value);
    };

    const renderItems = useMemo(() => {
        return (
            <Box {...props} className={classes.root} onClick={handleClick}>
                <Paragraph variant="text-small-b" className={classes.content}>
                    Курс со скидкой
                </Paragraph>
            </Box>
        );
    }, [field.value]);

    return <Flex {...props}>{renderItems}</Flex>;
};

export default DiscountFilter;
