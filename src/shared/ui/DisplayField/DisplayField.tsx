import { Group, Text } from "@mantine/core";
import { memo, ReactNode, useMemo } from "react";
import useStyles from "./DisplayField.styles";

export interface DisplayFieldProps {
    variant?: "compact" | "default"; //label над значением или на одном уровне
    label: string; // Описание
    value?: string; //Значение
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
            return render(value ?? defaultValue);
        }
        return <Text className={classes.value}>{value ?? defaultValue}</Text>;
    }, [render, value, defaultValue]);

    return (
        <Group className={classes.root}>
            <Text className={classes.label}>{label}</Text>
            {renderValue}
        </Group>
    );
});

export default MemoizedDisplayField;
