import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0"
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
  secrete: process.env.NEXTAUTH_SECRET,
  debug:true
}

export default (req,res)=>NextAuth(req,res,options)