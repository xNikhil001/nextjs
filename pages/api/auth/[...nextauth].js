import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth( {
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
  secret: process.env.SECRET || "3l6PjG+8xakjhoQeX6oeMQNR2QZMb4bd6QnK1acu+0U=",
  debug:true
})