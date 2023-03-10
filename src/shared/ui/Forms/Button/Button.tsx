import { Button as MButton, ButtonProps as MButtonProps, } from "@mantine/core";
import { memo } from "react";
import { useButtonStyles } from "./ButtonStyles";

export type ButtonSize = "large" | "medium" | "small";
export type ButtonVariant = "primary" | "secondary" | "border" | "white" | "text";
export interface ButtonProps extends Omit<MButtonProps, "size" | "variant"> {
    size?: ButtonSize;
    variant?: ButtonVariant;
    onClick?: () => void;
    iconButton?: boolean;
}

const MemoizedButton = memo(function Button({ variant = "primary", size = "medium", iconButton, ...props }: ButtonProps) {
    const { classes } = useButtonStyles({ variant, size, iconButton });
    return <MButton {...props} classNames={classes} />;
});

export default MemoizedButton;
