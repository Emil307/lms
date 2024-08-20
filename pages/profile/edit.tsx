import React, { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { UpdateProfilePage } from "@pages/profile";
import { UserPage } from "@components/UserPage";

const UpdateProfile: NextPageWithLayout = () => {
    return (
        <UserPage title="Редактирование данных профиля">
            <UpdateProfilePage />
        </UserPage>
    );
};

UpdateProfile.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default UpdateProfile;
