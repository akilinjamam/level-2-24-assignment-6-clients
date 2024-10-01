import { ReactNode } from "react";

const Container = ({children} : {children: ReactNode}) => {
    return (
        <div className="w-[full] flex items-center justify-center">
           <div className="w-[50%]">
                {children}
           </div>
        </div>
    );
};

export default Container;