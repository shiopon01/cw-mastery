import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";

const authOptions: NextAuthConfig = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}) as Provider,
	],
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export const GET = handler.handlers.GET;
export const POST = handler.handlers.POST;
export const runtime = "edge";
