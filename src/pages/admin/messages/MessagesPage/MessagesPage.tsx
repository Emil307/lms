import { Box, Flex } from "@mantine/core";
import React, { useState } from "react";
import { StringParam, useQueryParams, withDefault } from "use-query-params";
import {
    ADMIN_MESSAGES_QUERY_SEARCH_NAME,
    ADMIN_MESSAGES_QUERY_SELECT_NAME,
    AdminSupportConversationFromList,
    supportApi,
} from "@entities/support";
import { EntityNames, QueryKeys } from "@shared/constant";
import { Heading, ManagedSearch } from "@shared/ui";
import { AdminMessageList, ChatList, CreateAdminMessageForm } from "@features/support";
import { HeaderSelectedConversation, SearchItemComponent } from "./components";
import useStyles from "./MessagesPage.styles";

const MessagesPage = () => {
    const [_query, setQuery] = useQueryParams({
        [ADMIN_MESSAGES_QUERY_SEARCH_NAME]: withDefault(StringParam, ""),
        [ADMIN_MESSAGES_QUERY_SELECT_NAME]: withDefault(StringParam, ""),
    });

    const [selectedConversation, setSelectedConversation] = useState<AdminSupportConversationFromList | null>(null);
    const [isSelectedConversationByManageSearch, setIsSelectedConversationByManageSearch] = useState(false);
    const [scrollToLastMessage, setScrollToLastMessage] = useState<boolean>(true);

    const { classes } = useStyles({ hasSelectedConversation: !!selectedConversation });

    const handleCloseSelectedConversation = () => {
        setSelectedConversation(null);
        setQuery({ [ADMIN_MESSAGES_QUERY_SEARCH_NAME]: undefined, [ADMIN_MESSAGES_QUERY_SELECT_NAME]: undefined });
    };

    const handleSelectConversationManageSearch = (item: AdminSupportConversationFromList) => {
        setSelectedConversation(item);
        setIsSelectedConversationByManageSearch(true);
        setScrollToLastMessage(true);
    };

    const handleSelectConversationChatList = (conversation: AdminSupportConversationFromList) => {
        setSelectedConversation(conversation);
        setScrollToLastMessage(true);
    };

    const handleCleanManageSearch = () => {
        setIsSelectedConversationByManageSearch(false);
    };

    return (
        <Flex className={classes.root}>
            <Heading className={classes.titlePage}>Сообщения</Heading>
            <Flex className={classes.messagesBlockContainer}>
                <Box className={classes.chatContainerWrapper}>
                    <ManagedSearch<AdminSupportConversationFromList>
                        queryKey={[QueryKeys.GET_ADMIN_SUPPORT_CONVERSATIONS_SEARCH, [EntityNames.USER, EntityNames.STUDENT]]}
                        queryFunction={(params) => supportApi.getAdminSupportConversations(params)}
                        querySearchName={ADMIN_MESSAGES_QUERY_SEARCH_NAME}
                        querySelectName={ADMIN_MESSAGES_QUERY_SELECT_NAME}
                        searchInputProps={{
                            placeholder: "Найти пользователя",
                        }}
                        wrapperContainerProps={{
                            className: classes.searchUserWrapper,
                        }}
                        onSelect={handleSelectConversationManageSearch}
                        onClean={handleCleanManageSearch}
                        itemComponent={(props) => <SearchItemComponent {...props} />}
                    />
                    <ChatList
                        maxHeightContainer={568}
                        selectedConversation={selectedConversation}
                        isSelectedConversationByManageSearch={isSelectedConversationByManageSearch}
                        onSelect={handleSelectConversationChatList}
                    />
                </Box>
                <Flex className={classes.messageListContainerWrapper}>
                    <HeaderSelectedConversation
                        selectedConversation={selectedConversation}
                        onCloseConversation={handleCloseSelectedConversation}
                    />
                    <AdminMessageList
                        conversation={selectedConversation}
                        scrollToLastMessage={scrollToLastMessage}
                        setScrollToLastMessage={setScrollToLastMessage}
                        maxHeightContainer={450}>
                        <CreateAdminMessageForm
                            conversationId={selectedConversation?.supportConversation.id}
                            setScrollToLastMessage={setScrollToLastMessage}
                            pt={{ base: 16, md: 32 }}
                        />
                    </AdminMessageList>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default MessagesPage;
