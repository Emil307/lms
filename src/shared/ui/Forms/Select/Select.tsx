import React, { memo, useMemo, useState } from "react";
import { Group, Select as MSelect, SelectProps as MSelectProps, Text, useMantineTheme } from "@mantine/core";
import { AlertTriangle, CheckCircle, ChevronDown, Info, Search, X } from "react-feather";
import { z } from "zod";
import { defaultTheme } from "@app/providers/Theme/theme";
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

    const RightSection = () => {
        if (props.rightSection) {
            return <>{props.rightSection}</>;
        }
        if (props.value && props.clearable) {
            return <X color={defaultTheme.colors?.gray45?.[0]} onClick={handlerClear} />;
        }
        return <ChevronDown style={{ pointerEvents: "none" }} color={defaultTheme.colors?.gray45?.[0]} />;
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
        <MSelect
            {...props}
            onChange={handlerOnChange}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            icon={searchable ? <Search color={defaultTheme.colors?.primary?.[0]} /> : icon}
            classNames={classes}
            itemComponent={props.itemComponent ?? SelectItem}
            rightSection={<RightSection />}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
};

export default memo(MemoizedSelect);
