import React from "react";
import { ReactElement } from "react";

import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ProfilePageEdit } from "@pages/profile";

const ProfileEdit: NextPageWithLayout = () => {
    return <ProfilePageEdit />;
};

ProfileEdit.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ProfileEdit;
