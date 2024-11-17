"use client";
// import google from '../../public/google2.png';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <nav className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md">
            <div className="flex justify-between items-center px-4 py-3 md:px-6">
                {/* Logo or Greeting */}
                <div className="text-lg font-bold">
                    {status === 'authenticated' ? (
                        <span>Welcome, {session.user.name}!</span>
                    ) : (
                        <span>Welcome, Guest!</span>
                    )}
                </div>

                {/* Authenticated Buttons */}
                {status === "authenticated" && (
                    <div className="hidden md:flex space-x-4">
                        <button
                            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-md transition duration-300"
                            onClick={() => router.push('/addCustomers')}
                        >
                            Add New Customer
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-md transition duration-300"
                            onClick={() => router.push('/allCampaigns')}
                        >
                            All Campaigns
                        </button>
                    </div>
                )}

                {/* Authentication Section */}
                <div className="flex items-center space-x-4">
                    {status === "authenticated" ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer hover:scale-105 transition-transform"
                                    title="Account Options"
                                >
                                    <img
                                        src={session.user.image || '/default-profile.png'}
                                        alt="User Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 bg-white text-gray-900 rounded-lg shadow-lg">
                                <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <button
                                        className="w-full text-left text-red-500 hover:underline"
                                        onClick={signOut}
                                    >
                                        Sign Out
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <button
                            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 font-semibold border-2 border-blue-700 rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
                        >
                            <span>Sign In</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Authenticated Buttons */}
            {status === "authenticated" && (
                <div className="flex flex-col space-y-3 px-4 py-2 md:hidden">
                    <button
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-md transition duration-300"
                        onClick={() => router.replace('/addCustomers')}
                    >
                        Add New Customer
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-md transition duration-300"
                        onClick={() => router.replace('/allCampaigns')}
                    >
                        All Campaigns
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
