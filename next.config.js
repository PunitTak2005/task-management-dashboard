/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        module: false,
        perf_hooks: false,
        v8: false,
      };
    }
    return config;
  },
  turbopack: {},
};

module.exports = nextConfig;
