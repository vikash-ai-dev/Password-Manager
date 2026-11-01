import { Lock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 px-6 py-8 mt-12">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-green-500" />

                        <h2 className="font-bold text-xl text-white">
                            <span className="text-green-500">&lt;</span>
                            Pass
                            <span className="text-green-500">OP/&gt;</span>
                        </h2>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <a href="/" className="hover:text-white">
                            Home
                        </a>
                        <a href="/about" className="hover:text-white">
                            About
                        </a>
                        <a href="/privacy" className="hover:text-white">
                            Privacy
                        </a>
                    </div>

                </div>

                <hr className="border-gray-700 my-6" />

                <div className="text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} PassOP.
                    All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
