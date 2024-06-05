import { Flex } from "@mantine/core";
import React, { ReactNode } from "react";
import LogoImage from "@public/icons/logoNew.svg";
import useStyles from "./Logo.styles";

export interface LogoProps {
    icon?: ReactNode;
}

export default function Logo({ icon = <LogoImage />, ...props }: LogoProps) {
    const { classes } = useStyles();

    return (
        <Flex {...props} className={classes.root}>
            {icon}
        </Flex>
    );
}
