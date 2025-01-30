export default [
    {
        input: 'src/index.js',
        external: ['playcanvas'],
        output: {
            file: 'dist/tween.mjs',
            format: 'esm'
        },
        treeshake: {
            moduleSideEffects: false // Ensure unused exports are kept if explicitly imported
        }
    },
    {
        input: 'src/pc-entry.js',
        external: ['playcanvas'],
        output: {
            file: 'dist/tween.umd.js',
            format: 'umd',
            globals: {
                playcanvas: 'pc'
            }
        },
        treeshake: {
            moduleSideEffects: false // Ensure unused exports are kept if explicitly imported
        }
    }
];
