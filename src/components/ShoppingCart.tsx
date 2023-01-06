import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

type ShoppingCartProps ={
    isOppen:boolean
}

export function ShoppingCart ({isOppen}:ShoppingCartProps){
    const {closeCart,OpenCart ,cartItems} = useShoppingCart()
    return(
        <Offcanvas show={isOppen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item=>(
                        <CartItem key={item.id} {...item}/>
                    ))}
                    <div className="ms-auto fw-bold fs-5" >
                    Total : {formatCurrency(
                        cartItems.reduce((total,currentitem)=>{
                            const item = storeItems.find(item=>item.id==currentitem.id)
                            return total + currentitem .quantity* (item?.price||0)
                        },0)
                    )}
                </div>
                </Stack>
                
            </Offcanvas.Body>
        </Offcanvas>
    )
}