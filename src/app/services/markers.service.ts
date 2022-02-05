import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  constructor(public firestore:AngularFirestore ) { } 
  saveMarkers(coords){ 
    this.firestore.collection(`Marker/${new Date().getTime()}`).add({   
      id:coords.id,
      latitude:coords.latitude, 
      longitude:coords.longitude, 
      message:'hi buddy'
    }).then(()=>{ 
      alert('added');
    })
  } 
  getAllMarkers(){ 
    return this.firestore.collection('Marker').valueChanges()
    
  }  
  saveTree(data){ 
    this.firestore.collection('Marker').add({ 
      name:data.name, 
      treename:data.treename, 
      treeNbr:data.treeNbr,  
      treeUrl:data.treeUrl,
      id:data.id, 
      
    }).then(()=>{ 
      alert('added');
    })
  }  
  

}
