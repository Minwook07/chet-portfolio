import { useCallback, useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
    listeners.add(callback);
    window.addEventListener('storage', callback);
    return () => {
        listeners.delete(callback);
        window.removeEventListener('storage', callback);
    };
}

function notifyAll() {
    listeners.forEach(listener => listener());
}

/**
 * SSR-safe localStorage string state.
 * The server (and first client render) use `fallback`; the saved value
 * is applied right after hydration, so markup never mismatches.
 */
export function useLocalStorage(key: string, fallback: string) {
    const value = useSyncExternalStore(
        subscribe,
        () => localStorage.getItem(key) ?? fallback,
        () => fallback,
    );

    const setValue = useCallback(
        (next: string) => {
            localStorage.setItem(key, next);
            notifyAll();
        },
        [key],
    );

    return [value, setValue] as const;
}
