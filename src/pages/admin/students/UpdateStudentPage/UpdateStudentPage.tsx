import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, TBreadCrumbItem } from "@shared/ui";
import { UpdateStudentForm } from "@features/students";
import { useDetailUser } from "@entities/user";
import { getFullName } from "@shared/utils";

const UpdateStudentPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const { data: userData } = useDetailUser(id);

    const userName = getFullName({ data: userData?.profile });

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Ученики", href: { pathname: "/admin/students" } },
        { title: userName, href: { pathname: "/admin/students/[id]/edit", query: { id } } },
    ];

    const handleCloseForm = () => {
        router.push({ pathname: "/admin/students/[id]", query: { id } });
    };

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Heading mb={24}>{userName}</Heading>
            <UpdateStudentForm data={userData} onClose={handleCloseForm} />
        </Box>
    );
};

export default UpdateStudentPage;
