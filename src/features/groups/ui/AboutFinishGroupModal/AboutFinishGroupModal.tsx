import { Flex } from "@mantine/core";
import React from "react";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";
import IconStarDefault from "public/icons/icon24px/rating/star-default.svg";
import { GetGroupResponse } from "@entities/group";
import { AvailableDateInfo, MainInfo } from "./components";

export interface AboutFinishGroupModalProps {
    data: GetGroupResponse;
    onSubmit: () => void;
    onClose: () => void;
}

const AboutFinishGroupModal = ({ data, onSubmit, onClose }: AboutFinishGroupModalProps) => {
    const isTablet = useMedia("md");

    return (
        <Flex direction="column" gap={24}>
            <MainInfo data={data} />
            <AvailableDateInfo availableTo={data.availableTo} />
            <Flex gap={8}>
                <Button size={isTablet ? "medium" : "large"} variant="border" leftIcon={<IconStarDefault />} onClick={onSubmit} w="50%">
                    Оценить
                </Button>
                <Button size={isTablet ? "medium" : "large"} variant="secondary" onClick={onClose} w="50%">
                    Спасибо
                </Button>
            </Flex>
        </Flex>
    );
};

export default AboutFinishGroupModal;
