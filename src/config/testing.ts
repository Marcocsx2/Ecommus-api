export const config = {
  secrets: {
    jwt: 'SecretKeyTest'
  },
  database:'aluka',
  dbUrl: () => process.env.MONGO_URI_DEV
}
