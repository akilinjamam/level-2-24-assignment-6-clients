"use client"
import clsx from 'clsx'; // Import clsx or classnames library
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeRoutes, THomeRoutes } from "./homeRoutes";

const Navbar = () => {
    const pathName = usePathname();

    const active = (linkValue: string) => {
        return pathName === linkValue;
    };

    return (
        <div className="w-full h-[50px] bg-gray-100 flex items-center justify-between">
            <div className="w-[24.5%] h-full bg-gray-200"></div>
            <div className="w-[50%] h-full flex items-center justify-around">
                {homeRoutes?.map((item: THomeRoutes, index: number) => {
                    return (
                        <div
                            key={index + 1}
                            className={clsx("w-[50%] h-full flex items-center justify-around", {
                                "border-b-2 border-blue-500": active(item.links),
                            })}
                        >
                            <Link href={item.links}>
                                <i
                                    title={item?.name}
                                    className={`${item?.icons} text-2xl w-[24%] text-center cursor-pointer`}
                                ></i>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div className="w-[24.5%] h-full bg-gray-200"></div>
        </div>
    );
};

export default Navbar;
