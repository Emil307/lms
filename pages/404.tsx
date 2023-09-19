import React, { ReactElement } from "react";
import { NextPageWithLayout } from "@shared/utils";
import { UserPage } from "@components/UserPage";
import { ErrorLayout } from "@app/layouts";
import { CustomPage404 } from "@pages/errors";

const Custom404: NextPageWithLayout = () => {
    return (
        <UserPage title="Страницы не существует">
            <CustomPage404 />
        </UserPage>
    );
};

Custom404.getLayout = function (page: ReactElement) {
    return <ErrorLayout>{page}</ErrorLayout>;
};

export default Custom404;
