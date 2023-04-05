import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import ContactsPage from "@pages/contacts";

const Contacts: NextPageWithLayout = () => {
    return <ContactsPage />;
};

Contacts.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Contacts;
