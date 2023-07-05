import { Button as MButton, ButtonProps as MButtonProps } from "@mantine/core";
import { memo, MouseEvent } from "react";
import { useButtonStyles } from "./Button.styles";

export type ButtonSize = "large" | "medium" | "small";
export type ButtonVariant = "primary" | "secondary" | "border" | "white" | "text";
export interface ButtonProps extends Omit<MButtonProps, "size" | "variant"> {
    size?: ButtonSize;
    variant?: ButtonVariant;
    handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    onClick?: () => void;
}

const MemoizedButton = memo(function Button({ variant = "primary", size = "medium", onClick, handleClick, ...props }: ButtonProps) {
    const { classes } = useButtonStyles({ variant, size });

    const getHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick();
        }
        if (handleClick) {
            handleClick(event);
        }
    };

    return <MButton {...props} classNames={classes} onClick={getHandleClick} />;
});

export default MemoizedButton;
