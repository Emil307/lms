import { useRouter } from "next/router";
import React, { SetStateAction, useEffect, useMemo } from "react";
import { closeModal, openModal } from "@mantine/modals";
import { useSession } from "@entities/auth";
import { SelectPaymentTypeModal } from "@features/payment";
import { AuthForm } from "@features/auth";
import { PaymentEntityType } from "@entities/payment";
import { useCreateFreeTransaction } from "@entities/transaction";

interface UseAuthPayProps {
    entityId: number;
    entityName: string;
    entityType: PaymentEntityType;
    entityPrice: number;
    setOpened?: React.Dispatch<SetStateAction<boolean>>;
}

export const useAuthPay = ({ entityType, entityId, entityName, entityPrice, setOpened }: UseAuthPayProps) => {
    const router = useRouter();
    const { user } = useSession();

    const { mutate: createFreeTransaction, isLoading } = useCreateFreeTransaction({ entityType, entityId });

    useEffect(() => {
        if (router.isReady && user && router.query.buy === "true") {
            const { buy, ...query } = router.query;
            router.replace({ pathname: router.pathname, query }, undefined, { shallow: true }).then(() => buyEntity());
        }
    }, [user, router.query, router.isReady]);

    const buyEntity = () => {
        if (entityPrice) {
            if (setOpened) {
                return setOpened(true);
            }
            return openSelectPaymentTypeModal();
        }
        createFreeTransaction(null, {
            onSuccess: () => {
                if (entityType === "articlePackage") {
                    return router.push({ pathname: "/articles", query: { tab: "my-articles" } });
                }
                router.push("/my-courses");
            },
        });
    };

    const handleSuccessAuthModal = () => {
        closeModal("AUTH");
        router.replace({ pathname: router.pathname, query: { ...router.query, buy: "true" } });
    };

    const handleCloseSelectPaymentTypeModal = () => {
        closeModal("SELECT_PAYMENT_TYPE");
    };

    const selectPaymentTypeModalTitle = useMemo(() => {
        switch (entityType) {
            case "course":
                return `Получить доступ к курсу «${entityName}»`;
            case "articlePackage":
                return `Получить доступ к подборке статей «${entityName}»`;
        }
    }, [entityType]);

    const openSelectPaymentTypeModal = () => {
        openModal({
            modalId: "SELECT_PAYMENT_TYPE",
            title: selectPaymentTypeModalTitle,
            children: <SelectPaymentTypeModal entityType={entityType} entityId={entityId} onClose={handleCloseSelectPaymentTypeModal} />,
        });
    };

    const openAuthModal = () => {
        openModal({
            modalId: "AUTH",
            title: "Авторизация",
            children: <AuthForm onSuccess={handleSuccessAuthModal} skipRedirectAfterAuth p={0} />,
        });
    };

    const handleBuyEntity = () => {
        if (user) {
            return buyEntity();
        }

        if (setOpened) {
            return router.push(
                { pathname: router.pathname, query: { ...router.query, action: "auth", redirect: "none", buy: "true" } },
                undefined,
                { shallow: true }
            );
        }
        openAuthModal();
    };

    return { handleBuyEntity, isLoading };
};
