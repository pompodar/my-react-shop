import {useState} from "react"

export default function Categories(props) {
    const products = props.products

    const categories = Array.from(new Set(products.map(product => product.category)));
    categories.push("all categories")

    const [cat, setCat] = useState("");


    const categoryHandle = (category) => {
        if (category === "all categories") {
        setCat("all")
        } else {
            setCat(category)
        }

        props.getProducts(currentProds => {
            return currentProds.map(prod => {
                if (category == "all categories") {
                    return { ...prod, show: true }
                }
                else if (prod.category !== category || prod.price > price) {
                    return { ...prod, show: false }
                } else {
                    return { ...prod, show: true }
                }
            })
        })
    };
    
    const [price, setPrice] = useState(2000);

  const handleRangeChange = (event) => {
      setPrice(event);

      props.getProducts(currentProds => {
          return currentProds.map(prod => {
              if (cat == "" || cat == "all") {
                    if (prod.price > event) {
                    return { ...prod, show: false }
                } else {
                    return { ...prod, show: true }
                }
              } else {
                  if (prod.category !== cat || prod.price > event) {
                    return { ...prod, show: false }
                } else {
                    return { ...prod, show: true }
                }
                }
            })
        })
  };

    return (
        <>
            <input
        type="range"
        min="0"
        max="2000"
        step="200"
        value={price}
        onInput={event => handleRangeChange(event.target.value)}
            />
                  <p>Price : {price}</p>

            <ul className="categories">
            {
                    categories.map(category => {
                        return (
                            <li
                                onClick={() => categoryHandle(category)}
                                key={category}>{category}</li>
                        )
                    })
                }
                </ul>
        </>
    )
}