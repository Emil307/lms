import { createPolymorphicComponent, Button as MButton, ButtonProps as MButtonProps } from "@mantine/core";
import { forwardRef, memo } from "react";
import { useButtonSwitchStyles } from "./ButtonSwitch.styles";

export interface ButtonSwitchProps
    extends Omit<MButtonProps, "size" | "variant">,
        Omit<React.ComponentPropsWithoutRef<"button">, keyof MButtonProps> {
    active?: boolean;
}

const ButtonSwitchComponent = forwardRef<HTMLButtonElement, ButtonSwitchProps>(({ active, ...props }, ref) => {
    const { classes } = useButtonSwitchStyles();
    const activated = active ? "true" : "false";

    return <MButton {...props} data-active={activated} classNames={classes} ref={ref} />;
});

ButtonSwitchComponent.displayName = "ButtonSwitch";

export const ButtonSwitch = createPolymorphicComponent<"button", ButtonSwitchProps>(memo(ButtonSwitchComponent));
