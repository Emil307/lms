import { TextInput as MInput, ThemeIcon, Flex } from "@mantine/core";
import { ChangeEvent, ComponentProps, KeyboardEvent, memo, ReactNode, useCallback, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle, Eye, EyeOff, Info } from "react-feather";
import { z } from "zod";
import { usePassword } from "@shared/utils";
import { useInputStyles } from "@shared/styles";
import { Paragraph } from "@shared/ui/Typography";
import {
    REGEXP_INPUT_NUMBER,
    REGEXP_INPUT_NUMBER_KEYS,
    REGEXP_INPUT_PASSWORD,
    REGEXP_INPUT_TEXT,
    REGEXP_INPUT_FIO,
} from "@shared/constant";

export interface InputProps extends Omit<ComponentProps<typeof MInput>, "onChange"> {
    onChange?: (value: string) => void;
    success?: string | boolean;
    onlyLetters?: boolean;
}

const Input = ({ success = false, onlyLetters = false, error, description, onChange = () => undefined, ...props }: InputProps) => {
    const { type = "text", icon, rightSection, size, ...rest } = props;

    const isPasswordField = type === "password";
    const { isPasswordVisible, toggleVisibility } = usePassword();

    const getType = () => {
        if (isPasswordField && !isPasswordVisible) {
            return "password";
        }
        if (isPasswordField && isPasswordVisible) {
            return "text";
        }
        return props.type;
    };

    const getRightSection = useCallback((): ReactNode => {
        if (rightSection) return rightSection;
        if (isPasswordField)
            return isPasswordVisible ? (
                <ThemeIcon color="gray45" sx={{ pointerEvents: "initial" }} onClick={toggleVisibility}>
                    <Eye />
                </ThemeIcon>
            ) : (
                <ThemeIcon color="gray45" sx={{ pointerEvents: "initial" }} onClick={toggleVisibility}>
                    <EyeOff />
                </ThemeIcon>
            );
        return null;
    }, [getType()]);

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

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            const target = event.target as HTMLInputElement;
            if (event.key === "Backspace") {
                return;
            }
            if (event.code === "Space" && (!target.value || target.value[target.value.length - 1] === " ")) {
                return event.preventDefault();
            }
            if (type === "number" && new RegExp(REGEXP_INPUT_NUMBER_KEYS).test(event.key)) {
                return event.preventDefault();
            }
        },
        [type]
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if (onlyLetters) {
                return onChange(value.replace(REGEXP_INPUT_FIO, ""));
            }
            switch (type) {
                case "text":
                    return onChange(value.replace(REGEXP_INPUT_TEXT, ""));
                case "number":
                    return onChange(value.replace(REGEXP_INPUT_NUMBER, ""));
                case "password":
                    return onChange(value.replace(REGEXP_INPUT_PASSWORD, ""));
                default:
                    return onChange(value);
            }
        },
        [type]
    );

    const statusSuccess = useMemo(() => !!props.value && !error && !!success, [props.value, error, success]);

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

    const right = getRightSection();

    const [focused, setFocused] = useState(false);

    const { classes } = useInputStyles({
        floating: !!props.value?.toString().length || focused,
        icon,
        rightSection: right,
        size,
        statusSuccess,
    });

    return (
        <MInput
            {...rest}
            classNames={classes}
            type={getType()}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
                props.onBlur && props.onBlur(event);
                setFocused(false);
            }}
            rightSection={right}
            icon={icon}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
            min={0}
        />
    );
};

export default memo(Input);
