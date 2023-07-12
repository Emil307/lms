import React, { memo, useMemo, useState } from "react";
import { Flex, MultiSelect as MMultiSelect, MultiSelectProps as MMultiSelectProps, ThemeIcon } from "@mantine/core";
import { AlertTriangle, CheckCircle, ChevronDown, Info, X } from "react-feather";
import { z } from "zod";
import { Paragraph, SelectItem } from "@shared/ui";
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
                <ThemeIcon color="gray45" w={16} h={16} sx={{ pointerEvents: "initial" }} onClick={handlerClear}>
                    <X />
                </ThemeIcon>
            );
        }
        return (
            <ThemeIcon color="gray45" sx={{ transform: `rotate(${openedDropdown ? 180 : 0}deg)` }}>
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
