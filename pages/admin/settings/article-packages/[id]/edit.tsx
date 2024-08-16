import React from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { UpdateArticlePackagePage } from "@pages/admin/settings";
import { NextPageWithLayout } from "@shared/utils/types";
import { NextPageWithLayoutProps } from "@shared/types";
import { useAdminArticlePackage } from "@entities/articlePackage";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const UpdateArticlePackage: NextPageWithLayout<NextPageWithLayoutProps> = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, error } = useAdminArticlePackage(id as string);

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={data.name}>
            <UpdateArticlePackagePage />
        </AdminPage>
    );
};

UpdateArticlePackage.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateArticlePackage;
