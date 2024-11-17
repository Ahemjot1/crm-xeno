import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next"
import connectDB from "@/app/utils/db";
import User from "@/app/models/User";

export const authOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await connectDB();
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                console.log("New User")
                const newUser = new User({
                    name: user.name,
                    email: user.email,
                });
                await newUser.save();
                return `/dashboard`;
            } else {
                return true;
            }

            return true;
        },


    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }