import { Box, Flex, FlexProps, Loader, ScrollArea } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import { useRouter } from "next/router";
import { ADMIN_MESSAGES_QUERY_SELECT_NAME, AdminSupportConversationFromList, useAdminSupportConversations } from "@entities/support";
import { Paragraph } from "@shared/ui";
import { useIntersection } from "@shared/utils";
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
    const router = useRouter();
    const { classes } = useStyles();
    const [query] = useQueryParam(ADMIN_MESSAGES_QUERY_SELECT_NAME, StringParam);

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
        }),
        //запрашиваем только тогда, когда нет выбранного диалога в серче или когда диалог выбран через серч
        router.isReady && ((!!query && isSelectedConversationByManageSearch) || !query),
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
                <Paragraph variant="small-m" color="dark">
                    Список диалогов пуст
                </Paragraph>
                <Paragraph variant="text-caption" color="neutralMain50">
                    Воспользуйтесь поиском для добавления диалога
                </Paragraph>
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
        [supportConversationsData, selectedConversation],
    );

    return (
        <Flex className={classes.root} {...props}>
            <ScrollArea.Autosize maxHeight={maxHeightContainer} style={{ paddingRight: 4 }} type="auto" scrollbarSize={4}>
                {renderNothingFound()}
                <Flex direction="column" gap={4}>
                    {renderItems}
                </Flex>
                {(isLoading || isFetching || isRefetching) && <Loader w="100%" />}
            </ScrollArea.Autosize>
        </Flex>
    );
};

export default ChatList;
