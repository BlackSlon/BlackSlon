/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Usunęliśmy output: 'export', aby umożliwić dynamiczne trasy dla BSZ
  // Usunęliśmy distDir: 'out', bo OpenNext używa własnego folderu .open-next
};

module.exports = nextConfig;