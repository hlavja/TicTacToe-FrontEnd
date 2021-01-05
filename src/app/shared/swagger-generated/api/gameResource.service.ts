/**
 * TicTacToe API
 * TicTacToe API documentation
 *
 * OpenAPI spec version: 1.0.0
 * Contact: hlavjah@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { GameDTO } from '../model/gameDTO';
import { MessageDTO } from '../model/messageDTO';
import { MoveDTO } from '../model/moveDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class GameResourceService {

    protected basePath = 'https://localhost:8080/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * acceptGame
     * 
     * @param opponentLogin opponentLogin
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public acceptGameUsingGET(opponentLogin: string, observe?: 'body', reportProgress?: boolean): Observable<GameDTO>;
    public acceptGameUsingGET(opponentLogin: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GameDTO>>;
    public acceptGameUsingGET(opponentLogin: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GameDTO>>;
    public acceptGameUsingGET(opponentLogin: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (opponentLogin === null || opponentLogin === undefined) {
            throw new Error('Required parameter opponentLogin was null or undefined when calling acceptGameUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (opponentLogin !== undefined && opponentLogin !== null) {
            queryParameters = queryParameters.set('opponentLogin', <any>opponentLogin);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<GameDTO>(`${this.basePath}/games/accept`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * addMove
     * 
     * @param id id
     * @param move move
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addMoveUsingPOST(id: number, move: MoveDTO, observe?: 'body', reportProgress?: boolean): Observable<MessageDTO>;
    public addMoveUsingPOST(id: number, move: MoveDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MessageDTO>>;
    public addMoveUsingPOST(id: number, move: MoveDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MessageDTO>>;
    public addMoveUsingPOST(id: number, move: MoveDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling addMoveUsingPOST.');
        }

        if (move === null || move === undefined) {
            throw new Error('Required parameter move was null or undefined when calling addMoveUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<MessageDTO>(`${this.basePath}/games/${encodeURIComponent(String(id))}/move`,
            move,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * challengeGame
     * 
     * @param opponentLogin opponentLogin
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public challengeGameUsingGET(opponentLogin: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public challengeGameUsingGET(opponentLogin: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public challengeGameUsingGET(opponentLogin: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public challengeGameUsingGET(opponentLogin: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (opponentLogin === null || opponentLogin === undefined) {
            throw new Error('Required parameter opponentLogin was null or undefined when calling challengeGameUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (opponentLogin !== undefined && opponentLogin !== null) {
            queryParameters = queryParameters.set('opponentLogin', <any>opponentLogin);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/games/challenge`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllGames
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllGamesUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<GameDTO>>;
    public getAllGamesUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<GameDTO>>>;
    public getAllGamesUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<GameDTO>>>;
    public getAllGamesUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<GameDTO>>(`${this.basePath}/games`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getGame
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getGameUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<GameDTO>;
    public getGameUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GameDTO>>;
    public getGameUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GameDTO>>;
    public getGameUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getGameUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<GameDTO>(`${this.basePath}/games/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * giveUp
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public giveUpUsingPOST(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public giveUpUsingPOST(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public giveUpUsingPOST(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public giveUpUsingPOST(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling giveUpUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.post<any>(`${this.basePath}/games/${encodeURIComponent(String(id))}/give-up`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * rejectGame
     * 
     * @param opponentLogin opponentLogin
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public rejectGameUsingGET(opponentLogin: string, observe?: 'body', reportProgress?: boolean): Observable<MessageDTO>;
    public rejectGameUsingGET(opponentLogin: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MessageDTO>>;
    public rejectGameUsingGET(opponentLogin: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MessageDTO>>;
    public rejectGameUsingGET(opponentLogin: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (opponentLogin === null || opponentLogin === undefined) {
            throw new Error('Required parameter opponentLogin was null or undefined when calling rejectGameUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (opponentLogin !== undefined && opponentLogin !== null) {
            queryParameters = queryParameters.set('opponentLogin', <any>opponentLogin);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<MessageDTO>(`${this.basePath}/games/reject`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
