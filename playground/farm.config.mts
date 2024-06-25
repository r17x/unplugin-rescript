import { defineConfig } from "@farmfe/core";
import UnpluginVite from "../src/vite";
import Unplugin from "../src/farm";

//const createVitePlugin = () => ({
//  vitePlugin: UnpluginVite(),
//  filters: {
//    moduleTypes: ['ts', 'tsx'],
//  },
//})

export default defineConfig({
	root: process.cwd(), // compiled root directory
	// compile options
	compilation: {
		input: {
			index: "./index.html",
		},
	},
	plugins: [Unplugin()],
	vitePlugins: [
		// plugin configuration
		// createVitePlugin
	],
});
