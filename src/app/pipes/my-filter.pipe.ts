import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(objs:any, term:any){
    if (term === undefined) {
    return objs;
    }
    return objs.filter((obj)=> {
    return (obj.lastName.toLowerCase().includes(term.toLowerCase()) 
    || obj.FirstName.toLowerCase().includes(term.toLowerCase()));
    })
    }

}
