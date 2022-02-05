// import { Injectable } from '@angular/core'; 
// import * as firebase from "firebase/app"; 

// //Now import this 
// import 'firebase/firestore';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

// import { Observable } from 'rxjs';
// import { AngularFireStorage } from '@angular/fire/storage'; 
// import { map } from 'rxjs/operators';
// @Injectable()
// export class FirebaseService {
// // participantCol:AngularFirestoreCollection<Participant>; 
// // participantDoc:AngularFirestoreDocument<Participant> ;
// // Participant:Observable<Participant>;
// // Participant$:any;  
// // Participants:Observable<Participant[]>;
//   constructor(private afs:AngularFirestore) {  
//     // this.participantCol=this.afs.collection('participant',ref=>ref.orderBy('createAt','desc')); 
//     // this.Participants=this.participantCol.snapshotChanges().pipe( 
//     //   map(action=> {return action.map( 
//     //     a=>
//     //     { 
//     //       const data =a.payload.doc.data() as Participant ; 
//     //       data.partId=a.payload.doc['id'];
//     //       return data ; 
//     //     }
//     //   ) })
//     // );
//   } //end of constructor 
//   getParticipants(){ 
//   return this.Participants;
//   } //end of get participant list
//   getParticipant(partId){ 
//     this.participantDoc=this.afs.doc<Participant>('participant/$(partId)'); 
//     return this.Participant=this.participantDoc.valueChanges()
//     }//end of get participant 
// } 

