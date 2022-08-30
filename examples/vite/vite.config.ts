import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import subfont from "@ernxst/subfont/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), subfont()],
});
