import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { AuthorDetailsPage } from "@pages/admin/settings";

const AuthorDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Автор курса">
            <AuthorDetailsPage />
        </AdminPage>
    );
};

AuthorDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AuthorDetails;
