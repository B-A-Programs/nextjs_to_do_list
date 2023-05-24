export default authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks : {
        async session({ session }) {
            await connectToDB();
            
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },

        async jwt({ token }) {
            await connectToDB();

            const sessionUser = await User.findOne({
                email: token.email
            })
    
            token.id = sessionUser._id.toString();
            console.log(token)

            return token
          },
    
        async signIn({ profile }) {
            try {
                await connectToDB();

                const user = await User.findOne({
                    email: profile.email
                })

                if(!user) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", ""),
                        image: profile.picture,
                    })
                }

                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    },
}