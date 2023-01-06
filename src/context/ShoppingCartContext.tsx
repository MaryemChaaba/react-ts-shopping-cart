import  { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartContext ={
    OpenCart:()=>void,
    closeCart:()=>void,
    getItemQuantity:(id:number)=>number,
    increaseCartQuantity:(id:number)=>void,
    decreaseCartQuantity :(id:number)=>void,
    removeFromCart :(id:number)=>void,
    cartQuantity:number,
    cartItems:CartItem[]
}
type ShoppingCartProviderProps={
    children:ReactNode
}
type CartItem ={
    id:number,
    quantity:number
}

const ShoppingCartContext =createContext({} as ShoppingCartContext)
export function useShoppingCart(){
    return(
        useContext(ShoppingCartContext)
    )
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    function getItemQuantity(id:number){
        return  cartItems.find(item=>item.id===id)?.quantity||0
    }
    function increaseCartQuantity(id:number){
         setCartItems(currentItems=>{
           if (currentItems.find(item=>item.id===id)==null){
           return [...currentItems,{id,quantity:1}]
           }else{
            return currentItems.map(item=>item.id===id?{...item,quantity:item.quantity+1}:item)
           }

        })
           
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id)?.quantity === 1) {
            return currItems.filter(item => item.id !== id)
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            })
          }
        })
      }
    
    function removeFromCart(id:number){
        setCartItems(currentitem=>{
            return currentitem.filter(item=>item.id !== id)
        })
    }
    const OpenCart =()=>setIsOpen(true)
    const closeCart =()=>setIsOpen(false)
    
    const cartQuantity =cartItems.reduce((quantity,item)=>item.quantity+quantity,0)
    return(
        <ShoppingCartContext.Provider value={{getItemQuantity,increaseCartQuantity,decreaseCartQuantity
        ,removeFromCart,cartItems,cartQuantity,OpenCart,closeCart}}>
            {children}
            <ShoppingCart isOppen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}