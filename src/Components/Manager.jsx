import React, { useState, useEffect } from 'react'
import { Plus, Eye, EyeOff, Copy, Save } from 'lucide-react'
import { toast } from 'react-toastify';

const Manager = ({ onPasswordAdded, editPassword, onCancelEdit }) => {


    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ site: "", username: "", password: "" });



    useEffect(() => {
        if (editPassword) {
            setForm({
                site: editPassword.site,
                username: editPassword.username,
                password: editPassword.password
            });
        }
    }, [editPassword])

    const isEditing = Boolean(editPassword)


    const savePassword = async () => {
        if (!form.site.trim() || !form.username.trim() || !form.password.trim()) {
            toast.error("Please fill in all fields!");
            return;
        };
        const trimmedForm = {
            site: form.site.trim(),
            username: form.username.trim(),
            password: form.password.trim(),
        };
        try {


            const res = await fetch(
                isEditing ? `http://localhost:5000/api/passwords/${editPassword._id}` :

                    "http://localhost:5000/api/passwords", {
                method: isEditing ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(trimmedForm)

            })

            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                toast.error(data.message || "Failed to save password!");
                return;
            }
            toast.success(
                isEditing
                    ? "Password updated successfully!"
                    : "Password saved successfully!"
            );

            setForm({ site: "", username: "", password: "" })

            await onPasswordAdded();

            if (isEditing) {
                onCancelEdit();
            }


        } catch (error) {
            console.log(error.message);
            toast.error("Cannot connect to the server")
        };

        // console.log(trimmedForm)

    }

    const handleChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })

    }



    return (
        <div>
            <div className="absolute top-0 -z-10 h-full w-full bg-green-50">
                <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
            </div>

            <div className="mx-auto max-w-4xl w-full px-4 sm:px-6">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-700">OP/&gt;</span>
                </h1>
                <p className='text-green-700 text-2xl font-semibold text-center'>Your own Password Manager</p>

                {/* Website URL */}
                <div>
                    <input
                        value={form.site}
                        onChange={handleChange}
                        className='border-2 border-green-600 w-full p-4 py-2 text-black rounded-xl my-4 outline-none focus:ring-2 focus:ring-green-500'
                        type="text"
                        placeholder='Enter Website URL'
                        name='site'

                        autoComplete="off"
                    />
                </div>

                {/* Username + Password row */}
                <div className='flex flex-col gap-2 sm:flex-row sm:gap-4'>

                    <input
                        value={form.username}
                        onChange={handleChange}
                        className="border-2 border-green-600 w-full sm:flex-1 sm:basis-0 sm:min-w-0 p-4 py-2 text-black rounded-xl my-4 outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        placeholder='Enter Username'
                        name='username'
                        autoComplete="off"
                    />

                    <div className='relative w-full sm:flex-1 sm:basis-0 sm:min-w-0 my-4'>
                        <button
                            type='button'
                            className='absolute right-3 top-1/2 -translate-y-1/2  cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>

                        <input
                            value={form.password}
                            onChange={handleChange}
                            className='w-full border-2 border-green-600 py-2 pl-4 pr-10 text-black rounded-xl outline-none focus:ring-2 focus:ring-green-500'
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter Password'
                            name='password'
                            autoComplete="off"
                        />
                    </div>

                </div>

                {/* Button */}
                <div className="flex justify-center mt-4">
                    <button className='flex items-center gap-2 bg-green-600 hover:bg-green-700 active:scale-95 transition-all duration-150 text-white rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-lg border-2 border-green-700 cursor-pointer'
                        onClick={savePassword}>
                        {isEditing ? <></> : <Plus className='w-5 h-5' />}
                        {isEditing ? "Save Password" : "Add Password"}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Manager;