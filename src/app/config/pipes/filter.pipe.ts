import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'filter'
})

export class FilterPipe implements PipeTransform{

//<>

    transform(value: any, ...args: any[]) {
        console.log(value, args)
        const resultPosts = [];
        for (const post of value) {
            if (post.encuesta.toLowerCase().indexOf(args) > -1 ) {
                resultPosts.push(post);
            }
            
        }
        return resultPosts;
    }



}