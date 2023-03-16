import React, { useState } from "react";
import { DatePicker as MDatePicker, DatePickerProps as MDatePickerProps } from "@mantine/dates";
import { Calendar } from "react-feather";
import { ThemeIcon } from "@mantine/core";
import { useInputStyles } from "@shared/styles";

export interface DatePickerProps extends MDatePickerProps {}

export const DatePicker = (props: DatePickerProps) => {
    const {
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

    const handlerOnChange = (value: Date | null) => {
        onChange(value);
        setFocused(false);
    };

    const { classes } = useInputStyles({
        floating: !!props.value || focused,
        size: size,
    });

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
        />
    );
};
