import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/commonjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    preserveModules: true,
    plugins: [
      babel({
        extensions: ['.ts', '.js'],
        babelHelpers: 'bundled',
      }),
      typescript({
        exclude: ['src/**/*.spec.ts'],
        outDir: 'dist/commonjs',
        declaration: true,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/es',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    preserveModules: true,
    plugins: [
      typescript({
        exclude: ['src/**/*.spec.ts'],
        outDir: 'dist/es',
        declaration: true,
      }),
    ],
  },
];
