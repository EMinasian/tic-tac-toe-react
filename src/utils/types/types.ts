export const enum PlayerValue {
    VALUEX = "X",
    VALUEO = "O"
}

export const enum ActivePlayerValue {
    VALUE0,
    VALUE1
}

export type ActivePlayerType = ActivePlayerValue.VALUE0 | ActivePlayerValue.VALUE1

export type PlayerSymbolType = PlayerValue.VALUEX | PlayerValue.VALUEO

export type PlayerType = {
    name: string;
    symbol?: PlayerSymbolType;
}

export type CellsType = Map<number, PlayerSymbolType>



