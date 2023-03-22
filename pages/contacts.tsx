import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import ContactsPage from "@pages/contacts";

const Contacts: NextPageWithLayout = () => {
    return <ContactsPage />;
};

Contacts.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default Contacts;
