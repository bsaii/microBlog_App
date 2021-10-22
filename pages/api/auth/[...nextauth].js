import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // database: "", //url to db,
  // session: {
  //   //lettng jwt to handle sessions
  //   jwt: true,
  // },
  // jwt: {
  //   secret: "", //randomly typed
  // },
  // //for getting a user id which can be used in a CRUD application
  // callbacks: {
  //   async jwt(token, user) {
  //     //adding the id to the token
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  //   //adding the id to the session obj
  //   async session(session, token) {
  //     session.user.id = token.id;
  //     return session;
  //   },
  // },
});
