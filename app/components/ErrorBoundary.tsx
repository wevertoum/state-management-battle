import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error caught in ErrorBoundary:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || <p className='text-red-500'>Algo deu errado.</p>
      );
    }
    return this.props.children;
  }
}
