import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue2(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/icons/svg')],
        symbolId: 'icon-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      // allow importing Vue SFCs without specifying .vue
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    define: {
      // provide empty process.env so legacy code won't crash
      'process.env': {}
    },
    server: {
      port: 9527,
      open: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true
          // no rewrite: keep /api prefix as requested
        }
      }
    },
    build: {
      outDir: 'dist'
    },
    plugins: [
      // existing plugins
      vue2(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/icons/svg')],
        symbolId: 'icon-[name]'
      }),
      // custom resolver to support importing directories as index.vue
      {
        name: 'resolve-vue-index',
        enforce: 'pre',
        resolveId(source, importer) {
          // only handle relative or alias imports
          if (!source) return null
          const isRelative = source.startsWith('.')
          const isAlias = source.startsWith('@/')
          if (!isRelative && !isAlias) return null

          const basedir = importer ? path.dirname(importer) : process.cwd()
          const resolved = isAlias
            ? source.replace(/^@\//, path.resolve(__dirname, 'src/') )
            : path.resolve(basedir, source)

          // 1) If it's a directory, map to index.vue
          try {
            const stat = fs.statSync(resolved)
            if (stat.isDirectory()) {
              const candidate = path.join(resolved, 'index.vue')
              if (fs.existsSync(candidate)) return candidate
              const candidateJs = path.join(resolved, 'index.js')
              if (fs.existsSync(candidateJs)) return candidateJs
            }
          } catch (e) {
            // not a directory, continue
          }

          // 2) If it's a file path without extension and .vue exists, resolve it
          const vueCandidate = `${resolved}.vue`
          if (fs.existsSync(vueCandidate)) return vueCandidate
          return null
        }
      }
    ]
  }
})
