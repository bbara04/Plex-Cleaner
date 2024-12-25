import logo from './assets/logo.png';
import { IoIosSettings } from "react-icons/io";
import { FiRefreshCw } from "react-icons/fi";
import { refreshMedia } from './MainPage';

/**
 * A `NavBar` komponens navigációs sávot biztosít az alkalmazás számára.
 * 
 * A navigációs sáv tartalmaz egy logót, több navigációs lehetőséget (Home, All, Expired), 
 * valamint két ikont: frissítés és beállítások. A komponens az `openSettings` és `selectMediaView`
 * callback függvények segítségével kommunikál a szülő komponenssel.
 * 
 * @param {NavBarProps} props - A komponens props objektuma.
 * @param {string} props.selectedView - Az aktuálisan kiválasztott nézet.
 * @param {(isOpen: boolean) => void} props.openSettings - Függvény, amely a beállítások paneljét nyitja vagy zárja.
 * @param {(mediaView: string) => void} props.selectMediaView - Függvény, amely a médiák szűrését végzi el a különböző nézetek (pl. "all", "expired") alapján.
 * 
 * @returns {TSX.Element} A navigációs sáv JSX eleme.
 */
export function NavBar({ selectedView, openSettings, selectMediaView }: NavBarProps) {
    return (
        <nav class="flex mp:px-2 sm:px-8 bg-slate-900 text-white font-bold">
            <img
                class="mp:h-14 mp:pt-2 mp:pb-1 mp:pr-4 sm:h-16 sm:pt-2 sm:pb-1 sm:pr-8"
                src={logo}
                alt="logo"
                onClick={() => openSettings(false)}
            />
            <div class="flex justify-center items-center space-x-4">
                <span
                    class="mp:py-1 mp:px-2.5 sm:py-2 sm:px-5 bg-slate-600 text-slate-800 sm:text-lg font-bold rounded-lg"
                    onClick={() => openSettings(false)}
                >
                    Home
                </span>
                <span
                    class={`mp:py-1 mp:px-2.5 sm:py-2 sm:px-5 sm:text-lg font-bold rounded-lg ${selectedView == "all" ? "bg-slate-800 text-slate-600" : "bg-slate-600 text-slate-800"}`}
                    onClick={() => selectMediaView("all")}
                >
                    All
                </span>
                <span
                    class={`mp:py-1 mp:px-2.5 sm:py-2 sm:px-5 sm:text-lg font-bold rounded-lg ${selectedView == "expired" ? "bg-slate-800 text-slate-600" : "bg-slate-600 text-slate-800"}`}
                    onClick={() => selectMediaView("expired")}
                >
                    Expired
                </span>
            </div>
            <div class="flex justify-center items-center ml-auto space-x-6">
                <div onClick={() => refreshMedia()}>
                    <FiRefreshCw size="32px" />
                </div>
                <div onClick={() => openSettings(true)}>
                    <IoIosSettings size="40px" />
                </div>
            </div>
        </nav>
    );
}

/**
 * `NavBarProps` típus, amely meghatározza a `NavBar` komponens bemeneti propjait.
 * 
 * @typedef {Object} NavBarProps
 * @property {string} selectedView - Az aktuálisan kiválasztott nézet.
 * @property {(isOpen: boolean) => void} openSettings - Függvény, amely a beállítások paneljét nyitja vagy zárja.
 * @property {(mediaView: string) => void} selectMediaView - Függvény, amely kiválasztja a megjelenítendő médiák nézetét.
 */
export type NavBarProps = {
    selectedView: string;
    openSettings: (isOpen: boolean) => void;
    selectMediaView: (mediaView: string) => void;
};
