import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { UpdateProfilePage } from "@pages/profile";

const UpdateProfile: NextPageWithLayout = () => {
    return <UpdateProfilePage />;
};

UpdateProfile.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default UpdateProfile;
