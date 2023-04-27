import React, { memo, useMemo } from "react";
import { CheckboxGroupProps as MCheckboxGroupProps, Group, Text, useMantineTheme, Checkbox as MCheckbox } from "@mantine/core";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { z } from "zod";
import useStyles from "./CheckboxGroup.styles";

export interface CheckboxGroupProps extends MCheckboxGroupProps {
    success?: string;
}

const MemoizedCheckboxGroup = memo(function CheckboxGroup({ children, error, success, description, ...props }: CheckboxGroupProps) {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const statusSuccess = useMemo(() => !!props.value?.length && !error && !!success, [props.value, error, success]);

    const renderError = () =>
        error && (
            <>
                <AlertTriangle />
                <Text>{error}</Text>
            </>
        );

    const renderDescription = () => {
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
    };

    return (
        <MCheckbox.Group
            {...props}
            classNames={classes}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError()}
            description={renderDescription()}>
            {children}
        </MCheckbox.Group>
    );
});

export default MemoizedCheckboxGroup;
