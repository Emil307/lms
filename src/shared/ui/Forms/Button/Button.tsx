import { Button as MButton, ButtonProps as MButtonProps } from "@mantine/core";
import { memo } from "react";
import { useButtonStyles } from "./ButtonStyles";

export type ButtonSize = "large" | "medium" | "small";
export type ButtonVariant = "primary" | "secondary" | "border" | "white" | "text";
export interface ButtonProps extends Omit<MButtonProps, "size" | "variant"> {
    size: ButtonSize;
    variant: ButtonVariant;
}

const MemoizedButton = memo(function Button({ variant, size = "medium", ...props }: ButtonProps) {
    const { classes } = useButtonStyles({ variant, size });
    return <MButton {...props} classNames={classes} />;
});

export default MemoizedButton;
