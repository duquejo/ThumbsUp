import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [
        ...configDefaults.exclude,
        'e2e/*',
        '**/*.d.ts',
        '**/*.cjs',
      ],
      coverage: {
        exclude: [
          ...configDefaults.coverage.exclude!,
          '**/main.ts',
          '**/assets/**',
          '**/interfaces/*.ts',
          '**/*.d.ts',
          'tests/integration/**',
          '**/*.cjs',
        ]
      },
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
