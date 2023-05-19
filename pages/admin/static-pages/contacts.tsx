import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { ContactsPage } from "@pages/admin/staticPages";

const AdminPagesContacts: NextPageWithLayout = () => {
    return <ContactsPage />;
};

AdminPagesContacts.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AdminPagesContacts;
