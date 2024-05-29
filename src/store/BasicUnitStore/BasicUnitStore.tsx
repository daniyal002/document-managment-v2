import { IBasicUnit } from "@/interface/basicUnit"
import { create } from "zustand"

interface IBasicUnitStore{
    basicUnit: IBasicUnit[]
}

export const useBasicUnitStore = create<IBasicUnitStore>((set) =>({
    basicUnit:[
        {id:1, name:"шт",fullName:"штука"},
        {id:2, name:"уп",fullName:"упаковка"},
        {id:3, name:"ящ",fullName:"ящик"},
        {id:4, name:"л",fullName:"литр"},

]
}))