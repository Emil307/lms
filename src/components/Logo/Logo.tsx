import { Flex, FlexProps, TextProps } from "@mantine/core";
import { Text } from "@mantine/core";
import React from "react";
import { CentroSansPro } from "@app/providers/Theme/fonts";
import LogoImage from "@public/icons/logo.svg";

export interface LogoProps extends FlexProps {
    textProps?: TextProps;
}

export default function Logo({ textProps, ...props }: LogoProps) {
    return (
        <Flex align="center" gap={10} {...props}>
            <LogoImage />
            <Text
                sx={{
                    fontSize: 18,
                    fontFamily: CentroSansPro.style.fontFamily,
                    whiteSpace: "nowrap",
                }}
                {...textProps}>
                Галерея Бизнеса
            </Text>
        </Flex>
    );
}
