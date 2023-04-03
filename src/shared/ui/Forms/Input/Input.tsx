import { TextInput as MInput, Text, Group, useMantineTheme, ThemeIcon } from "@mantine/core";
import { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle, Eye, EyeOff, Info } from "react-feather";
import { z } from "zod";
import { usePassword } from "@shared/utils";
import { useInputStyles } from "@shared/styles";

export interface InputProps extends React.ComponentProps<typeof MInput> {
    success?: string | boolean;
}

const MemoizedInput = memo(function Input({ success = false, error, description, ...props }: InputProps) {
    const { type, icon, rightSection, size } = props;
    const theme = useMantineTheme();

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
                <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }} onClick={toggleVisibility}>
                    <Eye />
                </ThemeIcon>
            ) : (
                <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }} onClick={toggleVisibility}>
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
                    <Text>{error}</Text>
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

    const right = getRightSection();

    const [focused, setFocused] = useState(false);

    const { classes } = useInputStyles({
        floating: !!props.value || focused,
        icon,
        size,
        statusSuccess,
    });

    return (
        <MInput
            {...props}
            classNames={classes}
            type={getType()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rightSection={right}
            icon={icon}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
});

export default MemoizedInput;
