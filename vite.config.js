import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量
  const env = loadEnv(mode, process.cwd())
  return {
    base: "/app",
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      })],
    //解析配置
    resolve: {
      //路径别名
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      open: false,
      //配置请求代理
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://127.0.0.1:5179",
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
        },
      }
    }
  }
})
