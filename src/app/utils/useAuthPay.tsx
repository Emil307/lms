import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { closeModal, openModal } from "@mantine/modals";
import { useSession } from "@entities/auth";
import { SelectPaymentTypeModal } from "@features/payment";
import { AuthForm } from "@features/auth";
import { PaymentEntityType } from "@entities/payment";

interface UseAuthPayProps {
    entityId: number;
    entityName: string;
    entityType: PaymentEntityType;
}

export const useAuthPay = ({ entityType, entityId, entityName }: UseAuthPayProps) => {
    const router = useRouter();
    const { user } = useSession();

    useEffect(() => {
        if (router.isReady && user && router.query.buy === "true") {
            const { buy, ...query } = router.query;
            router.replace({ pathname: router.pathname, query }, undefined, { shallow: true }).then(() => openSelectPaymentTypeModal());
        }
    }, [user, router.query, router.isReady]);

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
            case "coursePackage":
                return `Получить доступ к подборке курсов «${entityName}»`;
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
            return openSelectPaymentTypeModal();
        }
        openAuthModal();
    };

    return { handleBuyEntity };
};
