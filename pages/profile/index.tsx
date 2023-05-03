import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ProfilePage } from "@pages/profile";

const Profile: NextPageWithLayout = () => {
    return <ProfilePage />;
};

Profile.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Profile;
