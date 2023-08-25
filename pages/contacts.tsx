import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ContactsPage } from "@pages/staticPages";
import { UserPage } from "@components/UserPage";

const Contacts: NextPageWithLayout = () => {
    return (
        <UserPage title="Контакты">
            <ContactsPage />
        </UserPage>
    );
};

Contacts.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Contacts;
