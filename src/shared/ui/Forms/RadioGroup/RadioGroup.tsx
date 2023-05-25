import React, { useMemo } from "react";
import { Group, Radio as MRadio, RadioGroupProps as MRadioGroupProps, Text, useMantineTheme } from "@mantine/core";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { z } from "zod";
import { useRadioGroupStyles } from "./FRadioGroupStyles";

export interface RadioGroupProps extends MRadioGroupProps {
    success?: string;
}

export const RadioGroup = ({ children, error, success, description, spacing = 16, ...props }: RadioGroupProps) => {
    const theme = useMantineTheme();
    const { classes } = useRadioGroupStyles();
    const statusSuccess = useMemo(() => !!props.value?.length && !error && !!success, [props.value, error, success]);

    const renderError = useMemo(
        () =>
            error && (
                <>
                    <AlertTriangle />
                    <Text>{error}</Text>
                </>
            ),
        [error]
    );

    const renderDescription = useMemo(() => {
        if (!description && !(success && statusSuccess)) {
            return;
        }

        return (
            <>
                {statusSuccess && !z.boolean().safeParse(success).success && (
                    <Group>
                        <CheckCircle color={theme.colors.done[0]} />
                        <Text>{success}</Text>
                    </Group>
                )}
                {description && (
                    <Group>
                        <Info color={theme.colors.primaryHover[0]} />
                        <Text>{description}</Text>
                    </Group>
                )}
            </>
        );
    }, [statusSuccess, success, description]);

    return (
        <MRadio.Group
            classNames={classes}
            {...props}
            spacing={spacing}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}>
            {children}
        </MRadio.Group>
    );
};
