import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

interface IButtonSecondary {
    text: string;
    height: ButtonHeight;
}

export enum ButtonHeight {
    Small = "sm",
    Medium = "md",
    Large = "lg",
  }

const heightMap =  {
    [ButtonHeight.Small]: "32px",
    [ButtonHeight.Medium]: "40px",
    [ButtonHeight.Large]: "48px"
}

export function ButtonSecondary({ text, height}: IButtonSecondary) {
    const heightValue = heightMap[height];
    return <Button className={`h-[${heightValue}`} variant="secondary">{text}</Button>
}
