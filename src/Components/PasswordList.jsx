import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Copy, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";


const PasswordList = ({ refresh, onEdit }) => {
    const [passwords, setPasswords] = useState([]);
    const [visiblePasswords, setVisiblePasswords] = useState({});
    const [copiedPasswordId, setCopiedPasswordId] = useState("");


    useEffect(() => {


        const fetchPassword = async () => {
            try {

                const res = await fetch("http://localhost:5000/api/passwords")

                if (!res.ok) {
                    throw new Error("Failed to fetch password");
                }

                const data = await res.json();
                setPasswords(data);
            }
            catch (error) {
                console.log("Error fetching password", error.message);
            }
        };
        fetchPassword();
    }, [refresh]);

    const handleDelete = async (id) => {
        try {

            const res = await fetch(`http://localhost:5000/api/passwords/${id}`, {
                method: "DELETE"
            })

            if (!res.ok) {
                throw new Error("Failed to delete password")
            }

            const updatePasswords = passwords.filter((item) => {
                return item._id !== id;
            });

            setPasswords(updatePasswords);

            toast.success("Password deleted successfully!");
        }
        catch (error) {
            console.log("Delete failed:", error.message);
        }


    }

    const handleEdit = async (id) => {
        const selectedPassword = passwords.find((item) => {
            return item._id === id
        });

        if (selectedPassword) {
            onEdit(selectedPassword)
        }
    }

    const togglePassword = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev, [id]: !prev[id]
        }));
    };

    const copyPassword = async (password, id) => {
        try {
            await navigator.clipboard.writeText(password);
            setCopiedPasswordId(id);

            setTimeout(() => {
                setCopiedPasswordId("")
            }, 1000);
            toast.success("Password copied!");
        }
        catch (error) {
            console.error("Copy failed:", error);
            toast.error("Failed to copy password!");
        }
    }



    return (
        <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 mt-10">

            <h2 className="text-2xl font-bold text-green-800 mb-5">Your Saved Passwords</h2>

            <div className="mt-6 overflow-x-auto rounded-xl border border-green-200 shadow-md mb-10">
                <table className="w-full min-w-[600px] table-auto text-left ">
                    <thead className="bg-green-800 text-white">
                        <tr>
                            <th className="px-5 py-4 font-semibold">Website</th>
                            <th className="px-5 py-4 font-semibold">Username</th>
                            <th className="px-5 py-4 font-semibold text-center">Password</th>
                            <th className="px-5 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white text-gray-700">
                        {passwords.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                    No passwords saved yet.
                                </td>
                            </tr>
                        )}
                        {passwords.map((item) => (
                            <tr key={item._id} className="border-b border-green-100 hover:bg-green-50 transition-colors">
                                <td className="px-5 py-4 font-medium">
                                    {item.site}
                                </td>

                                <td className="px-5 py-4">{item.username}</td>
                                <td className="px-5 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <span>
                                            {visiblePasswords[item._id] ? item.password : "••••••••"}
                                        </span>
                                        <button className="cursor-pointer" type="button"
                                            onClick={() => togglePassword(item._id)}
                                            title={
                                                visiblePasswords[item._id] ? "Hide password"
                                                    : "Show password"
                                            }
                                            aria-label={
                                                visiblePasswords[item._id] ? "Hide password" : "Show password"
                                            }>
                                            {visiblePasswords[item._id] ? <EyeOff size={18} /> : <Eye size={18} />}

                                        </button>

                                        <button className="cursor-pointer"
                                            type="button"
                                            onClick={() => copyPassword(item.password, item._id)}>   {copiedPasswordId === item._id ? "Copied!" : <Copy size={18} />}

                                        </button>
                                    </div>

                                </td>

                                <td className="px-5 py-4 text-center">
                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => handleEdit(item._id)} className="text-green-700 hover:text-green-900 cursor-pointer" title="Edit">
                                            <Pencil size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="text-blue-600 hover:text-blue-800 cursor-pointer" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>


        </div>
    );

}



export default PasswordList;