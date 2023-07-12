import { TextInput as MInput, ThemeIcon, Flex } from "@mantine/core";
import { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle, Eye, EyeOff, Info } from "react-feather";
import { z } from "zod";
import { usePassword } from "@shared/utils";
import { useInputStyles } from "@shared/styles";
import { Paragraph } from "@shared/ui/Typography";

export interface InputProps extends React.ComponentProps<typeof MInput> {
    success?: string | boolean;
}

const MemoizedInput = memo(function Input({ success = false, error, description, ...props }: InputProps) {
    const { type, icon, rightSection, size } = props;

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
            {...props}
            classNames={classes}
            type={getType()}
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
        />
    );
});

export default MemoizedInput;
