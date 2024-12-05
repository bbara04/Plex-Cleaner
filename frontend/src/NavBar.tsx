import logo from './assets/logo.png';
import { IoIosSettings } from "react-icons/io";
import { FiRefreshCw } from "react-icons/fi";
import { refreshMedia } from './MainPage';

export function NavBar({ openSettings, selectMediaView }: NavBarProps) {
    return <nav class="flex mp:px-2 sm:px-8 bg-slate-900 text-white font-bold">
        <img class="mp:h-14 mp:pt-2 mp:pb-1 mp:pr-4 sm:h-16 sm:pt-2 sm:pb-1 sm:pr-8" src={logo} alt="logo" onClick={() => openSettings(false)} />
        <div class="flex justify-center items-center space-x-4">
            <span class="mp:py-1 mp:px-2.5 sm:py-2 sm:px-5 bg-slate-600 text-slate-800 sm:text-lg font-bold rounded-lg" onClick={() => openSettings(false)}>Home</span>
            <span class="mp:py-1 mp:px-2.5 sm:py-2 sm:px-5 bg-slate-600 text-slate-800 sm:text-lg font-bold rounded-lg" onClick={() => selectMediaView("all")}>All</span>
            <span class="mp:py-1 mp:px-2.5 sm:py-2 sm:px-5 bg-slate-600 text-slate-800 sm:text-lg font-bold rounded-lg" onClick={() => selectMediaView("expired")}>Expired</span>
        </div>
        <div class="flex justify-center items-center ml-auto space-x-6" >
            <div onClick={() => refreshMedia()}>
                <FiRefreshCw size="32px" />
            </div>
            <div onClick={() => openSettings(true)}>
                <IoIosSettings size="40px" />
            </div>
        </div>
    </nav>
}

export type NavBarProps = {
    openSettings: (isOpen: boolean) => void;
    selectMediaView: (mediaView: string) => void;
};