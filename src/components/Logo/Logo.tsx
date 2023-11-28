import { Flex, FlexProps, TextProps } from "@mantine/core";
import React from "react";
import LogoImage from "@public/icons/logoNew.svg";

export interface LogoProps extends FlexProps {
    textProps?: TextProps;
}

export default function Logo({ textProps, ...props }: LogoProps) {
    return (
        <Flex align="center" gap={10} {...props}>
            <LogoImage />
        </Flex>
    );
}
