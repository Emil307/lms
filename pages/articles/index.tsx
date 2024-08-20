import React, { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticlesPage } from "@pages/articles";
import { UserPage } from "@components/UserPage";

const Articles: NextPageWithLayout = () => {
    return (
        <UserPage title="База знаний">
            <ArticlesPage />
        </UserPage>
    );
};

Articles.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Articles;
