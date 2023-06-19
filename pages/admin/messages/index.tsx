import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { MessagesPage } from "@pages/admin/messages";

const Messages: NextPageWithLayout = () => {
    return (
        <AdminPage title="Сообщения">
            <MessagesPage />
        </AdminPage>
    );
};

Messages.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Messages;
