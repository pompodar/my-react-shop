import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


export default function ThankYou() {
                 const navigate = useNavigate();



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

    const [boughtProducts, setBoutProducts] = useState(() => {
      const localValue = localStorage.getItem("PRODS");
  try {
    return localValue ? JSON.parse(localValue) : [];
  } catch (error) {
    console.error("Error parsing JSON from local storage:", error);
    return [];
  }
    });
  useEffect(() => {
    // This code will run when the component mounts

    // Perform your side effect here

    // Clean up the effect (optional) by returning a cleanup function
    return () => {
      // Cleanup code (if needed) runs when the component unmounts
    };
  }, []);
  
  useEffect(() => {
    if (1 == 3) {
 navigate("/") 

    }
  }, [boughtProducts])

     useEffect(() => {
       if (!localStorage.getItem("PRODS")) {
         navigate("/")
       console.log(localStorage.getItem("PRODS"));
       } else {
                console.log(localStorage.getItem("PRODS"));

       }



         
          setTimeout(() => {
                   // localStorage.setItem("bought", false)
                              localStorage.setItem("PRODS", "")


        }, 500);

    }, [])

   return (
  <>
    {boughtProducts ? (
      <>
        <Link to="/">Home</Link>
        <p>Thanks for buying</p>
        {boughtProducts.map(boughtProd => {
          const key = crypto.randomUUID();
          return (
            <div key={key}>{boughtProd.title}</div>
          );
        })}
      </>
    ) : (
           <div></div>
    )}
  </>
);

}


