export const config = {
  secrets: {
    jwt: 'SecretKeyDev'
  },
  database:'aluka',
  dbUrl: () => process.env.MONGO_URI_DEV
}