import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = [
    ...nextVitals,
    ...nextTs,
    { ignores: ['.next/**', 'out/**', 'next-env.d.ts'] },
    // The portfolio uses plain <img> on purpose; switch to next/image later if wanted.
    {
        rules: {
            '@next/next/no-img-element': 'off',
            // App Router: the root layout is the correct place for font <link> tags.
            '@next/next/no-page-custom-font': 'off',
        },
    },
];

export default eslintConfig;
