import { Component } from "preact";
import { IconType } from "react-icons";

/**
 * Az IconButton komponens egy gombot jelenít meg, amely tartalmaz egy ikont és opcionálisan egy szöveget.
 * A gomb kattintásakor meghívódik az `onClick` callback függvény.
 * 
 * @param {IconButtonProps} props A komponens paraméterei.
 * @returns {JSX.Element} A komponens JSX eleme, amely egy ikont és szöveget tartalmazó gombot jelenít meg.
 */
export function IconButton({ Icon, size, text, onClick }: IconButtonProps) {
    return (
        <button class="flex justify-evenly items-center space-x-2 p-2" onClick={() => onClick()}>
            <Icon size={size} /> {/* Az ikon megjelenítése */}
            {text && <span class="text-lg font-bold">{text}</span>} {/* Opcionálisan megjeleníthető szöveg */}
        </button>
    );
}

/**
 * Az IconButtonProps típus a komponenshez szükséges paramétereket tartalmaz.
 * 
 * @typedef {Object} IconButtonProps
 * @property {IconType} Icon - Az ikon, amely megjelenik a gombban.
 * @property {string} size - Az ikon mérete (pl. "24px").
 * @property {string} [text] - Opcionális szöveg, amely megjelenik az ikon mellett.
 * @property {() => void} onClick - A callback függvény, amely meghívódik, amikor a gombra kattintanak.
 */
export type IconButtonProps = {
    Icon: IconType;    // Az ikon típusa, amely a gombban megjelenik
    size: string;      // Az ikon mérete
    text?: string;     // Opcionális szöveg, amely az ikon mellett megjelenik
    onClick: () => void;  // A gomb kattintásakor meghívódó callback függvény
};
