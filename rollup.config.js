import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import sass from "rollup-plugin-sass";

export default {
  preserveModules: true,
  input: "src/index.tsx",
  output: [
    {
      dir: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    sass({ insert: true }),
    ,
    typescript({ objectHashIgnoreUnknownHack: true }),
  ],
  external: ["react", "react-dom"],
};
