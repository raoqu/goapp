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
      }),
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
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // Force vuedraggable to a UMD build compatible with Rollup/Vite
        'vuedraggable': 'vuedraggable/dist/vuedraggable.umd.js'
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
    css: {
      preprocessorOptions: {
        scss: {
          // Suppress Sass deprecation warnings coming from dependencies in node_modules
          quietDeps: true,
          // Silence specific deprecation categories if supported by the local sass version
          // target slash division, @import, and legacy JS API warnings
          silenceDeprecations: ['slash-div', 'import', 'legacy-js-api'],
          // Preload sass:math so local styles can migrate to math.div without repeating the directive
          additionalData: '@use "sass:math";\n'
        }
      }
    },
    build: {
      outDir: 'dist'
    }
  }
})
