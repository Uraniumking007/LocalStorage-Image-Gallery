import path from "path";

export default {
  publicDir: path.resolve(__dirname, "public"),
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/index.html"),
        dashboard: path.resolve(__dirname, "src/dashboard/dashboard.html"),
        users: path.resolve(__dirname, "src/users/users.html"),
        login: path.resolve(__dirname, "src/login.html"),
      },
    },
  },
};
