import { note } from './../modelo/note';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { race } from 'q';
import { mapTo} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  myCollection:AngularFirestoreCollection;

  constructor(private fireStore: AngularFirestore) {
    this.myCollection = fireStore.collection<any>(environment.collection);
  }

  readTODO():Observable<firebase.firestore.QuerySnapshot>{
    return this.myCollection.get();
  }

  readTODO2(timer:number=10000):Observable<note[]>{
    return new Observable((observer)=>{
      //observer.next() para devolver un valor
      //observer.error() para devolver un error
      //observer.complete() para cortar?
      let subscripcion:Subscription;
      let tempo = setTimeout(()=>{
        subscripcion.unsubscribe();
        observer.error("Timeout");
      }, timer);
      subscripcion = this.readTODO().subscribe((lista)=>{
        clearTimeout(tempo);
        let listado = [];
        lista.docs.forEach((nota)=>{
          listado.push({id:nota.id,...nota.data()}); // Concatena dos cosas para unirlas en una
        })
        observer.next(listado);
        observer.complete();
      })
    });
  }

  readTODO_race(timer:number=10000):Observable<firebase.firestore.QuerySnapshot>{
    let o1 = this.myCollection.get();
    let o2 = interval(timer).pipe(mapTo(null));
    return race(o1, o2);
  }

  readTODOByID(id:string):Observable<firebase.firestore.DocumentSnapshot>{
    return this.myCollection.doc(id).get();
  }

  addTODO(mynote:note):Promise<firebase.firestore.DocumentReference>{
    return this.myCollection.add(mynote);
  }

  updateTODO(id:string, data:note):Promise<void>{
    return this.myCollection.doc(id).set(data);
  }

  deleteTODO(id:string):Promise<void>{
    return this.myCollection.doc(id).delete();
  }

  /**
   * TAREA: read note where...
   */
  readTODOByCriteria(){

  }

  
}
