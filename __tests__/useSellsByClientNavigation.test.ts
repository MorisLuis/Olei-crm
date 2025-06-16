import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useSellsByClientNavigation } from '@/app/dashboard/sells/general/[id]/useSellsByClientNavigation';
import { useNavigationContext } from '@/context/Navigation/NavigationContext';
import { SellsInterface } from '@/interface/sells';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

jest.mock('@/context/Navigation/NavigationContext', () => ({
    useNavigationContext: jest.fn()
}));

describe('useSellsByClientNavigation', () => {
    const pushMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    });

    it('navigateToCloseModal removes sellId from query', () => {
        (useNavigationContext as jest.Mock).mockReturnValue({
            currentRoute: '/dashboard/sells/general?clientId=123&sellId=456',
            previousRoute: null
        });

        const { result } = renderHook(() => useSellsByClientNavigation());

        act(() => {
            result.current.navigateToCloseModal();
        });

        expect(pushMock).toHaveBeenCalledWith('/dashboard/sells/general?clientId=123');
    });

    it('navigateToBack navigates to previousRoute if available', () => {
        (useNavigationContext as jest.Mock).mockReturnValue({
            currentRoute: '/current',
            previousRoute: '/previous'
        });

        const { result } = renderHook(() => useSellsByClientNavigation());

        act(() => {
            result.current.navigateToBack();
        });

        expect(pushMock).toHaveBeenCalledWith('/previous');
    });

    it('navigateToBack navigates to default if no previousRoute', () => {
        (useNavigationContext as jest.Mock).mockReturnValue({
            currentRoute: '/current',
            previousRoute: null
        });

        const { result } = renderHook(() => useSellsByClientNavigation());

        act(() => {
            result.current.navigateToBack();
        });

        expect(pushMock).toHaveBeenCalledWith('/dashboard/sells/general');
    });

    it('onSelectClient adds sellId to currentRoute', () => {
        (useNavigationContext as jest.Mock).mockReturnValue({
            currentRoute: '/dashboard/sells/general?clientId=123',
            previousRoute: null
        });

        const { result } = renderHook(() => useSellsByClientNavigation());

        act(() => {
            result.current.onSelectClient({ UniqueKey: 'abc123' } as SellsInterface);
        });

        expect(pushMock).toHaveBeenCalledWith('/dashboard/sells/general?clientId=123&sellId=abc123');
    });
});
