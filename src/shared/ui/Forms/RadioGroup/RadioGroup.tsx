import React, { useMemo } from "react";
import { Flex, Radio as MRadio, RadioGroupProps as MRadioGroupProps, ThemeIcon } from "@mantine/core";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { z } from "zod";
import { Paragraph } from "@shared/ui";
import { useRadioGroupStyles } from "./RadioGroup.styles";

export interface RadioGroupProps extends MRadioGroupProps {
    success?: string;
}

export const RadioGroup = ({ children, error, success, description, spacing = 16, ...props }: RadioGroupProps) => {
    const { classes } = useRadioGroupStyles();
    const statusSuccess = useMemo(() => !!props.value?.length && !error && !!success, [props.value, error, success]);

    const renderError = useMemo(
        () =>
            error && (
                <>
                    <AlertTriangle />
                    <Paragraph variant="text-smaller">{error}</Paragraph>
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
                    <Flex gap={16}>
                        <ThemeIcon color="done">
                            <CheckCircle />
                        </ThemeIcon>
                        <Paragraph variant="text-smaller">{success}</Paragraph>
                    </Flex>
                )}
                {description && (
                    <Flex gap={16}>
                        <ThemeIcon color="primaryHover">
                            <Info />
                        </ThemeIcon>
                        <Paragraph variant="text-smaller">{description}</Paragraph>
                    </Flex>
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
