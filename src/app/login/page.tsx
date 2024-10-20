"use client";

import type React from "react";
import { useEffect } from "react";

import { redirect } from "next/navigation";

import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
	const { data: session, status } = useSession();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// ログイン済みの場合はTOPページにリダイレクト
		if (status === "authenticated") {
			redirect("/");
		}
	}, [session, status]);

	const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
		event.preventDefault();
		const result = await signIn(provider);
		// ログイン成功
		if (result) {
			redirect("/");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<form className="w-full max-w-xs space-y-6 rounded bg-white p-8 shadow-md">
				<button
					onClick={handleLogin("google")}
					type="button"
					className="w-full bg-red-500 text-white rounded-lg px-4 py-2"
				>
					Googleでログイン
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
