import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'index.js',
    output: [{ file: 'build/index.js', format: 'esm' }],
    plugins: [
      nodeResolve(), // подключение модулей node
      commonJs(), // подключение модулей commonjs
    //   sizeSnapshot(), // напишет в консоль размер бандла
      terser(), // минификатор совместимый с ES2015+, форк и наследник UglifyES
      visualizer(), // анализатор бандла
    ],
  },
];
