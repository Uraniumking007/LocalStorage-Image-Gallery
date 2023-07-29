import path from "path";

export default {
  publicDir: path.resolve(__dirname, "public"),
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/index.html"),
        about: path.resolve(__dirname, "src/about.html"),
      },
    },
  },
};
