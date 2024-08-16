import React from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { UpdateArticlePage } from "@pages/admin/articles";
import { useAdminArticle } from "@entities/article";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const UpdateArticle = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, error } = useAdminArticle(id ? { id: id as string } : { id: "" });

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={data.name}>
            <UpdateArticlePage />
        </AdminPage>
    );
};

UpdateArticle.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateArticle;
