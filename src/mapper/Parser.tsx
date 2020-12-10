import {parse} from "@babel/parser";

export const ParseToAst = (value?:string) => {
    if (value===undefined){
        value=''
    }
    try {
        return parse(value);
    }catch (e) {return ''}
}
