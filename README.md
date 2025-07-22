# Ista Portal SPA

[![Minimum node version](https://img.shields.io/badge/min%20node-16.20.1-orange?style=for-the-badge&logo=node.js)](https://nodejs.org/en/) [![Minimum npm version](https://img.shields.io/badge/min%20npm-8.19.4-orange?style=for-the-badge&logo=npm)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

[![Recommended node version](https://img.shields.io/badge/rec%20node-20.5.1-blue?style=for-the-badge&logo=node.js)](https://nodejs.org/en/) [![Recommended pnpm](https://img.shields.io/badge/rec%20pnpm-8.6.12-blue?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

**AS A PACKAGE MANAGER, I HIGHLY RECOMMEND USING** [PNPM](https://pnpm.io/)

**AS A NODE.JS VERSION MANAGER, I HIGHLY RECOMMEND USING** [NVM](https://github.com/nvm-sh/nvm)

# Installation

```bash
git clone repo_url
cd project_location
pnpm i
```

Create .env file in the root of the project and add:

```bash
DEV_API_URL = 'https://localhost:9001/api/v1'
PROD_API_URL = 'http://vdma-api.rc.ista.net:9001/api/v1'
```

# Scripts

**Start developer mode (support hot reload)**

```bash
pnpm dev
```

**Start production mode (with some build optimizations)**

```bash
pnpm prod
```

**Dev & prod scripts use the 8080 port**

```bash
http://localhost:8080/
```

**Clean build folder**

```bash
pnpm clean
```

**Build application for deploy**

```bash
pnpm buildapp
```

**Clean build folder & rebuild application for deploy**

```bash
pnpm build
```

**Start webpack plugin for bundle analyze**

```bash
pnpm analyze
```

**Husky utility script, starts only once, at the packages installation (not need to be manually called anytime)**

```bash
pnpm prepare
```

**Start formatter check on all files**

```bash
pnpm prettier
```

**Start formatter autofix on all files**

```bash
pnpm prettier:fix
```

**Start eslint check on all files**

```bash
pnpm lint
```

**Start eslint autofix on all files**

```bash
pnpm lint:fix
```

**Start eslint autofix only on git staged files**

```bash
pnpm lint:fix-staged
```

**Start stylelint check on all files**

```bash
pnpm lint:css
```

**Start stylelint autofix on all files**

```bash
pnpm lint:css:fix
```

**Start stylelint autofix only on git staged files**

```bash
pnpm lint:css:fix-staged
```

**Start prettier, eslint & stylelint check processes in order**

```bash
pnpm lint-all
```

**Start prettier, eslint & stylelint autofix processes in order**

```bash
pnpm fix-all
```

**Start lint-staged fix scripts from .lintstagedrc on git staged files (husky automatically call it on git pre-commit hook)**

```bash
pnpm fix-staged
```

**Start svgo on passed svg file (size optimization)**

```bash
pnpm svgo $FILE_PATH
```

**Start svgo on all svg files in the project (size optimization)**

```bash
pnpm svgo-all
```

# Known issues:

Temporary disabled postcss stylelint due to that it and stylelint-prettier don't support ESM
