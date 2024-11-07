import React, { ErrorInfo } from "react";

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorCode: number | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, errorCode: null };
    }

    static getDerivedStateFromError(error: any): ErrorBoundaryState {
        return { hasError: true, errorCode: error.code || null };
    }

    componentDidCatch(error: any, errorInfo: ErrorInfo) {
        console.error("Error occurred:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, errorCode: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.state.errorCode === 429) {
                return <></>;
            }

            return <h1>Что-то пошло не так.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
