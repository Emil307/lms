import { Avatar, Flex, Skeleton } from "@mantine/core";
import React from "react";
import AvatarIcon from "@public/icons/avatar.svg";
import { useSession } from "@entities/auth/hooks";
import { Heading, Paragraph } from "@shared/ui";

const GreetingCard = () => {
    const { user } = useSession();

    if (!user) {
        return <Skeleton visible={true} maw={349} h={72} radius={70} />;
    }

    return (
        <Flex gap={32} align="center">
            <Avatar
                src={user.profile.avatar?.absolutePath}
                alt="avatar"
                w={72}
                h={72}
                radius={160}
                styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.neutralGray200[0] } })}>
                <AvatarIcon />
            </Avatar>
            <Flex gap={4} direction="column">
                <Heading order={2}>Добро пожаловать,</Heading>
                <Paragraph variant="large">{user.profile.firstName}!</Paragraph>
            </Flex>
        </Flex>
    );
};

export default GreetingCard;
