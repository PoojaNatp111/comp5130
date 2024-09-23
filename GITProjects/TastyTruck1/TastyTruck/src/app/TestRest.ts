import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

export class TestRest {
publicgetJsonValue: any;
public postJsonValue: any;
constructor(private http:HttpClient){

}
public getMethod(){
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe;
}

}