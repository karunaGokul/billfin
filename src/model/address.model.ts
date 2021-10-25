export class countryModel {
    id: number;
    name: string;
    iso2: string
}
export class stateModel extends countryModel {
}
export class cityModel {
    id: number;
    name: string;
}