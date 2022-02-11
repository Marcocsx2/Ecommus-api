export const config = {
  secrets: {
    jwt: 'SecretKeyProd'
  },
  database:"aluka",
  dbUrl: () => process.env.MONGO_URI,
}
