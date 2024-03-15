/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images:{
        domains:['lh3.googleusercontent.com']
    }
    // to prevent useeffect to load twise 
};

export default nextConfig;
