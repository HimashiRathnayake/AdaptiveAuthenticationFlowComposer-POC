import generate from "@babel/generator";

export const GenerateCodeFromAst = (ast : any): string|undefined => {
    try{
        return generate(ast).code?.replaceAll("function (","function(");
    }catch (e) {}
}