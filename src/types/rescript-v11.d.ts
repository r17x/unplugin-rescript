/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type SourceItem =
	| {
			/**
			 * name of the directory
			 */
			dir: string;
			type?: "dev";
			files?:
				| string[]
				| {
						/**
						 * Regex to glob the patterns, syntax is documented [here](http://caml.inria.fr/pub/docs/manual-ocaml/libref/Str.html), for better incremental build performance, we'd suggest listing files explicitly
						 */
						"slow-re"?: string;
						/**
						 * Files to be excluded
						 */
						excludes?: string[];
						[k: string]: unknown;
				  };
			/**
			 * (WIP) Files generated in dev time
			 */
			generators?: BuildGenerator[];
			/**
			 * Default: export all modules. It is recommended for library developers to hide some files/interfaces
			 */
			public?: string[] | "all";
			resources?: string[];
			subdirs?: SubDirectories;
			/**
			 * Not implemented yet
			 */
			group?:
				| string
				| {
						name?: string;
						/**
						 * When true, all subdirs are considered as a whole as dependency
						 */
						hierachy?: boolean;
						[k: string]: unknown;
				  };
			"internal-depends"?: string[];
			[k: string]: unknown;
	  }
	| SingleNonNestedDirectory;
export type SubDirectories = (SourceItem[] | SourceItem1) | boolean;
/**
 * A single source item
 */
export type SourceItem1 =
	| {
			/**
			 * name of the directory
			 */
			dir: string;
			type?: "dev";
			files?:
				| string[]
				| {
						/**
						 * Regex to glob the patterns, syntax is documented [here](http://caml.inria.fr/pub/docs/manual-ocaml/libref/Str.html), for better incremental build performance, we'd suggest listing files explicitly
						 */
						"slow-re"?: string;
						/**
						 * Files to be excluded
						 */
						excludes?: string[];
						[k: string]: unknown;
				  };
			/**
			 * (WIP) Files generated in dev time
			 */
			generators?: BuildGenerator[];
			/**
			 * Default: export all modules. It is recommended for library developers to hide some files/interfaces
			 */
			public?: string[] | "all";
			resources?: string[];
			subdirs?: SubDirectories;
			/**
			 * Not implemented yet
			 */
			group?:
				| string
				| {
						name?: string;
						/**
						 * When true, all subdirs are considered as a whole as dependency
						 */
						hierachy?: boolean;
						[k: string]: unknown;
				  };
			"internal-depends"?: string[];
			[k: string]: unknown;
	  }
	| SingleNonNestedDirectory;
export type SingleNonNestedDirectory = string;
export type Dependency = string;
/**
 * ReScript dependencies of the library, like in package.json. Currently searches in `node_modules`
 */
export type Dependencies = Dependency[];
/**
 * ReScript dev dependencies of the library, like in package.json. Currently searches in `node_modules`
 */
export type Dependencies1 = Dependency[];
/**
 * Those dependencies are pinned (since version 8.4)
 */
export type Dependencies2 = Dependency[];
/**
 * Build the given dependencies in JSX V3 compatibility mode.
 */
export type Dependencies3 = Dependency[];
/**
 * Whether to apply the [RescriptReact](https://github.com/rescript-lang/rescript-react)-specific JSX PPX transformation.
 */
export type JsxVersion = number;
/**
 * PPX macros to pass to compiler. The syntax is package_name/binary, for example: `reason/reactjs_jsx_ppx_3.native`. Currenly searches in `node_modules`
 */
export type PpxSpecs = (string | string[])[];
export type PackageSpec = ModuleFormat | ModuleFormatObject;
/**
 * es6-global generate relative `require` paths instead of relying on NodeJS' module resolution. Default: commonjs.
 */
export type ModuleFormat = "commonjs" | "es6" | "es6-global";
/**
 * suffix of generated js files, default to [.js]
 */
export type SuffixSpec =
	| ".js"
	| ".mjs"
	| ".cjs"
	| ".bs.js"
	| ".bs.mjs"
	| ".bs.cjs";
/**
 * (internal) Used by bsb to build to different targets: native (ocamlopt), bytecode (ocamlc) or JS (bsc)
 */
export type Entries = TargetItems[];

/**
 * All paths are required to be in **Unix format** (foo/bar), the build system normalizes them for other platforms internally
 */
