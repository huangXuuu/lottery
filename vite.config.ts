import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';
import ViteImages from 'vite-plugin-vue-images';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2097152
  },
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule): void => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/index.scss";`
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    VueSetupExtend,
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      dts: './src/auto-imports.d.ts',
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      dts: './src/components.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: true
        })
      ]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string): string => {
            return `element-plus/theme-chalk/${name}.css`;
          }
        }
      ]
    }),
    ViteImages({
      dirs: ['src/assets/images']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
});
