import { AdminSupportConversationFiltersForm, GetAdminSupportConversationsRequest } from "@entities/support";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminSupportConversationsRequest = (
    params: TFunctionParams<AdminSupportConversationFiltersForm> & { isSelectedConversationByManageSearch?: boolean },
): GetAdminSupportConversationsRequest => {
    const { userId, isSelectedConversationByManageSearch = false, ...rest } = params;

    return {
        ...rest,
        ...(isSelectedConversationByManageSearch &&
            userId && {
                filter: {
                    id: userId,
                },
            }),
    };
};
