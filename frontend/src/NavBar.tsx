import logo from './assets/logo.png';
import { IoIosSettings } from "react-icons/io";

export function NavBar({ openSettings }: NavBarProps) {
    return <nav class="flex px-8 bg-gray-900 text-white font-bold">
        <img class="h-16 pt-2 pb-1 pr-8" src={logo} alt="logo" onClick={() => openSettings(false)}/>
        <div class="flex justify-center items-center space-x-8">
            <a class="" href="#" onClick={() => openSettings(false)}>Home</a>
            <a class="" href="#">All</a>
            <a class="" href="#">Expired</a>
        </div>
        <div class="flex justify-center items-center ml-auto" onClick={() => openSettings(true)}>
            <IoIosSettings size="40px" />
        </div>
    </nav>
}

export type NavBarProps = {
    openSettings: (isOpen: boolean) => void;
};