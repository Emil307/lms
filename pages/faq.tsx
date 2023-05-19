import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { FAQPage } from "@pages/staticPages";

const FAQ: NextPageWithLayout = () => {
    return <FAQPage />;
};

FAQ.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default FAQ;
