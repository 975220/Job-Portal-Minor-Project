import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-10">
                <form onSubmit={submitHandler} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Create an Account</h1>

                    <div className="space-y-4">
                        <div>
                            <Label>Full Name</Label>
                            <Input
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="Enter your full name"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="example@email.com"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Phone Number</Label>
                            <Input
                                type="text"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                                placeholder="8080808080"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Create a password"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Role</Label>
                            <div className="flex items-center gap-6 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                    />
                                    <span className="text-sm text-gray-700">Student</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                    />
                                    <span className="text-sm text-gray-700">Recruiter</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <Label>Profile Picture</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="mt-2 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        {
                            loading ? (
                                <Button className="w-full" disabled>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" /> Signing up...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full">
                                    Sign Up
                                </Button>
                            )
                        }
                    </div>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup;
