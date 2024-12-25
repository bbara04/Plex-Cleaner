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
            class="flex items-center m-2 p-3 space-x-4 bg-slate-900 border-slate-700 border-4 rounded-md"
            onClick={() => onClick()} // A listaelem kattintására meghívódik az onClick függvény
        >
            <div class="flex-none w-8">
                {/* Jelölőnégyzet a listaelemhez */}
                <input class="w-5 h-5" type="checkbox" checked={checked} />
            </div>
            <span class="flex-1 min-w-40 overflow-ellipsis">{title}</span> {/* A cím megjelenítése */}
            <span class="flex-none w-fit">{additionalInfo}</span> {/* Opcionális további információk */}
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
