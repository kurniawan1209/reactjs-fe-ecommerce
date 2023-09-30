import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to indicate an error occurred.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error or perform other actions here.
        console.error('Error caught by error boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render an error message or fallback UI when an error occurs.
            return <div>Something went wrong. Please try again later.</div>;
        }

        // Render the child components if no error occurred.
        return this.props.children;
    }
}

export default ErrorBoundary;
