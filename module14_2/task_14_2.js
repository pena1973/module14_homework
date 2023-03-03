// json активно использую в 1C
// очень люблю этот формат, 
// он не только в js, но и в 1С одной командой преобразуется в обьект
export function task_14_2()
{
    const JSONString =
        `{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }`;

    const OBJ = JSON.parse(JSONString);
    console.log(OBJ);
}