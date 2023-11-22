import { Box, Flex } from "@mantine/core";
import React, { useState } from "react";
import { AdminSupportConversationFromList, supportApi } from "@entities/support";
import { QueryKeys } from "@shared/constant";
import { Heading, ManagedSearch } from "@shared/ui";
import { AdminMessageList, ChatList, CreateAdminMessageForm } from "@features/support";
import { HeaderSelectedConversation, SearchItemComponent } from "./components";
import useStyles from "./MessagesPage.styles";

const MessagesPage = () => {
    const [selectedConversation, setSelectedConversation] = useState<AdminSupportConversationFromList | null>(null);
    const [isSelectedConversationByManageSearch, setIsSelectedConversationByManageSearch] = useState(false);
    const [scrollAfterSendMessage, setScrollAfterSendMessage] = useState<boolean>(true);

    const { classes } = useStyles({ hasSelectedConversation: !!selectedConversation });

    const handleCloseSelectedConversation = () => setSelectedConversation(null);

    const handleSelectConversationManageSearch = (item: AdminSupportConversationFromList) => {
        setSelectedConversation(item);
    };

    const handleSelectConversationChatList = (conversation: AdminSupportConversationFromList) => {
        setSelectedConversation(conversation);
    };

    const handleChangeSearchDebouncedValue = (value: string) => {
        setIsSelectedConversationByManageSearch(!!value);
    };

    return (
        <Flex className={classes.root}>
            <Heading className={classes.titlePage}>Сообщения</Heading>
            <Flex className={classes.messagesBlockContainer}>
                <Box className={classes.chatContainerWrapper}>
                    <ManagedSearch<AdminSupportConversationFromList>
                        queryKey={QueryKeys.GET_ADMIN_SUPPORT_CONVERSATIONS}
                        queryFunction={(params) => supportApi.getAdminSupportConversations(params)}
                        queryCacheKeys={["page", "perPage", "query"]}
                        searchInputProps={{
                            placeholder: "Найти пользователя",
                        }}
                        wrapperContainerProps={{
                            className: classes.searchUserWrapper,
                        }}
                        onSelect={handleSelectConversationManageSearch}
                        itemComponent={(props) => <SearchItemComponent {...props} />}
                        onChangeSearchDebouncedValue={handleChangeSearchDebouncedValue}
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
                        scrollAfterSendMessage={scrollAfterSendMessage}
                        setScrollAfterSendMessage={setScrollAfterSendMessage}
                        maxHeightContainer={450}>
                        <CreateAdminMessageForm
                            conversationId={selectedConversation?.supportConversation.id}
                            setScrollAfterSendMessage={setScrollAfterSendMessage}
                            pt={{ base: 16, md: 32 }}
                        />
                    </AdminMessageList>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default MessagesPage;
