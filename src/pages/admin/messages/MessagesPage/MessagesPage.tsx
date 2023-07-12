import { Box, Flex, Text } from "@mantine/core";
import React, { useState } from "react";
import { AdminSupportConversationFromList, supportApi } from "@entities/support";
import { QueryKeys } from "@shared/constant";
import { Heading, ManagedSearch } from "@shared/ui";
import { AdminMessageList, ChatList, CreateAdminMessageForm } from "@features/support";
import { getFullName } from "@shared/utils";
import { SearchItemComponent } from "./components";
import useStyles from "./MessagesPage.styles";

const MessagesPage = () => {
    const { classes } = useStyles();
    const [selectedConversation, setSelectedConversation] = useState<AdminSupportConversationFromList | null>(null);
    const [isSelectedConversationByManageSearch, setIsSelectedConversationByManageSearch] = useState(false);

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
        <Box>
            <Heading mb={40}>Сообщения</Heading>
            <Flex
                sx={(theme) => ({
                    borderRadius: 16,
                    border: `1px solid ${theme.colors.grayLight[0]}`,
                })}>
                <Box
                    w={382}
                    sx={(theme) => ({
                        borderRight: `1px solid ${theme.colors.grayLight[0]}`,
                    })}>
                    <ManagedSearch<AdminSupportConversationFromList>
                        queryKey={QueryKeys.GET_ADMIN_SUPPORT_CONVERSATIONS}
                        queryFunction={(params) => supportApi.getAdminSupportConversations(params)}
                        queryCacheKeys={["page", "perPage", "query"]}
                        searchInputProps={{
                            placeholder: "Найти пользователя",
                        }}
                        wrapperContainerProps={{
                            px: 20,
                            py: 24,
                            sx: (theme) => ({ borderBottom: `1px solid ${theme.colors.grayLight[0]}` }),
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
                <Flex direction="column" sx={{ flex: 1 }}>
                    {selectedConversation && (
                        <Flex className={classes.chatHeader}>
                            <Heading order={3} lineClamp={1}>
                                {getFullName({ data: selectedConversation.profile })}
                            </Heading>
                            <Text className={classes.chatHeaderRoleName}>{selectedConversation.roles[0].displayName}</Text>
                        </Flex>
                    )}
                    <AdminMessageList conversation={selectedConversation} maxHeightContainer={450}>
                        <CreateAdminMessageForm conversationId={selectedConversation?.supportConversation.id} pt={32} />
                    </AdminMessageList>
                </Flex>
            </Flex>
        </Box>
    );
};

export default MessagesPage;
