import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { ContactsPage } from "@pages/admin/staticPages";
import { AdminPage } from "@components/AdminPage";

const AdminPagesContacts: NextPageWithLayout = () => {
    return (
        <AdminPage title="Контакты">
            <ContactsPage />
        </AdminPage>
    );
};

AdminPagesContacts.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AdminPagesContacts;
