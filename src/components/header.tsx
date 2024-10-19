"use client";

import Image from "next/image";
import Link from "next/link";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

const Header = ({ session }: { session: Session | null }) => {
	return (
		<header className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
				<a
					href="/dashboard"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-8"
						alt="Flowbite Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						CW Mastery
					</span>
				</a>
				<div className="flex items-center space-x-6 rtl:space-x-reverse">
					{session ? (
						<>
							<Image
								src={session.user?.image ?? ""}
								alt={session.user?.name ?? ""}
								width={40}
								height={40}
								className="rounded-full"
							/>
							<button
								type="button"
								onClick={() => signOut()}
								className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600"
							>
								ログアウト
							</button>
						</>
					) : (
						<Link href="/login">
							<button
								type="button"
								className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600"
							>
								ログイン
							</button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
