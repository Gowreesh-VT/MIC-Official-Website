import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

// Wrap the parser to support ESLint 10's scopeManager.addGlobals requirement
const patchedNextVitals = nextVitals.map(config => {
  if (config.languageOptions?.parser) {
    const originalParser = config.languageOptions.parser;
    
    const wrappedParser = {
      ...originalParser,
      parse(text, options) {
        return originalParser.parse(text, options);
      },
      parseForESLint(text, options) {
        const result = originalParser.parseForESLint(text, options);
        if (result && result.scopeManager && typeof result.scopeManager.addGlobals !== 'function') {
          result.scopeManager.addGlobals = function(names) {
            const globalScope = this.scopes?.[0];
            if (!globalScope) return;
            
            if (!globalScope.set) {
              globalScope.set = new Map();
            }
            
            for (const name of names) {
              if (!globalScope.set.has(name)) {
                const variable = {
                  name,
                  eslintImplicitGlobalSetting: undefined,
                  eslintExplicitGlobal: false,
                  eslintExplicitGlobalComments: undefined,
                  writeable: false,
                  identifiers: [],
                  references: [],
                  defs: []
                };
                globalScope.set.set(name, variable);
                if (Array.isArray(globalScope.variables)) {
                  globalScope.variables.push(variable);
                }
              }
            }
            
            this.globalScope?.addVariables?.(names);
          };
        }
        return result;
      }
    };
    
    return {
      ...config,
      languageOptions: {
        ...config.languageOptions,
        parser: wrappedParser
      }
    };
  }
  return config;
});

const eslintConfig = defineConfig([
  ...patchedNextVitals,
  {
    settings: {
      react: {
        version: "19.0"
      }
    }
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
