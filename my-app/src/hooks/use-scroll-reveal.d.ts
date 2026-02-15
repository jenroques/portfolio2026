interface UseScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}
export declare function useScrollReveal({ threshold, rootMargin, triggerOnce, }?: UseScrollRevealOptions): {
    ref: import("react").RefObject<HTMLElement | null>;
    isVisible: boolean;
};
export {};
