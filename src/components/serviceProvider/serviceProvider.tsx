import { ReactNode } from "react";
import { u1, u2, u3, u4 } from "./icons";

type TserviceProvider = {
  image: ReactNode;
  name: string;
  designation: string;
  number: number;
  bgColor: string;
};

export const serviceProvider: TserviceProvider[] = [
  {
    image: u1,
    number: +88013335444,
    designation: "CEO",
    name: "Akil Injamam",
    bgColor: "#d8d8fa",
  },
  {
    image: u2,
    number: +88013335445,
    designation: "CFO",
    name: "Andrew Jonathan",
    bgColor: "#d8d8fa",
  },
  {
    image: u3,
    number: +88013335446,
    designation: "Manager",
    name: "Michael Mayer",
    bgColor: "#d8d8fa",
  },
  {
    image: u4,
    number: +88013335447,
    designation: "Assistant Manager",
    name: "Scharlet Jonson",
    bgColor: "#d8d8fa",
  },
];
