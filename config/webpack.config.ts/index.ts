export default (env = 'production') => {
    process.env.NODE_ENV = 'development';
    return [require('./server.dev').default];
};