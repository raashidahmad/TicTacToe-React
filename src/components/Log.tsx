export const Log = ({ turns }: any) => {
    return (
        <ol id="log">
            {turns && turns?.map((turn: any, index: number) => {
                return (
                <li key={`${turn?.square?.row}-${index}-${turns?.square?.col}`}>
                    {turn?.player} selected {turn?.square?.row} - {turn?.square?.col}
                </li>
                );
            })}
        </ol>
    );
}