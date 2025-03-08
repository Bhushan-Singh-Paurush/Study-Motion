import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  totalAmount:localStorage.getItem("totalAmount") 
    ? JSON.parse(localStorage.getItem("totalAmount")) 
    : 0,
  cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
};

const Cart = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addtocart:(state,action)=>{
        const course=action.payload
        const index=state.cart.findIndex((item)=>item._id===course._id)

        if(index>=0)
        {
          toast.error("Course already in cart");
          return
        }
        else{
          state.cart.push(course)
          state.totalItems++
          state.totalAmount+=course.price

          localStorage.setItem("cart",JSON.stringify(state.cart))
          localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
          localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount))

          toast.success("Corse added successfully")
        }
    },
    removefromcart:(state,action)=>{  
          const index=state.cart.findIndex((item)=>item._id===action.payload)

          if(index>=0)
          {
            state.totalItems--
            state.totalAmount-=state.cart[index].price
            state.cart.splice(index,1)

            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
            localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount))
            toast.success("Course added to cart")
          }
    },
    resetcart:(state)=>{
          state.cart=[],
          state.totalItems=0,
          state.totalAmount=0,
          localStorage.removeItem("cart"),
          localStorage.removeItem("totalItems"),
          localStorage.removeItem("totalAmount")
    }
  },
});

export const { addtocart , removefromcart , resetcart } = Cart.actions;
export default Cart.reducer;
