module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgres://xxwzydabjjoglq:72080ccfd7810a63e317a85f68cbac0e791e70082a7de829e274104e7f1e0332@ec2-35-169-92-231.compute-1.amazonaws.com:5432/d6gon6q6prri39',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    apiKey: process.env.apiKey || '',
    CLIENT_ORIGIN: '*',
    PGSSLMODE: "require"
}
