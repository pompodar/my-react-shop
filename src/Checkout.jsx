import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Checkout() {

             const navigate = useNavigate();

const [selectedProds, setSelectedProds] = useState(() => {
  const localValue = localStorage.getItem("PRODS");
  try {
    return localValue ? JSON.parse(localValue) : [];
  } catch (error) {
    console.error("Error parsing JSON from local storage:", error);
    return [];
  }
});

    const [total, setTotal] = useState(0)
    
    useEffect(() => {
         const newTotal = selectedProds.reduce((acc, prod) => acc + prod.price, 0);

        setTotal(newTotal);
            localStorage.setItem("PRODS", JSON.stringify(selectedProds))

    }, [selectedProds])
    
    function deleteHandle(id) {
        setSelectedProds(currentSelectedProducts => {
      return currentSelectedProducts.filter(prod => prod.key !== id)
    })
    }

    const [discountCode, setDisCountCode] = useState("")

    const [discountCodeApplied, setDiscountCodeApplied] = useState(false)

    function discountInputHandle(inputValue) {
        setDisCountCode(inputValue);
        if (inputValue == "1234") {
            setTotal(total * 0.5)
            setDiscountCodeApplied(true)
        } else {
            if (discountCodeApplied) {
                setTotal(total / 0.5)
                setDiscountCodeApplied(false)

            }
        }
    }

    const [bought, setBought] = useState(() => {
        const localValue = localStorage.getItem("bought");
  try {
    return localValue ? localValue : false;
  } catch (error) {
    console.error("Error parsing JSON from local storage:", error);
    return false;
  }
    }

    )

    function buyHandle() {
        navigate("/thank-you")
        setBought(true)

        localStorage.setItem("bought", bought)
    }


    
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Link to="/">Home</Link>
            checkout
        <div>
            {selectedProds.length ?
                    <div>
                        {
                            selectedProds.map(selectedProd => {
                                const key = crypto.randomUUID()
                                selectedProd.key = key
                                return (
                                    <>
                                        <div key={key}>{selectedProd.title}
                                            <span
                                                onClick={e => deleteHandle(key)}
                
                                            > X </span></div>
                            
                                    </>
                                )
                            }
                            )}
                        
            <div>{ total }</div>
            <div>
      <label htmlFor="inputField">Discount Code:</label>
      <input
        type="text"
                                id="inputField"
                                onInput={e => discountInputHandle(e.target.value)}
        value={discountCode}
      />
                            </div>
                        <button
                        onClick={buyHandle}
                        >Buy</button>
                        </div>
                : <div>no products</div>
                
            }
                </div>
        </div>
    )
} 