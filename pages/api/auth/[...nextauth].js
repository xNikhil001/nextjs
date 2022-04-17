import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
  GoogleProvider({
    clientId: `816206648815-5j215bv56cf1qrg88e42u1tvp91i60p6.apps.googleusercontent.com`,
    clientSecret: `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`,
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
  secret: process.env.NEXT_PUBLIC_SECRET,
  debug:true
}

export default (req,res)=>NextAuth(req,res,options)