import React from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { UpdateAuthorPage } from "@pages/admin/settings";
import { NextPageWithLayout } from "@shared/utils/types";
import { NextPageWithLayoutProps } from "@shared/types";
import { getFullName } from "@shared/utils";
import { useAdminAuthor } from "@entities/author";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const UpdateAuthor: NextPageWithLayout<NextPageWithLayoutProps> = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, error } = useAdminAuthor(id ? { id: id as string } : { id: "" });
    const fullName = data ? getFullName({ data }) : "Loading...";

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={fullName}>
            <UpdateAuthorPage />
        </AdminPage>
    );
};

UpdateAuthor.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateAuthor;
