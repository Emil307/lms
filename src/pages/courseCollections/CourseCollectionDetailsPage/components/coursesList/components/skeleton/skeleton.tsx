import { Box, Flex, Skeleton as MSkeleton } from "@mantine/core";

export const Skeleton = () => (
    <Flex gap={24} wrap="wrap">
        <Box w={{ base: 343, md: 500, lg: 424 }} mb={8}>
            <MSkeleton w="100%" h={520} radius={8} />
        </Box>
        <Box w={{ base: 343, md: 500, lg: 424 }} mb={8}>
            <MSkeleton w="100%" h={520} radius={8} />
        </Box>
        <Box w={{ base: 343, md: 500, lg: 424 }} mb={8}>
            <MSkeleton w="100%" h={520} radius={8} />
        </Box>
    </Flex>
);
