import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
    async session({ session, token, user }) {
      session.user.uid = token.sub
      return session
    } 
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug:true
}

export default (req,res)=>NextAuth(req,res,options)