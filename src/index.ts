import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import type { Options } from "./types";
import { loadResConfig } from "./load-resconfig";
import { dirname, resolve } from "path";
import { readFileSync, existsSync } from "fs";
import { promisify } from "util";
import { exec as exec_ } from "child_process";
import { npmRunPathEnv } from "npm-run-path";

const exec = promisify(exec_);
export const unpluginFactory: UnpluginFactory<Options | undefined> = (opt) => {
	const options = Object.assign(
		{
			cwd: process.cwd(),
			rescriptConfig: "resconfig.json",
		},
		opt,
	);

	const rescriptConfig = Object.assign(
		{ suffix: ".res.js" },
		loadResConfig(options.cwd, options.rescriptConfig) || {},
	);

	const fileTypes = [".res"];

	const getNewId = (id: string) =>
		id.replace(fileTypes[0], rescriptConfig.suffix);
	const getJSFile = (id: string) =>
		id.replace(fileTypes[0], rescriptConfig.suffix);
	const hasJSFile = (id: string) => existsSync(getJSFile(id));
	// const hasNewId = (id: string) => id.endsWith(rescriptConfig.suffix)
	const hasResFile = (id: string) => fileTypes.some((ext) => id.endsWith(ext));
	const hasNotResFile = (id: string) => !hasResFile(id);
	// const getOriginalId = (id: string) => getNewId(id).replace(rescriptConfig.suffix, "")

	let rescriptProcess: (() => void) | null = null;

	return {
		name: "unplugin-rescript",
		enforce: "pre",
		resolveId(id, importer, _options) {
			if (hasResFile(id)) {
				const newId = getNewId(id);

				if (!importer) {
					return newId;
				}

				return resolve(dirname(importer), newId);
			}
		},
		buildEnd() {
			if (rescriptProcess) {
				rescriptProcess();
			}
		},
		async buildStart() {
			const controller = new AbortController();
			const { signal } = controller;
			const { stdout, stderr } = await exec("rescript build -with-deps", {
				signal,
				env: npmRunPathEnv(),
			});
			if (stdout) {
				stdout
					.trim()
					.split("\n")
					.forEach(
						(line) =>
							String(line).length > 0 &&
							console.info("[unplugin-rescript:compiler]", line),
					);
			}
			if (stderr) {
				stderr
					.trim()
					.split("\n")
					.forEach(
						(line) =>
							String(line).length > 0 &&
							console.error("[unplugin-rescript:compiler]", line),
					);
			}
			rescriptProcess = () => {
				if (!signal.aborted) {
					controller.abort();
				}
			};
		},
		loadInclude(id) {
			return hasResFile(id);
		},
		load(id) {
			if (hasNotResFile(id)) return null;
			if (hasJSFile(id)) {
				const jsFile = getJSFile(id);
				this.addWatchFile(jsFile);
				return { code: readFileSync(jsFile, "utf8") };
			}
		},
	};
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
