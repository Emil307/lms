import Head from "next/head";
import React, { PropsWithChildren } from "react";

export interface AdminPageProps {
    title: React.ReactNode;
    headTitle?: string;
    hidePrompt?: boolean;
    permission?: string;
}

function AdminPage({ children, title }: PropsWithChildren<AdminPageProps>) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </>
    );
}

export default AdminPage;
