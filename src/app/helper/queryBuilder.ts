export class QueryBuilder {
  static getQueryAllInObj(obj:any, value:any) {
    let str = "";
    let keys = Object.keys(obj);

    if(!obj)
    {
      return "";
    }

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if(index != 0)
      {
        str+= " or "
      }
      str+= key+" eq \'" + value + "\'";
    }
    return str;
  }
}
