import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CreateCourseCollectionPage } from "@pages/admin/settings";

const CreateCourseCollection: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание подборки">
            <CreateCourseCollectionPage />
        </AdminPage>
    );
};

CreateCourseCollection.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CreateCourseCollection;
