/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.ibb.co',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'xzfcosekgkctmoepyywr.supabase.co',
            port: '',
          }
        ],
      },

}

module.exports = nextConfig
