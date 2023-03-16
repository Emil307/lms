import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import UiKitPage from "src/features/UiKitPage";
import { NextPageWithLayout } from "@shared/utils";

const UiKit: NextPageWithLayout = () => {
    return <UiKitPage />;
};

UiKit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UiKit;
