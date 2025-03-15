import bg from './assets/waiting-bg-mountain.jpg';

/**
 * A `WaitingPanel` komponens egy vizuális panel, amely egy háttérképpel és egy üzenettel várakozási állapotot jelez.
 * 
 * A panel teljes képernyős elrendezéssel jelenik meg, és a háttérben elmosódott képet tartalmaz. Az üzenet középre van igazítva,
 * és egy opcionálisan megadott háttérszínnel jelenik meg. A `color` prop lehetővé teszi a háttérszín testreszabását,
 * de ha nem adunk meg színt, akkor alapértelmezetten egy sötét kék (#0f172a) színt alkalmaz.
 * 
 * @param {WaitingPanelProps} props - A komponens props objektuma.
 * @param {string} props.message - Az üzenet, amely a panelen megjelenik.
 * @param {string} props.errormsg
 * @param {string} [props.color="#0f172a"] - Az üzenet háttérszíne (opcionális, alapértelmezett: "#0f172a").
 * 
 * @returns {JSX.Element} A várakozási panel JSX eleme.
 */
export function WaitingPanel({ message, errormsg, color = "#0f172a" }: WaitingPanelProps) {
    return (
        <div class="flex justify-center items-center h-screen overflow-hidden">
            <img src={bg} class="object-cover h-full w-full opacity-70 blur-sm" alt="waiting" />
            <div class="fixed p-4 rounded-lg opacity-80" style={`background-color: ${color}`}>
                <span class="text-3xl font-bold opacity-100">{message}</span>
                <br />
                <span>{errormsg}</span>
            </div>
        </div>
    );
}

/**
 * `WaitingPanelProps` típus, amely meghatározza a `WaitingPanel` komponens bemeneti propjait.
 * 
 * @typedef {Object} WaitingPanelProps
 * @property {string} message - Az üzenet, amelyet megjelenítünk a panelen.
 * @property {string} errormsg
 * @property {string} [color="#0f172a"] - Az üzenet háttérszíne (opcionális, alapértelmezett értékkel).
 */
export type WaitingPanelProps = {
    message: string;
    errormsg?: string;
    color?: string;
};
