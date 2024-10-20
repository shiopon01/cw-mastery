import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
	debug: true,
	session: { strategy: "jwt" },
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		jwt: async ({ token, user, account, profile }) => {
			// 注意: トークンをログ出力してはダメです。
			console.log("in jwt", { user, token, account, profile });

			if (user) {
				token.user = user;
				const u = user as any;
				token.role = u.role;
			}
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		session: ({ session, token }) => {
			console.log("in session", { session, token });
			token.accessToken;
			return {
				...session,
				user: {
					...session.user,
					role: token.role,
				},
			};
		},
	},
});
