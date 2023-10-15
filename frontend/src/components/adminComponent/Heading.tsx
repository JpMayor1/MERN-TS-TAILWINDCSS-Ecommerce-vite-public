import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useUserStore } from "../../stores/useUserStore";
import { UserState } from "../../utils/types";

const Heading = () => {
    const userInfo = useUserStore((state: UserState) => state.userInfo);
    return (
        <div className="w-full max-h-16 h-full bg-light border-b border-gray flex items-center justify-between px-5">
            <div>
                <h1 className="text-xl text-red-orange font-bold">Logo</h1>
            </div>
            <div className="flex gap-2 items-center">
                <h2 className="text-red-orange text-xl font-bold">
                    {userInfo?.username}
                </h2>
                <UserCircleIcon
                    className="w-10 h-10 text-green-dark"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
};

export default Heading;
