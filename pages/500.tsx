import {NextPageWithLayout} from "@shared/utils";
import {UserPage} from "@components/UserPage";
import React, {ReactElement} from "react";
import {ErrorLayout} from "@app/layouts";
import {CustomPage500} from "@pages/errors";

const About: NextPageWithLayout = () => {
    return (
        <UserPage title="Ошибка сервера">
            <CustomPage500 />
        </UserPage>
    );
};

About.getLayout = function (page: ReactElement) {
    return <ErrorLayout>{page}</ErrorLayout>;
};

export default About;