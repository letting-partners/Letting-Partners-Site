import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    // The portal is a separate application with its own eslint config and its
    // own lint script; linting it from here would use the wrong settings.
    ignores: ["portal/**", ".next/**", "node_modules/**"],
  },
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
