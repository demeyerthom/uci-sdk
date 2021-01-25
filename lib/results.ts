import {AxiosInstance} from "axios";
import Axios from "axios"
import {Competition, Race, Result, Season} from "./models";
import FormData = require("form-data")
import {transformDate} from "./helpers";

export enum Disciplines {
    Road = 10,
    Track = 9,
    MountainBike = 7,
    BMXRacing = 1,
    BMXFreestyle = 13,
    Trials = 12,
    CycloCross = 3,
    Indoor = 5
}

export interface ListCompetitionsRequest {
    seasonID: number
    take?: number
    skip?: number
    page?: number
    pageSize?: number
    raceTypeID?: number
    categoryID?: number
    sortField?: string
    sortOrder?: string
}

export interface ListRacesRequest {
    competitionId: number
    take?: number
    skip?: number
    page?: number
    pageSize?: number
}

export interface ListResultRequest {
    raceId: number
    take?: number
    skip?: number
    page?: number
    pageSize?: number
}

const responseTransformer = (fields: string[]) => {
    return function (data) {
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data, function (key, value) {
                    if (-1 != fields.indexOf(key)) {
                        value = transformDate(value)
                    }

                    return value
                });
            } catch (e) { /* Ignore */
                console.log(e)
            }
        }
        return data;
    }
}

export class ResultsSDK {
    private instance: AxiosInstance;
    private discipline: Disciplines;

    //We require a discipline number during construction, as all subsequent calls require this number regardless of other relations
    constructor(discipline: Disciplines) {
        this.instance = Axios.create({baseURL: 'https://dataride.uci.org/iframe/'});
        this.discipline = discipline
    }

    public async listSeasons(): Promise<Season[]> {
        let result = await this.instance.get('GetRestrictedResultsDisciplineSeasons', {
            params: {disciplineId: this.discipline.toString()},
            transformResponse: responseTransformer(["StartDate", "EndDate"])
        });

        return result.data
    }

    public async listCompetitions(request: ListCompetitionsRequest): Promise<{ total: number, data: Competition[] }> {
        const take = request.take === undefined ? 40 : request.take;
        const skip = request.skip === undefined ? 0 : request.skip;
        const page = request.page === undefined ? 1 : request.page;
        const pageSize = request.pageSize === undefined ? 40 : request.pageSize;
        const raceTypeID = request.raceTypeID === undefined ? 0 : request.raceTypeID;
        const categoryID = request.categoryID === undefined ? 0 : request.categoryID;
        const sortField = request.sortField === undefined ? 'StartDate' : request.sortField;
        const sortOrder = request.sortOrder === undefined ? 'desc' : request.sortOrder;

        let form = new FormData();
        form.append('disciplineId', this.discipline.toString());
        form.append('take', take.toString());
        form.append('skip', skip.toString());
        form.append('page', page.toString());
        form.append('pageSize', pageSize.toString());
        form.append('sort[0][field]', sortField);
        form.append('sort[0][dir]', sortOrder);
        form.append('filter[filters][0][field]', 'RaceTypeId');
        form.append('filter[filters][0][value]', raceTypeID.toString());
        form.append('filter[filters][1][field]', 'CategoryId');
        form.append('filter[filters][1][value]', categoryID.toString());
        form.append('filter[filters][2][field]', 'SeasonId');
        form.append('filter[filters][2][value]', request.seasonID.toString());

        let result = await this.instance.post('Competitions', form, {
                headers: form.getHeaders(),
                transformResponse: responseTransformer(["StartDate", "EndDate"])
            },
        )

        return result.data
    }

    public async listRaces(request: ListRacesRequest): Promise<{ total: number, data: Race[] }> {
        const take = request.take === undefined ? 40 : request.take;
        const skip = request.skip === undefined ? 0 : request.skip;
        const page = request.page === undefined ? 1 : request.page;
        const pageSize = request.pageSize === undefined ? 40 : request.pageSize;

        let form = new FormData();
        form.append('disciplineId', this.discipline.toString());
        form.append('competitionId', request.competitionId.toString());
        form.append('take', take.toString());
        form.append('skip', skip.toString());
        form.append('page', page.toString());
        form.append('pageSize', pageSize.toString());

        let result = await this.instance.post('Races', form, {
            headers: form.getHeaders(),
            transformResponse: responseTransformer(["StartDate", "EndDate", "MandatoryDate"])
        })

        return result.data
    }

    public async listResults(request: ListResultRequest): Promise<{ total: number, data: Result[] }> {
        const take = request.take === undefined ? 40 : request.take;
        const skip = request.skip === undefined ? 0 : request.skip;
        const page = request.page === undefined ? 1 : request.page;
        const pageSize = request.pageSize === undefined ? 40 : request.pageSize;

        let form = new FormData();
        form.append('disciplineId', this.discipline.toString());
        form.append('eventId', request.raceId.toString());
        form.append('take', take.toString());
        form.append('skip', skip.toString());
        form.append('page', page.toString());
        form.append('pageSize', pageSize.toString());

        let result = await this.instance.post('Results', form, {
            headers: form.getHeaders(),
            transformResponse: responseTransformer(["BirthDate", "MandatoryDate"])
        })

        return result.data
    }
}