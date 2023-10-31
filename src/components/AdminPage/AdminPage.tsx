import Head from "next/head";
import React, { PropsWithChildren } from "react";

export interface AdminPageProps {
    title?: React.ReactNode;
    headTitle?: string;
    hidePrompt?: boolean;
    permission?: string;
}

function AdminPage({ children, title }: PropsWithChildren<AdminPageProps>) {
    const titleValue = title ? `${title} | Addamant` : "Addamant";
    return (
        <>
            <Head>
                <title>{titleValue}</title>
            </Head>
            {children}
        </>
    );
}

export default AdminPage;
