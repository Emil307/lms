import { Flex } from "@mantine/core";
import React from "react";
import { ControlButtons } from "@shared/ui";
import IconStarDefault from "public/icons/icon24px/rating/star-default.svg";
import { GetGroupResponse } from "@entities/group";
import { AvailableDateInfo, MainInfo } from "./components";

export interface AboutFinishGroupModalProps {
    data: GetGroupResponse;
    onSubmit: () => void;
    onClose: () => void;
}

const AboutFinishGroupModal = ({ data, onSubmit, onClose }: AboutFinishGroupModalProps) => {
    return (
        <Flex direction="column" gap={24}>
            <MainInfo data={data} />
            <AvailableDateInfo availableTo={data.availableTo} />
            <ControlButtons
                variant="modal"
                cancelButtonText="Оценить"
                submitButtonText="Спасибо"
                onSubmit={onClose}
                onClose={onSubmit}
                cancelButtonProps={{ leftIcon: <IconStarDefault /> }}
            />
        </Flex>
    );
};

export default AboutFinishGroupModal;
