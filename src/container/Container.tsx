import { ReactNode } from "react";

const Container = ({children} : {children: ReactNode}) => {
    return (
        <div className="w-[full] lg:flex items-center justify-center">
           <div >
                {children}
           </div>
        </div>
    );
};

export default Container;