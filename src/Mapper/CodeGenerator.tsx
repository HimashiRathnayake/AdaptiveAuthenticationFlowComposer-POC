import generate from "@babel/generator";

export const GenerateCodeFromAst = (ast : any): string|undefined => {
    try{
        return generate(ast).code.substr(0,generate(ast).code.length-1);
    }catch (e) {}
}