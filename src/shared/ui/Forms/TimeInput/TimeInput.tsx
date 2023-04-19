import React, { memo, useMemo, useState } from "react";
import { TimeInput as MTimeInput, TimeInputProps as MTimeInputProps } from "@mantine/dates";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { Group, Text, useMantineTheme } from "@mantine/core";
import { z } from "zod";
import { useInputStyles } from "@shared/styles";

export interface TimeInputProps extends MTimeInputProps {
    success?: string | boolean;
}

const MemoizedTimeRangeInput = memo(function TimeRangeInput({ value, ...props }: TimeInputProps) {
    const { description, error, success = false, size, onChange = () => undefined } = props;
    const theme = useMantineTheme();
    const [focused, setFocused] = useState(false);

    const statusSuccess = !!value && !error && !!success;

    const { classes } = useInputStyles({
        floating: !!value || focused,
        size: size,
        statusSuccess,
    });

    const renderError = error && (
        <>
            <AlertTriangle />
            <Text>{error}</Text>
        </>
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

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    return (
        <MTimeInput
            {...props}
            value={value}
            classNames={classes}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
});

export default MemoizedTimeRangeInput;
