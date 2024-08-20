import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { FaqPage } from "@pages/admin/staticPages";
import { AdminPage } from "@components/AdminPage";

const FAQ: NextPageWithLayout = () => {
    return (
        <AdminPage title="Вопрос-ответ">
            <FaqPage />
        </AdminPage>
    );
};

FAQ.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default FAQ;
