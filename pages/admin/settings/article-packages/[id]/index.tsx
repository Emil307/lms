import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticlePackageDetailsPage } from "@pages/admin/settings";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { ArticlePackageApi } from "@entities/articlePackage";
import { QueryKeys } from "@shared/constant";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const articlePackageApi = new ArticlePackageApi(axios);

    try {
        const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, id], () =>
            articlePackageApi.getAdminArticlePackage(id)
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

const ArticlePackageDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <ArticlePackageDetailsPage />
        </AdminPage>
    );
};

ArticlePackageDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticlePackageDetails;
