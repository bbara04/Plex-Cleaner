import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

/**
 * A ListElement komponens egy listaelem, amely tartalmaz egy jelölőnégyzetet, egy címet és opcionálisan további információkat.
 * A komponens kattintható, és a felhasználó interakciója esetén meghívódik az `onClick` callback.
 * 
 * @param {ListElementProps} props A komponens paraméterei.
 * @returns {JSX.Element} A listaelem JSX eleme, amely egy címkét és egy jelölőnégyzetet tartalmaz.
 */
export function ListElement({ title, additionalInfo, checked, onClick }: ListElementProps) {

    return (
        <div
            className={`flex items-center m-2 p-3 space-x-4 ${checked ? "bg-slate-800 border-slate-600" : "bg-slate-900 border-slate-700"} border-4 rounded-md`}
            onClick={() => onClick()} // A listaelem kattintására meghívódik az onClick függvény
        >
            <div className="flex items-center justify-center">
                {checked ? <MdCheckBox size="28px" color="#cbd5e1" /> : <MdCheckBoxOutlineBlank size="28px" />} {/* A jelölőnégyzet megjelenítése */}
            </div>
            <span className="flex-1 mp:text-sm sm:text-lg font-bold text-slate-300 items-center" 
            style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box'
              }}
            >{title}</span> {/* A cím megjelenítése */}
            <span className="flex-none w-fit mp:text-sm sm:text-lg font-bold text-slate-300 items-center">{additionalInfo}</span> {/* Opcionális további információk */}
        </div>
    );
}

/**
 * A ListElementProps típus a ListElement komponenshez szükséges paramétereket tartalmaz.
 * 
 * @typedef {Object} ListElementProps
 * @property {string} title - A listaelem címe, amely megjelenik.
 * @property {string} additionalInfo - Opcionális további információ, amely megjelenik a cím mellett.
 * @property {boolean} checked - A jelölőnégyzet állapota (true/false).
 * @property {() => void} onClick - A callback függvény, amely meghívódik, amikor a listaelemre kattintanak.
 */
export type ListElementProps = {
    title: string;         // A listaelem címe
    additionalInfo: string; // Opcionális további információ a listaelem mellett
    checked: boolean;      // A jelölőnégyzet állapota (támogatott értékek: true / false)
    onClick: () => void;   // A gomb, illetve elem kattintásakor meghívódó callback függvény
};
