import {transformDate} from "./helpers";

export class Season {
    readonly StartDate: Date
    readonly EndDate: Date
    readonly Year: number
    readonly MandatoryDate: Date
    readonly Id: number
    readonly Name: string
    readonly Code?: string
    readonly Icon?: string
    readonly Sequence: number
    readonly DisplayText: string
}

export class Competition {
    readonly CompetitionId: number
    readonly StartDate: Date
    readonly EndDate: Date
    readonly CompetitionName: string
    readonly CountryName: string
    readonly IsInProgress: boolean
    readonly IsDone: boolean
    readonly CountryIsoCode3: string
    readonly CountryIsoCode2: string
    readonly ClassCode: string
    readonly FlagCode: string
    readonly Date: string
}

export class Race {
    Id: number
    RaceCode: string
    Index: number
    StartDate: Date
    EndDate: Date
    RaceName: string
    CategoryCode: string
    RaceTypeCode: string
    DisciplineCode: string
    StartLocation: string
    EndLocation?: string
    MandatoryDate: Date
    EventResultPage: any[]
    Venue: string
    Date: string

}

export class Result {
    ResultId: number
    RankNumber: number
    SortOrder: number
    TeamType: number
    Rank: string
    Bib: string
    MandatoryDate: Date
    BirthDate: Date
    Age: string
    IndividualDisplayName: string
    IndividualFirstName?: string
    IndividualLastName?: string
    UnknownIndividualDisplayName?: string
    UnknownIndividualFirstName?: string
    UnknownIndividualLastName?: string
    DisplayName: string
    DisplayFirstName?: string
    DisplayLastName?: string
    IsoCode2: string
    NationName: string
    IndividualCountryIsoCode2: string
    IndividualCountryName: string
    IndividualCountryNameText: string
    UnknownIndividualCountryIsoCode2?: string
    UnknownIndividualCountryName?: string
    UnknownIndividualCountryNameText?: string
    TeamName?: string
    ResultValue: string
    PointPcR: number
    TeamPointPcR?: string
    PcRPrefix: string
    PcRSuffix: string
    Irm?: string
    FlagCode: string
    Gender: string
    IndividualGender?: string
    UnknownIndividualGender?: string
    Phase?: string
    Heat?: string
}