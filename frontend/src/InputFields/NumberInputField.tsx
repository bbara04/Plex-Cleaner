/**
 * A `NumberInputField` komponens egy egyszerű számbeviteli mező, amely lehetővé teszi a felhasználó számára, hogy számértékeket adjon meg.
 * 
 * A komponens egy címkét (`label`) és egy értéket (`value`) jelenít meg, valamint egy számformátumban történő bemenetet biztosít.
 * Amikor a felhasználó módosítja a számértéket, az új értéket az `onChange` függvény segítségével továbbítja a szülő komponensnek.
 * 
 * @param {NumberInputFieldProps} props - A komponens props objektuma.
 * @param {string} props.label - A beviteli mező címkéje.
 * @param {number} props.value - Az aktuális érték, amelyet a beviteli mezőben jelenítünk meg.
 * @param {string} props.configPath - Az elérési út, amely segítségével meghatározhatjuk a konfiguráció helyét.
 * @param {Function} props.onChange - A függvény, amely a módosított értéket továbbítja a szülő komponensnek.
 * 
 * @returns {JSX.Element} A számbeviteli mezőt és címkét tartalmazó JSX elem.
 */
export function NumberInputField({ label, value, configPath, onChange }: NumberInputFieldProps) {
    return (
        <div class="flex justify-between items-center p-4 space-x-6 border-2 rounded-md bg-slate-900 border-slate-700">
            <span>{label}:</span>
            <input
                class="p-2 min-w-20 max-w-24 rounded-sm text-center text-white placeholder-slate-200 bg-gray-600"
                type="number"
                value={value}
                onInput={e => onChange(configPath, Number((e.target as HTMLInputElement).value))}
            />
        </div>
    );
}

/**
 * A `NumberInputField` komponens bemeneti paramétereinek típusa.
 * 
 * @typedef {Object} NumberInputFieldProps
 * @property {string} label - A beviteli mező címkéje.
 * @property {number} value - Az aktuális érték, amelyet a beviteli mezőben jelenítünk meg.
 * @property {string} configPath - Az elérési út, amely segítségével meghatározhatjuk a konfiguráció helyét.
 * @property {Function} onChange - A függvény, amely a módosított értéket továbbítja a szülő komponensnek.
 */
export type NumberInputFieldProps = {
    label: string;
    value: number;
    configPath: string;
    onChange: (path: string, value: number) => void;
};
