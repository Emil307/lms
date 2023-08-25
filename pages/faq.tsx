import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { FAQPage } from "@pages/staticPages";
import { UserPage } from "@components/UserPage";

const FAQ: NextPageWithLayout = () => {
    return (
        <UserPage title="Вопрос-ответ">
            <FAQPage />
        </UserPage>
    );
};

FAQ.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default FAQ;
