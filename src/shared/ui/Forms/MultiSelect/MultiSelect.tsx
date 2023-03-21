import React, { memo, useMemo, useState } from "react";
import { Group, MultiSelect as MMultiSelect, MultiSelectProps as MMultiSelectProps, Text, useMantineTheme } from "@mantine/core";
import { AlertTriangle, CheckCircle, ChevronDown, Info, X } from "react-feather";
import { z } from "zod";
import { defaultTheme } from "@app/providers/Theme/theme";
import { useMultiSelectStyles } from "./MultiSelectStyles";

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
            return <X color={defaultTheme.colors?.gray45?.[0]} onClick={handlerClear} />;
        }
        return <ChevronDown style={{ pointerEvents: "none" }} color={defaultTheme.colors?.gray45?.[0]} />;
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
            rightSection={<RightSection />}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
};

export default memo(MultiSelect);
