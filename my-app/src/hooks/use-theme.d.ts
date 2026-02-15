export type Theme = 'light' | 'dark';
export declare function useTheme(): {
    theme: Theme;
    setTheme: import("react").Dispatch<import("react").SetStateAction<Theme>>;
    toggleTheme: () => void;
};
