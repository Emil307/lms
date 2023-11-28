import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateArticlePackagePage } from "@pages/admin/settings";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { ArticlePackageApi } from "@entities/articlePackage";
import { EntityNames, QueryKeys } from "@shared/constant";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const articlePackageApi = new ArticlePackageApi(axios);

    try {
        const response = await queryClient.fetchQuery(
            [
                QueryKeys.GET_ADMIN_ARTICLE_PACKAGE,
                [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER],
                id,
            ],
            () => articlePackageApi.getAdminArticlePackage(id)
        );

        return {
            props: {
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
                title: response.name,
            },
        };
    } catch (error) {
        return handleAxiosErrorSsr(error);
    }
}

const UpdateArticlePackage: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <UpdateArticlePackagePage />
        </AdminPage>
    );
};

UpdateArticlePackage.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateArticlePackage;
