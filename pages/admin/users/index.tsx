import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";

import { UserIndexPage } from "src/features/UserPage";
import { NextPageWithLayout } from "@shared/utils/types";

const UiKit: NextPageWithLayout = () => {
    return <UserIndexPage />;
};

UiKit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UiKit;