export interface ReScriptBuildConfiguration {
	/**
	 * The semantic version of the ReScript library
	 */
	version?: string;
	/**
	 * Package name
	 */
	name: string;
	/**
	 * can be true/false or a customized name
	 */
	namespace?: boolean | string;
	/**
	 * Source code location
	 */
	sources: SourceItem[] | SourceItem1;
	/**
	 * a list of directories that bsb will not look into
	 */
	"ignored-dirs"?: string[];
	"bs-dependencies"?: Dependencies;
	"bs-dev-dependencies"?: Dependencies1;
	"pinned-dependencies"?: Dependencies2;
	/**
	 * (WIP) Pre defined rules
	 */
	generators?: RuleGenerator[];
	/**
	 * Ignore generators, cut the dependency on generator tools
	 */
	"cut-generators"?: boolean;
	jsx?: JsxSpecs;
	reason?: ReasonSpecs;
	gentypeconfig?: GentypeSpecs;
	/**
	 * Flags passed to bsc.exe
	 */
	"bsc-flags"?:
		| string[]
		| {
				kind?: "reset" | "prefix" | "append";
				flags?: string[];
				[k: string]: unknown;
		  };
	/**
	 * warning numbers and whether to turn it into error or not
	 */
	warnings?: {
		/**
		 * Default: -40+6+7+27+32..39+44+45 [Here](https://caml.inria.fr/pub/docs/manual-ocaml/comp.html#sec270) for the meanings of the warning flags
		 */
		number?: string;
		error?: boolean | string;
		[k: string]: unknown;
	};
	"ppx-flags"?: PpxSpecs;
	/**
	 * preprocessors to pass to compiler. The syntax is package_name/binary, for example: `pp/syntax.exe`. Currenly searches in `node_modules`
	 */
	"pp-flags"?: string;
	"js-post-build"?: JsPostBuild;
	/**
	 * ReScript can currently output to [Commonjs](https://en.wikipedia.org/wiki/CommonJS), and [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
	 */
	"package-specs"?: PackageSpec[] | PackageSpec;
	entries?: Entries;
	/**
	 * Whether to generate the `.merlin` file for [Merlin](https://github.com/ocaml/merlin). Default: true
	 */
	"generate-merlin"?: boolean;
	/**
	 * (Experimental) whether to use the OCaml standard library. Default: true
	 */
	"use-stdlib"?: boolean;
	/**
	 * Use the external stdlib library instead of the one shipped with the compiler package
	 */
	"external-stdlib"?: string;
	/**
	 * (Not needed usually) external include directories, which will be applied `-I` to all compilation units
	 */
	"bs-external-includes"?: string[];
	suffix?: SuffixSpec;
	reanalyze?: Reanalyze;
}
/**
 * Note that we will add the directory path accordingly
 */
export interface BuildGenerator {
	name?: string;
	edge?: string[];
	[k: string]: unknown;
}
/**
 * The shell command is running in *dev* time, and you generated could should be checked in, the depedency is tracked properly during dev time,example: `{ "name" : "ocamllex", "command" : "ocamllex.opt $in -o $out"}`
 */
export interface RuleGenerator {
	name?: string;
	command?: string;
	[k: string]: unknown;
}
/**
 * Configuration for the JSX transformation.
 */
export interface JsxSpecs {
	/**
	 * Whether to apply the specific version of JSX PPX transformation
	 */
	version: 3 | 4;
	/**
	 * JSX module, currently only support the React.
	 */
	module?: "react";
	/**
	 * JSX transformation mode
	 */
	mode?: "classic" | "automatic";
	"v3-dependencies"?: Dependencies3;
}
/**
 * ReScript comes with [Reason](http://reasonml.github.io/) by default. Specific configurations here.
 */
export interface ReasonSpecs {
	"react-jsx"?: JsxVersion;
	[k: string]: unknown;
}
/**
 * gentype config, see cristianoc/genType for more details
 */
export interface GentypeSpecs {
	path?: string;
	[k: string]: unknown;
}
/**
 * (Experimental) post-processing hook. bsb will invoke `cmd ${file}` whenever a `${file}` is changed
 */
export interface JsPostBuild {
	cmd?: string;
	[k: string]: unknown;
}
export interface ModuleFormatObject {
	module: ModuleFormat;
	/**
	 * Default: false.
	 */
	"in-source"?: boolean;
	suffix?: SuffixSpec;
	[k: string]: unknown;
}
export interface TargetItems {
	/**
	 * The compiler to use for the target
	 */
	kind?: "native" | "bytecode" | "js";
	/**
	 * Name of the main module used as entry point for this target. 'entry-point' isn't used when this project is built as a dependency.
	 */
	main?: string;
	[k: string]: unknown;
}
/**
 * Configure reanalyze, a static code analysis tool for ReScript.
 */
export interface Reanalyze {
	/**
	 * The types of analysis to activate. `dce` means dead code analysis, `exception` means exception analysis, and `termination` is to check for infinite loops.
	 */
	analysis?: ("dce" | "exception" | "termination")[];
	/**
	 * Paths for any folders you'd like to exclude from analysis. Useful for bindings and similar. Example: `["src/bindings"]`.
	 */
	suppress?: string[];
	/**
	 * Any specific paths inside suppressed folders that you want to unsuppress. Example: ["src/bindings/SomeBinding.res"].
	 */
	unsuppress?: string[];
	[k: string]: unknown;
}
