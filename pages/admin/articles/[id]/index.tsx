import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticleDetailsPage } from "@pages/admin/articles";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { ArticleApi } from "@entities/article";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const articleApi = new ArticleApi(axios);
    try {
        const response = await queryClient.fetchQuery(
            [QueryKeys.GET_ADMIN_ARTICLE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER], id],
            () => articleApi.getAdminArticle({ id })
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

const ArticleDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <ArticleDetailsPage />
        </AdminPage>
    );
};

ArticleDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticleDetails;
