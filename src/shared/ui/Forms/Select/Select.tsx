import React, { memo, useMemo, useState } from "react";
import { Flex, Select as MSelect, SelectProps as MSelectProps, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { AlertTriangle, CheckCircle, ChevronDown, Info, Search, X } from "react-feather";
import { z } from "zod";
import { useInputStyles } from "@shared/styles";
import { SelectItem } from "./SelectItem";

export interface SelectProps extends MSelectProps {
    success?: string | boolean;
}

const MemoizedSelect = (props: SelectProps) => {
    const {
        icon,
        size = "md",
        searchable,
        onChange = () => undefined,
        onFocus = () => undefined,
        onBlur = () => undefined,
        classNames,
        styles,
        unstyled,
        description,
        error,
        success = false,
    } = props;

    const theme = useMantineTheme();
    const [focused, setFocused] = useState(false);
    const [openedDropdown, setOpenedDropdown] = useState(props.initiallyOpened);

    const statusSuccess = useMemo(() => !!props.value && !error && !!success, [props.value, error, success]);

    const { classes } = useInputStyles(
        {
            floating: props.value?.toString().trim().length !== 0 || focused,
            rightSection: true,
            icon: icon || searchable,
            size: size,
        },
        { name: "Select", classNames, styles, unstyled }
    );

    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onFocus(e);
        setFocused(true);
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onBlur(e);
        setFocused(false);
    };

    const handlerClear = () => {
        onChange("");
    };

    const handlerOnChange = (value: string) => {
        onChange(value);
        setFocused(false);
    };

    const handleDropdownOpen = () => {
        setOpenedDropdown(true);
    };

    const handleDropdownClose = () => {
        setOpenedDropdown(false);
    };

    const RightSection = () => {
        if (props.rightSection) {
            return <>{props.rightSection}</>;
        }
        if (props.value && props.clearable) {
            return (
                <ThemeIcon variant="outline" color="gray45" sx={{ border: "none", pointerEvents: "initial" }} onClick={handlerClear}>
                    <X />
                </ThemeIcon>
            );
        }
        return (
            <ThemeIcon
                variant="outline"
                color="gray45"
                sx={{ border: "none", transform: `rotate(${openedDropdown ? 180 : 0}deg)` }}
                onClick={handlerClear}>
                <ChevronDown />
            </ThemeIcon>
        );
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
                    <Flex gap={16}>
                        <CheckCircle color={theme.colors.done[0]} />
                        <Text>{success}</Text>
                    </Flex>
                )}
                {description && (
                    <Flex gap={16}>
                        <Info color={theme.colors.primaryHover[0]} />
                        <Text>{description}</Text>
                    </Flex>
                )}
            </>
        );
    }, [statusSuccess, success, description]);

    const renderIcon = () => {
        if (searchable) {
            return (
                <ThemeIcon color="primary" variant="outline" sx={{ border: "none" }}>
                    <Search />
                </ThemeIcon>
            );
        }
        return icon;
    };

    return (
        <MSelect
            {...props}
            onChange={handlerOnChange}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            icon={renderIcon()}
            classNames={classes}
            itemComponent={props.itemComponent ?? SelectItem}
            rightSection={<RightSection />}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
        />
    );
};

export default memo(MemoizedSelect);
