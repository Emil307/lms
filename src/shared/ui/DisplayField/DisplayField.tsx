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
    textAlign?: "start" | "end";
}

const MemoizedDisplayField = memo(function DisplayField({
    variant = "default",
    defaultValue = "-",
    textAlign = "end",
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
            <Paragraph variant="small-semi" ta={textAlign}>
                {value || defaultValue}
            </Paragraph>
        );
    }, [render, value, defaultValue]);

    const renderLabel = () => {
        if (variant === "compact") {
            return (
                <Paragraph variant="text-caption" className={classes.label}>
                    {label}
                </Paragraph>
            );
        }
        return (
            <Paragraph variant="small-m" className={classes.label}>
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
