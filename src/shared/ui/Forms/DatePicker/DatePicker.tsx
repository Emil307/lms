import React, { useMemo, useState } from "react";
import { DatePicker as MDatePicker, DatePickerProps as MDatePickerProps } from "@mantine/dates";
import { AlertTriangle, Calendar, CheckCircle, Info } from "react-feather";
import { Group, ThemeIcon, Text, useMantineTheme } from "@mantine/core";
import { z } from "zod";
import { useInputStyles } from "@shared/styles";

export interface DatePickerProps extends MDatePickerProps {
    success?: string | boolean;
}

const DatePicker = (props: DatePickerProps) => {
    const {
        description,
        error,
        success = false,
        size,
        onChange = () => undefined,
        onFocus = () => undefined,
        onDropdownClose = () => undefined,
        onDropdownOpen = () => undefined,
    } = props;
    const theme = useMantineTheme();
    const [focused, setFocused] = useState(false);

    const onDropdownOpenHandler = () => {
        onDropdownOpen();
        setFocused(true);
    };

    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onFocus(e);
        setFocused(true);
    };

    const onDropCloseHandler = () => {
        onDropdownClose();
        setFocused(false);
    };

    const handlerOnChange = (value: Date | null) => {
        onChange(value);
        setFocused(false);
    };

    const statusSuccess = useMemo(() => !!props.value && !error && !!success, [props.value, error, success]);

    const { classes } = useInputStyles({
        floating: !!props.value || focused,
        size: size,
        statusSuccess,
    });

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
        <MDatePicker
            {...props}
            classNames={classes}
            onChange={handlerOnChange}
            onDropdownOpen={onDropdownOpenHandler}
            onFocus={onFocusHandler}
            onDropdownClose={onDropCloseHandler}
            rightSection={
                <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }}>
                    <Calendar />
                </ThemeIcon>
            }
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
};

export default DatePicker;
