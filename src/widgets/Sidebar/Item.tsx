import React, { ReactNode } from "react";
import { ThemeIcon, UnstyledButton, Group, Text, useMantineTheme, Box, Flex } from "@mantine/core";
type SidebarItemProps = {
    icon: ReactNode;
    label: string;
    isActive?: boolean;
};

export default function Item({ icon, label, isActive = false }: SidebarItemProps) {
    const theme = useMantineTheme();
    return (
        <Flex align="center">
            <Box
                sx={{
                    width: "10px",
                    height: "30px",
                    borderTopRightRadius: "99px",
                    borderBottomRightRadius: "99px",
                    backgroundColor: isActive ? "orange" : "transparent",
                    padding: 0,
                }}></Box>
            <UnstyledButton
                sx={(theme) => ({
                    display: "block",
                    width: "100%",
                    padding: theme.spacing.xs,
                    paddingLeft: 0,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

                    "&:hover": {
                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}>
                <Group>
                    <ThemeIcon color="background">
                        {React.cloneElement(icon as React.ReactElement, {
                            color: isActive ? theme.colors.primary[7] : theme.colors.neutral_gray[9],
                        })}
                    </ThemeIcon>
                    <Text
                        size="lg"
                        sx={(theme) => ({
                            color: isActive ? undefined : theme.colors.neutral_gray[7],
                        })}>
                        {label}
                    </Text>
                </Group>
            </UnstyledButton>
        </Flex>
    );
}
