import React, { memo, useMemo, useState } from "react";
import { DatePicker as MDatePicker, DatePickerProps as MDatePickerProps } from "@mantine/dates";
import { AlertTriangle, Calendar, CheckCircle, Info } from "react-feather";
import { ThemeIcon, Flex } from "@mantine/core";
import { z } from "zod";
import { useInputStyles } from "@shared/styles";
import { Paragraph } from "@shared/ui";

export interface DatePickerProps extends MDatePickerProps {
    success?: string | boolean;
}

const MemoizedDatePicker = memo(function DatePicker(props: DatePickerProps) {
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
        onChange(value);
    };

    const statusSuccess = useMemo(() => !!props.value && !error && !!success, [props.value, error, success]);

    const rightSection = (
        <ThemeIcon color="gray45">
            <Calendar />
        </ThemeIcon>
    );

    const { classes } = useInputStyles({
        floating: !!props.value || focused,
        rightSection,
        size: size,
        statusSuccess,
    });

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
        <MDatePicker
            {...props}
            classNames={classes}
            onChange={handleChange}
            onDropdownOpen={onDropdownOpenHandler}
            onFocus={onFocusHandler}
            onDropdownClose={onDropCloseHandler}
            rightSection={rightSection}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
            inputFormat="DD.MM.YYYY"
        />
    );
});

export default MemoizedDatePicker;
