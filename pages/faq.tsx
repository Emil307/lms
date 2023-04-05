import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";

import { NextPageWithLayout } from "@shared/utils";
import FaqPage from "@pages/faq";

const Faq: NextPageWithLayout = () => {
    return <FaqPage />;
};

Faq.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Faq;
