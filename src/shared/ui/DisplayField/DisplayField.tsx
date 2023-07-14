import { Flex } from "@mantine/core";
import { memo, ReactNode, useMemo } from "react";
import useStyles from "./DisplayField.styles";
import { Paragraph } from "../Typography";

export interface DisplayFieldProps {
    variant?: "compact" | "default"; //label над значением или на одном уровне
    label: string; // Описание
    value?: string | null; //Значение
    render?: (value: string) => ReactNode; //На случай если нужно отредерить что-то своё.
    defaultValue?: string;
}

const MemoizedDisplayField = memo(function DisplayField({
    variant = "default",
    defaultValue = "-",
    label,
    value,
    render,
}: DisplayFieldProps) {
    const { classes } = useStyles({ variant });

    const renderValue = useMemo(() => {
        if (render) {
            return render(value || defaultValue);
        }
        return (
            <Paragraph variant="small-semi" ta="end">
                {value || defaultValue}
            </Paragraph>
        );
    }, [render, value, defaultValue]);

    const renderLabel = () => {
        if (variant === "compact") {
            return (
                <Paragraph variant="text-caption" color="gray45" align="start">
                    {label}
                </Paragraph>
            );
        }
        return (
            <Paragraph variant="small-m" color="gray45" align="start">
                {label}
            </Paragraph>
        );
    };

    return (
        <Flex className={classes.root}>
            {renderLabel()}
            {renderValue}
        </Flex>
    );
});

export default MemoizedDisplayField;
