import { IUnit } from "@/interface/unit"
import { create } from "zustand"

interface IUnitStore{
    unites:IUnit[]
}

export const useUnitStore = create<IUnitStore>((set) =>({
    unites:[
        {id:1, name:"шт", basicUnit:{id:1,name:"шт",fullName:"штука"}, factor:1,product:{id:1, name:"Товар 1",basicUnit:{id:1,name:"шт",fullName:"штука"}}},
        {id:2, name:"шт", basicUnit:{id:1,name:"шт",fullName:"штука"}, factor:1,product:{id:2, name:"Товар 2",basicUnit:{id:1,name:"шт",fullName:"штука"}}},
        {id:3, name:"шт", basicUnit:{id:1,name:"шт",fullName:"штука"}, factor:1,product:{id:3, name:"Товар 3",basicUnit:{id:1,name:"шт",fullName:"штука"}}},
        {id:4, name:"шт", basicUnit:{id:1,name:"шт",fullName:"штука"}, factor:1,product:{id:4, name:"Товар 4",basicUnit:{id:1,name:"шт",fullName:"штука"}}},
        {id:5, name:"уп", basicUnit:{id:2,name:"уп",fullName:"упаковка"}, factor:6,product:{id:1, name:"Товар 1",basicUnit:{id:1,name:"шт",fullName:"штука"}}}

    
]
}))