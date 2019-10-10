import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const NODE_ENV = process.env.ENV || 'development';
const outputFile = NODE_ENV === 'production' ? './lib/prod.js' : './lib/dev.js';

export default [{
	input: './src/index.js',
	output: {
		file: outputFile,
		format: 'cjs',
		name: 'dist/bundle.js',
	},
	external: [
		'react',
		'react-proptypes',
		'styled-components',
	],
	plugins: [
		resolve({ extension: ['.jsx', '.js'] }),
		replace({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
		}),
		babel({
			exclude: 'node_modules/**',
		}),
		commonjs({
			include: ['node_modules/**'],
			namedExports: {
				'node_modules/react/index.js': [
					'cloneElement',
					'createContext',
					'Component',
					'createElement',
					'useState',
					'useEffect',
					'useRef',
				],
				'node_modules/react-is/index.js': [
					'isElement',
					'isValidElementType',
					'ForwardRef',
				],
			},
		}),
		uglify(),
	],
}];
