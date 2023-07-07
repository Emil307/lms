import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateCourseCollectionPage } from "@pages/admin/settings";

const UpdateCourseCollection: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование подборки курсов">
            <UpdateCourseCollectionPage />
        </AdminPage>
    );
};

UpdateCourseCollection.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateCourseCollection;
