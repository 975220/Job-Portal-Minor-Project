import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f9f9ff] via-white to-[#eef2ff]">
            <Navbar />
            <div className="flex items-center justify-center min-h-[80vh] px-4">
                <form 
                    onSubmit={submitHandler} 
                    className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 transition-all hover:shadow-2xl"
                >
                    <h1 className="text-3xl font-extrabold text-center text-gray-800">Welcome Back!</h1>

                    <div>
                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="you@example.com"
                            className="mt-1 p-3 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-gray-700">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                            className="mt-1 p-3 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Select Role</Label>
                        <RadioGroup className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-indigo-500"
                                />
                                <Label className="cursor-pointer">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-indigo-500"
                                />
                                <Label className="cursor-pointer">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div>
                        {loading ? (
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 flex items-center justify-center">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 transition-all duration-300"
                            >
                                Login
                            </Button>
                        )}
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
