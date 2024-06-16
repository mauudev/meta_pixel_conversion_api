import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/meta_pixel_conversion_api/",
  plugins: [react()],
});
