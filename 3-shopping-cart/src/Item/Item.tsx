import { CartItemType } from "../App";
import Button from "@mui/material/Button";
import { Wrapper } from "./Item.styles";

type Props={
    item:CartItemType;
    handleAddToCart:(clicked:CartItemType)=>void;
}

const Item:React.FC<Props>=({item,handleAddToCart})=>(
<Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
        <h3 className="bakmaz">{item.title}</h3>
        <p className="bakar">{item.description}</p>
        <h3>${item.price}</h3>
    </div>
    <Button onClick={()=>handleAddToCart(item)}>Add to cart</Button>
</Wrapper>
)

export default Item