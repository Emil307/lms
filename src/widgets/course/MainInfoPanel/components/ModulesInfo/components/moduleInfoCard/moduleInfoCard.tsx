import { Flex, Paper } from "@mantine/core";
import { Heading, Paragraph } from "@shared/ui";
import React from "react";

export interface ModuleInfoCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export const ModuleInfoCard = ({ title, description, icon }: ModuleInfoCardProps) => (
    <Paper p={16} bg="neutralWhite" radius={16} w="100%" maw={410}>
        <Flex gap={24} align="center">
            <Paper h={56} w={56} radius={16} p={16} withBorder>
                {icon}
            </Paper>
            <Flex direction="column">
                <Paragraph variant="small-m" color="neutralMain50">
                    {title}
                </Paragraph>
                <Heading order={4} color="darkHover">
                    {description}
                </Heading>
            </Flex>
        </Flex>
    </Paper>
);
