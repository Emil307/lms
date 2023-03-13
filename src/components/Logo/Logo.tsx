import { Flex } from "@mantine/core";
import { Text } from "@mantine/core";
import React from "react";
import { CentroSansPro } from "@app/providers/Theme/fonts";
import LogoImage from "./logo.svg";

export default function Logo() {
    return (
        <Flex align="center" gap={10}>
            <LogoImage />
            <Text
                sx={{
                    fontSize: 18,
                    fontFamily: CentroSansPro.style.fontFamily,
                }}>
                Галерея Бизнеса
            </Text>
        </Flex>
    );
}
