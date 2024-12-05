import { Component } from "preact";
import { IconType } from "react-icons";

export function IconButton({ Icon, size, text, onClick }: IconButtonProps) {
    return <button class="flex justify-evenly items-center space-x-2 p-2" onClick={() => onClick()}>
        <Icon size={size}/>
        {text && <span class="text-lg font-bold">{text}</span>}
    </button>
}

export type IconButtonProps = {
    Icon: IconType;
    size: string;
    text?: string;
    onClick: () => void;
};