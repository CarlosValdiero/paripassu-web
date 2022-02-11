import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private serverUrl = environment.urlApi + '/websockets';
    private stompClient?: Stomp.Client;
    private socket: WebSocket;
    private interval: any;

    private currentPasswordChangedStompSubscription?: Stomp.Subscription;

    private subjectCurrentPassword = new Subject<any>();

    constructor( ) {
        this.socket = SockJS(this.serverUrl);
        this.initializeWebSocketConnection();
     }

    initializeWebSocketConnection() {
        if(!this.stompClient || !this.stompClient.connected) {
            this.socket = SockJS(this.serverUrl);
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.debug = () => {};
            this.stompClient.connect( {} ,
                () => {
                    if (this.interval) {
                        clearInterval(this.interval);
                        this.interval = undefined;
                    }
                    this.checkSubscription();
                },
                () => {
                    this.unsubscribeCurrent();
                    if (!this.interval) {
                        this.interval = setInterval(() => {
                            this.initializeWebSocketConnection();
                        }, 15000);
                    }
                },
            );
        }
    }

    private checkSubscription(){
        if(this.subjectCurrentPassword.observers.length > 0) this.subscribeCurrentChanged();
    }

    private canUnsubscribeStomp(socket: WebSocket, stompSubscription?: Stomp.Subscription, subject?: Subject<any>): boolean {
      return !!stompSubscription && (socket?.readyState === WebSocket.CLOSED || (!!subject && subject.observers.length <= 0));
    }
    private canSubscribeStomp(stompClient?: Stomp.Client, stompSubscription?: Stomp.Subscription): boolean {
      return !!stompClient?.connected && !stompSubscription;
    }

    private subscribeCurrentChanged(): void {
        if (this.canSubscribeStomp(this.stompClient, this.currentPasswordChangedStompSubscription)) {
            this.currentPasswordChangedStompSubscription = this.stompClient?.subscribe('/password/current', (message) => {
                const object = JSON.parse(message.body);
                this.sendMessageCurrent(object);
            });
        }
    }

    private sendMessageCurrent(object: any) {
        this.subjectCurrentPassword.next(object);
    }

    unsubscribeCurrent(sub?: Subscription ): void {
        if (sub) {
          sub.unsubscribe();
        }
        if (this.canUnsubscribeStomp(this.socket, this.currentPasswordChangedStompSubscription, this.subjectCurrentPassword)) {
            this.currentPasswordChangedStompSubscription?.unsubscribe();
            this.currentPasswordChangedStompSubscription = undefined;
        }
    }

    getMessageCurrent(): Observable<any> {
      const obs = this.subjectCurrentPassword.asObservable();
      this.subscribeCurrentChanged();
      return obs;
    }
}