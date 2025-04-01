"use client"; // 👈 Esto fuerza a Next.js a tratarlo como Client Component

import { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() : { hasError: boolean } {
        return { hasError: true };
    }

    componentDidCatch(error: Error) : void {
        console.error("Error en la UI:", error);
    }

    render() : ReactNode {
        if (this.state.hasError) {
            return <h2>Ocurrió un error. Recarga la página.</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
