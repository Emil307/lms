import React, { memo, useMemo, useState } from "react";
import { DatePicker as MDatePicker, DatePickerProps as MDatePickerProps } from "@mantine/dates";
import { AlertTriangle, Calendar, CheckCircle, Info } from "react-feather";
import { Group, ThemeIcon, Text, useMantineTheme } from "@mantine/core";
import { z } from "zod";
import dayjs from "dayjs";
import { useInputStyles } from "@shared/styles";

export interface DatePickerProps extends Omit<MDatePickerProps, "value" | "onChange"> {
    dateStringFormat?: string;
    value?: Date | string | null;
    onChange?: (value: Date | string | null) => void;
    success?: string | boolean;
}

const MemoizedDatePicker = memo(function DatePicker(props: DatePickerProps) {
    const {
        value,
        description,
        error,
        success = false,
        size,
        dateStringFormat,
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

    const handleChange = (value: Date | null) => {
        setFocused(false);
        if (dateStringFormat && value) {
            onChange(dayjs(value).format(dateStringFormat));
            return;
        }
        onChange(value);
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

    const getValue = () => {
        if (!value || (typeof value === "string" && !dayjs(value).isValid())) {
            return null;
        }
        return new Date(value);
    };

    return (
        <MDatePicker
            {...props}
            classNames={classes}
            value={getValue()}
            onChange={handleChange}
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
});

export default MemoizedDatePicker;
