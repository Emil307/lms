import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { LessonDetailPage } from "@pages/admin/lessons";

const LessonDetail: NextPageWithLayout = () => {
    return (
        <AdminPage title="Урок">
            <LessonDetailPage />
        </AdminPage>
    );
};

LessonDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default LessonDetail;