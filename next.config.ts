import type { NextConfig } from 'next';
import { createRequire } from 'node:module';
import { dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const nextPackageRoot = dirname(require.resolve('next/package.json'));
const turbopackRoot = findCommonDirectory(appRoot, nextPackageRoot);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  turbopack: {
    root: turbopackRoot,
  },
  devIndicators: {
    position: 'bottom-right',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

function findCommonDirectory(firstPath: string, secondPath: string) {
  const firstParts = firstPath.split(sep).filter(Boolean);
  const secondParts = secondPath.split(sep).filter(Boolean);
  const commonParts: string[] = [];

  for (let index = 0; index < firstParts.length; index += 1) {
    const firstPart = firstParts[index];

    if (!firstPart || firstPart !== secondParts[index]) {
      break;
    }

    commonParts.push(firstPart);
  }

  return commonParts.length > 0 ? `${sep}${commonParts.join(sep)}` : sep;
}

export default nextConfig;
