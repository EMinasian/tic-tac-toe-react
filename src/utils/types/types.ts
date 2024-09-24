export type ActivePlayerType = 0 | 1

export type PlayerSymbolType = 'X' | 'O'

export type PlayerType = {
    name: string;
    symbol?: PlayerSymbolType;
}

export type CellsType = Map<number, string>