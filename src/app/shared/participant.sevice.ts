import { Injectable } from '@angular/core';
import { AngularFireList,AngularFireObject ,AngularFireDatabase} from '@angular/fire/database';
import { userInfo } from 'os';
import { Key } from 'protractor';
import { Participant } from '../models/participant'; 

import { User } from "../models/User";
@Injectable({
  providedIn: 'root'
})
export class ParticipantService {  
  participantListRef : AngularFireList <any> ;  
  participantRef: AngularFireObject<any>;
public participant :any ; 
user ={} as User ;
  name: string;

  constructor(private db:AngularFireDatabase ) { 
    this.participantListRef=db.list('/participant')
   } 
   //let's create our crud 
   createParticipant(part:Participant)
{ 
  return this.participantListRef.push({ 
    name:part.name,
    email:part.email ,
    mobile:part.mobile, 
    details:part.details ,
    photoURL:part.photoURL
  }) 
}
  getParticipant(id:string)
  { 
    return this.participantRef= this.db.object('/participant'+id)
  } 
  getParticipantList()
  { 
    return this.participantListRef= this.db.list('/participant')
  } 
  updateParticipant (id: string ,part:Participant)
{ 
  return this.participantRef.update({ 
    name:part.name,
    email:part.email ,
    mobile:part.mobile, 
    details:part.details, 
    photoURL:part.photoURL
  })  
}   

viewUser(userId:any){
  var userRef=this.participant.child(userId);
  return userRef.once('value');}
deleteParticipant(id:string)
  { 
    this.participantRef= this.db.object('/participant/'+id) 
    this.participantRef.remove()
  } 
} 

