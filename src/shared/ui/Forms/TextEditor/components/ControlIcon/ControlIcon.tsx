import { ThemeIcon, ThemeIconProps } from "@mantine/core";
import { ReactNode } from "react";
import useStyles from "./ControlIcon.styles";

export interface ControlIconProps extends Omit<ThemeIconProps, "children" | "variant"> {
    variant?: "localIcon" | "iconFromPackage";
    icon: ReactNode;
}

const ControlIcon = ({ variant, icon, ...props }: ControlIconProps) => {
    const { classes } = useStyles({ variant });
    return (
        <ThemeIcon className={classes.root} {...props}>
            {icon}
        </ThemeIcon>
    );
};

export default ControlIcon;
