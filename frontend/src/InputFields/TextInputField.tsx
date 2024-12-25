/**
 * A `TextInputField` komponens egy egyszerű szöveges bemeneti mező, amely lehetővé teszi a felhasználó számára,
 * hogy szöveges értékeket adjon meg.
 * 
 * A komponens egy címkét (`label`), egy értéket (`value`), és egy opcionális helykitöltő szöveget (`placeholder`) jelenít meg.
 * Amikor a felhasználó módosítja a szöveget, az új értéket az `onChange` függvény segítségével továbbítja a szülő komponensnek.
 * 
 * @param {TextInputFieldProps} props - A komponens props objektuma.
 * @param {string} props.label - A beviteli mező címkéje.
 * @param {string} props.value - Az aktuális érték, amelyet a beviteli mezőben jelenítünk meg.
 * @param {string} props.configPath - Az elérési út, amely segítségével meghatározhatjuk a konfiguráció helyét.
 * @param {string} props.placeholder - A szövegmező helykitöltő szövege (opcionális).
 * @param {Function} props.onChange - A függvény, amely a módosított értéket továbbítja a szülő komponensnek.
 * 
 * @returns {JSX.Element} A szöveges bemeneti mezőt és címkét tartalmazó JSX elem.
 */
export function TextInputField({ label, value, configPath, placeholder, onChange }: TextInputFieldProps) {
    return (
        <div class="flex items-center justify-between p-4 space-x-6 border-2 rounded-md bg-slate-900 border-slate-700">
            <span>{label}:</span>
            <input
                class="py-2 px-4 min-w-36 max-w-48 rounded-sm text-white placeholder-slate-200 bg-gray-600"
                type="text"
                value={value}
                placeholder={placeholder}
                onInput={e => onChange(configPath, (e.target as HTMLInputElement).value)}
            />
        </div>
    );
}

/**
 * A `TextInputField` komponens bemeneti paramétereinek típusa.
 * 
 * @typedef {Object} TextInputFieldProps
 * @property {string} label - A beviteli mező címkéje.
 * @property {string} value - Az aktuális érték, amelyet a beviteli mezőben jelenítünk meg.
 * @property {string} configPath - Az elérési út, amely segítségével meghatározhatjuk a konfiguráció helyét.
 * @property {string} placeholder - A szövegmező helykitöltő szövege (opcionális).
 * @property {Function} onChange - A függvény, amely a módosított értéket továbbítja a szülő komponensnek.
 */
export type TextInputFieldProps = {
    label: string;
    value: string; 
    configPath: string;
    placeholder: string;
    onChange: (path: string, value: string) => void;
};
