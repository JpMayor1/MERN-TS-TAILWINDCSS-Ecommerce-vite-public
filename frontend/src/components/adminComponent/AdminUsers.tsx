import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserStore } from "../../stores/useUserStore";
import { UserType } from "../../utils/types";
import { toast } from "react-hot-toast";

const AdminUsers = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const getAllUsers = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios
                .get(`${API}/api/users`, config)
                .then((res) => {
                    setUsers(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        };

        getAllUsers();
    }, [API, token]);

    const handleDeleteUser = async (id: string | undefined) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios
            .delete(`${API}/api/user/delete/${id}`, config)
            .then(() => {
                toast.success("User deleted successfully!");
                setUsers(users.filter((user) => user._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="h-[90%] w-[90%] bg-light p-3">
                {users.length === 0 ? (
                    <div className="w-full flex items-center justify-center">
                        <p className="text-lg font-medium text-gray-900">
                            No Users found!
                        </p>
                    </div>
                ) : (
                    <>
                        {isLoading ? (
                            <div className="w-full flex items-center justify-center">
                                <ClipLoader size={8} color="black" />
                            </div>
                        ) : (
                            <>
                                <h1 className="text-center text-2xl font-bold">
                                    Users
                                </h1>
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-100"
                                >
                                    {users.map((user) => (
                                        <li
                                            key={user._id}
                                            className="flex justify-between gap-x-6 py-5"
                                        >
                                            <div className="flex min-w-0 gap-x-4">
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-lg font-semibold leading-6 text-gray-900">
                                                        {user.username}
                                                    </p>
                                                    <p className="mt-1 truncate text-base leading-5 text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                {user.isAdmin ? (
                                                    <p>Admin</p>
                                                ) : (
                                                    <p>User</p>
                                                )}
                                                <button
                                                    className="bg-red-orange text-light px-2 py-1 rounded-md"
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            user._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
