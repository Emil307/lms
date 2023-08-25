import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ProfilePage } from "@pages/profile";
import { UserPage } from "@components/UserPage";

const Profile: NextPageWithLayout = () => {
    return (
        <UserPage title="Настройки профиля">
            <ProfilePage />
        </UserPage>
    );
};

Profile.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Profile;
