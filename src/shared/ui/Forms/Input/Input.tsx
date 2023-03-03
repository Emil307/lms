import { TextInput as MInput } from "@mantine/core";
import { memo, ReactNode, useCallback, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";
import { usePassword } from "@shared/utils/usePassword";
import { useInputStyles } from "../../../styles/InputStyles";

export interface InputProps extends React.ComponentProps<typeof MInput> {}

const MemoizedInput = memo(function Input(props: InputProps) {
    const { type, icon, rightSection, size } = props;

    const isPasswordField = type === "password";
    const { isPasswordVisible, toggleVisibility } = usePassword();

    const getType = () => {
        if (isPasswordField && isPasswordVisible) {
            return "password";
        }
        if (isPasswordField && !isPasswordVisible) {
            return "text";
        }
        return props.type;
    };

    const getRightSection = useCallback((): ReactNode => {
        if (rightSection) return rightSection;
        if (isPasswordField)
            return isPasswordVisible ? (
                <Eye onClick={toggleVisibility} color={defaultTheme.colors?.gray45?.[0]} />
            ) : (
                <EyeOff onClick={toggleVisibility} color={defaultTheme.colors?.gray45?.[0]} />
            );
        return null;
    }, [getType()]);

    const right = getRightSection();

    const [focused, setFocused] = useState(false);

    const { classes } = useInputStyles({ floating: !!props.value || focused, icon: icon, size: size });

    return (
        <MInput
            {...props}
            classNames={classes}
            type={getType()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rightSection={right}
            icon={icon}
        />
    );
});

export default MemoizedInput;
