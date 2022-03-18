interface Flags {
    svg: string
    png: string
}
export interface CountryData {
    name: string,
    flags: Flags,
    population: number,
    region: string,
    capital: string
}
export interface CountryInfo{
    borders: [string]
    flag: string,
    name: string,
    nativeName: string,
    population: number,
    region: string,
    subregion: string,
    capital: string,
    topLevelDomain: [string],
    currencies: [{name: string}]
    languages: [{name: string}]
}
