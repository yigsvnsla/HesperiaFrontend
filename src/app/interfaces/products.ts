import { Image } from "./micellaneus";

export interface Category {
    created_at:Date
    updated_at:Date
    id:number
    name:string
    products:Products[]
}

export interface Products{
    updated_at:Date
    created_at:Date 
    category: number
    id: number
    product:Product
}

export interface Product{
    description: string
    id: number
    image:Image[]
    name: string
    price: number
}

export interface ProductOfOrder{
    description: string
    id: number
    name: string
    price: number
}

export interface itemOfOrder{
    cantProduct:number
    category:string
    product: Product
}

export interface orderBy{
    listProduct:itemOfOrder[]
    totalPrice:number 
    totalItems:number
    statusTable:string
    idTable:number
}

export interface order{
    id:number
    comanda:orderBy
    updated_at:Date
    created_at:Date 
}