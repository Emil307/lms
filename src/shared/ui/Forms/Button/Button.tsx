import { createPolymorphicComponent, Button as MButton, ButtonProps as MButtonProps } from "@mantine/core";
import { forwardRef, memo, MouseEvent } from "react";
import { useButtonStyles } from "./Button.styles";

export type ButtonSize = "large" | "medium" | "small";
export type ButtonVariant = "primary" | "secondary" | "border" | "white" | "text";
export interface ButtonProps
    extends Omit<MButtonProps, "size" | "variant">,
        Omit<React.ComponentPropsWithoutRef<"button">, keyof MButtonProps> {
    size?: ButtonSize;
    variant?: ButtonVariant;
    handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    onClick?: () => void;
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "medium", onClick, handleClick, ...props }, ref) => {
        const { classes } = useButtonStyles({ variant, size });

        const getHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick();
            }
            if (handleClick) {
                handleClick(event);
            }
        };

        return <MButton {...props} classNames={classes} onClick={getHandleClick} ref={ref} />;
    }
);

ButtonComponent.displayName = "Button";

const Button = createPolymorphicComponent<"button", ButtonProps>(memo(ButtonComponent));

export default Button;
