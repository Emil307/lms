import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";

import { NextPageWithLayout } from "@shared/utils";
import { ProfilePage } from "@pages/profile";

const Profile: NextPageWithLayout = () => {
    return <ProfilePage />;
};

Profile.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default Profile;
