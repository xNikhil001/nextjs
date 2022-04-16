import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";

const options = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0", 
  })
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.uid = token.sub
      return session
    } 
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  debug:true
}

export default (req,res)=>NextAuth(req,res,options)