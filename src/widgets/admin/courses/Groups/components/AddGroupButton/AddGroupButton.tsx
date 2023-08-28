import { ActionIcon } from "@mantine/core";
import React from "react";
import { PlusCircle as PlusCircleIcon, Trash as TrashIcon } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";

interface AddGroupButtonProps {
    courseId: string;
    hidden?: boolean;
}

const AddGroupButton = ({ courseId, hidden }: AddGroupButtonProps) => {
    const router = useRouter();
    const isMobile = useMedia("sm");

    const handleOpenCreateForm = () => {
        router.push({ pathname: "/admin/groups/create", query: { courseId } });
    };

    if (hidden) {
        return null;
    }

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenCreateForm}>
                <TrashIcon />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={handleOpenCreateForm} variant="text" leftIcon={<PlusCircleIcon />}>
            Добавить группу
        </Button>
    );
};

export default AddGroupButton;
