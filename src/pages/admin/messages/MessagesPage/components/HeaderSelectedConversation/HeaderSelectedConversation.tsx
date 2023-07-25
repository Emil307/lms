import { ActionIcon, Box, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ChevronLeft } from "react-feather";
import { AdminSupportConversationFromList } from "@entities/support";
import { Heading, Paragraph } from "@shared/ui";
import { getFullName } from "@shared/utils";
import useStyles from "./HeaderSelectedConversation.styles";

export interface HeaderSelectedConversationProps {
    selectedConversation: AdminSupportConversationFromList | null;
    onCloseConversation: () => void;
}

const HeaderSelectedConversation = ({ selectedConversation, onCloseConversation }: HeaderSelectedConversationProps) => {
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 1024px)");

    if (!selectedConversation) {
        return null;
    }

    if (isTablet) {
        return (
            <Flex className={classes.root}>
                <ActionIcon onClick={onCloseConversation} color="dark">
                    <ChevronLeft />
                </ActionIcon>
                <Box>
                    <Paragraph variant="text-small-semi" lineClamp={1}>
                        {getFullName({ data: selectedConversation.profile })}
                    </Paragraph>
                    <Paragraph variant="text-caption" color="gray45">
                        {selectedConversation.roles[0].displayName}
                    </Paragraph>
                </Box>
            </Flex>
        );
    }

    return (
        <Flex className={classes.root}>
            <Heading order={3} lineClamp={1}>
                {getFullName({ data: selectedConversation.profile })}
            </Heading>
            <Paragraph variant="text-small-m" color="gray45">
                {selectedConversation.roles[0].displayName}
            </Paragraph>
        </Flex>
    );
};

export default HeaderSelectedConversation;
