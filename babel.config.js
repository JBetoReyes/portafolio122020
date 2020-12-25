module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV);
    return {
        compact: true,
        presets: [
            '@babel/env',
            '@babel/react',
            '@babel/typescript'
        ]
    };
};