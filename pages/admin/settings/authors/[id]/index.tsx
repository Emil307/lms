import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { AuthorDetailPage } from "@pages/admin/settings";

const AuthorDetail: NextPageWithLayout = () => {
    return (
        <AdminPage title="Автор курса">
            <AuthorDetailPage />
        </AdminPage>
    );
};

AuthorDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AuthorDetail;
