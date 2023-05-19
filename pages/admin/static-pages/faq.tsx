import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { FaqPage } from "@pages/admin/staticPages";

const FAQ: NextPageWithLayout = () => {
    return <FaqPage />;
};

FAQ.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default FAQ;
