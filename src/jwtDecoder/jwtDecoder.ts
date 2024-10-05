import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  email?: string;
  exp?: number;
}
export const jwtDecoder = (token: string) => {
  const decode = jwtDecode<CustomJwtPayload>(token);
  return decode;
};
