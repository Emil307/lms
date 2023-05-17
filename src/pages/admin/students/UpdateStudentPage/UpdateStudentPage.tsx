import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { UpdateStudentForm } from "@features/students";
import { useDetailUser } from "@entities/user";
import { getFullNameFromProfile } from "@shared/utils";

const UpdateStudentPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const { data: userData } = useDetailUser(id);

    const userName = getFullNameFromProfile(userData?.profile);

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
            <Title order={1} color="dark" mb={24}>
                {userName}
            </Title>
            <UpdateStudentForm data={userData} onClose={handleCloseForm} />
        </Box>
    );
};

export default UpdateStudentPage;
