import { AddShoppingCart } from "@mui/icons-material";
import { Badge, Drawer, Grid, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { Wrapper } from "./App.styles";


export type CartItemType = {
  id: number;
  category: string;
  dascription: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};



const getProducts = async (): Promise<CartItemType[]> => {
  return(
  await (await fetch(`https://fakestoreapi.com/products`)).json())
};

function App() {

  const {data,isLoading,error}=useQuery<CartItemType[]>('products',getProducts)
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems,setCartItems]= useState([] as CartItemType[])
  console.log(data)

const getTotalItems=()=>null

const handleAddToCart=()=>null

const handleRemoveFromCart=()=>null

if(isLoading) return <LinearProgress/>
if(error)return <div>Something went wrong...</div>

  return <div className="App"></div>;
}

export default App;
