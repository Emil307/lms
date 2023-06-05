import React, { memo, useMemo, useState } from "react";
import { Group, MultiSelect as MMultiSelect, MultiSelectProps as MMultiSelectProps, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { AlertTriangle, CheckCircle, ChevronDown, Info, X } from "react-feather";
import { z } from "zod";
import { SelectItem } from "@shared/ui";
import { useMultiSelectStyles } from "./MultiSelect.styles";
import { MultiSelectValueItem } from "./components";

export interface MultiSelectProps extends MMultiSelectProps {
    success?: string | boolean;
}

const MultiSelect = ({
    error,
    success = false,
    description,
    onChange = () => undefined,
    onFocus = () => undefined,
    onBlur = () => undefined,
    ...props
}: MultiSelectProps) => {
    const theme = useMantineTheme();
    const [focused, setFocused] = useState(false);
    const [openedDropdown, setOpenedDropdown] = useState(props.initiallyOpened);

    const statusSuccess = useMemo(() => !!props.value?.length && !error && !!success, [props.value, error, success]);

    const { classes } = useMultiSelectStyles({ isValue: focused || (!!props.value && props.value.length > 0), statusSuccess });

    const handlerClear = () => {
        onChange([]);
    };

    const RightSection = () => {
        if (props.rightSection) {
            return <>{props.rightSection}</>;
        }
        if (!!props.value && props.value.length > 0) {
            return (
                <ThemeIcon variant="outline" color="gray45" sx={{ border: "none", pointerEvents: "initial" }} onClick={handlerClear}>
                    <X />
                </ThemeIcon>
            );
        }
        return (
            <ThemeIcon variant="outline" color="gray45" sx={{ border: "none", transform: `rotate(${openedDropdown ? 180 : 0}deg)` }}>
                <ChevronDown />
            </ThemeIcon>
        );
    };

    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onFocus(e);
        setFocused(true);
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onBlur(e);
        setFocused(false);
    };

    const handlerOnChange = (value: string[]) => {
        onChange(value);
        setFocused(false);
    };

    const handleDropdownOpen = () => {
        setOpenedDropdown(true);
    };

    const handleDropdownClose = () => {
        setOpenedDropdown(false);
    };

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
        <MMultiSelect
            {...props}
            classNames={classes}
            onChange={handlerOnChange}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            itemComponent={props.itemComponent ?? SelectItem}
            valueComponent={MultiSelectValueItem}
            rightSection={<RightSection />}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
        />
    );
};

export default memo(MultiSelect);
