import { Box, Flex, FlexProps, Loader, ScrollArea, Text } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import { AdminSupportConversationFromList, useAdminSupportConversations } from "@entities/support";
import { ChatItem } from "./components";
import { initialParams } from "./constants";
import useStyles from "./ChatList.styles";
import { adaptGetAdminSupportConversationsRequest } from "./utils";

export interface ChatListProps extends Omit<FlexProps, "children" | "onSelect"> {
    maxHeightContainer: number;
    selectedConversation?: AdminSupportConversationFromList | null;
    onSelect: (conversation: AdminSupportConversationFromList) => void;
    isSelectedConversationByManageSearch?: boolean;
}

const ChatList = ({
    maxHeightContainer,
    selectedConversation,
    isSelectedConversationByManageSearch,
    onSelect,
    ...props
}: ChatListProps) => {
    const { classes } = useStyles();
    const {
        data: supportConversationsData,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetching,
        isRefetching,
    } = useAdminSupportConversations(
        adaptGetAdminSupportConversationsRequest({
            ...initialParams,
            userId: selectedConversation?.id,
            isSelectedConversationByManageSearch,
        })
    );
    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const renderNothingFound = () => {
        if (isLoading || isFetching || isRefetching) {
            return null;
        }
        if (supportConversationsData?.data.length) {
            return;
        }

        return (
            <Box px={8}>
                <Text className={classes.nothingFoundTitle}>Список диалогов пуст</Text>
                <Text className={classes.nothingFoundDescription}>Воспользуйтесь поиском для добавления диалога</Text>
            </Box>
        );
    };

    const renderItems = useMemo(
        () =>
            supportConversationsData?.data.map((conversation) => {
                const isSelected = selectedConversation?.id === conversation.id;
                return (
                    <Box key={conversation.id} ref={lastElemRef}>
                        <ChatItem data={conversation} isSelected={isSelected} onClick={onSelect} />
                    </Box>
                );
            }),
        [supportConversationsData, selectedConversation]
    );

    return (
        <Flex className={classes.root} {...props}>
            <ScrollArea.Autosize maxHeight={maxHeightContainer} style={{ paddingRight: 8 }} type="auto" offsetScrollbars scrollbarSize={4}>
                {renderNothingFound()}
                {renderItems}
                {(isLoading || isFetching || isRefetching) && <Loader w="100%" />}
            </ScrollArea.Autosize>
        </Flex>
    );
};

export default ChatList;
