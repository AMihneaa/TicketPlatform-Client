import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import genezioLocalSDKReload from "@genezio/vite-plugin-genezio";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), genezioLocalSDKReload(), tailwindcss()],
});
