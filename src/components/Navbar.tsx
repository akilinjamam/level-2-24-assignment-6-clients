"use server";

import { cookies } from "next/headers";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import NavItems from "./navItems/NavItems";

const Navbar = () => {

    const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;

  let userInfo = {};

  if(accessToken){  
     userInfo = jwtDecoder(accessToken);
  }else{
    return
  }

    return (
        <NavItems userInfo={userInfo}/>
    );
};

export default Navbar;
