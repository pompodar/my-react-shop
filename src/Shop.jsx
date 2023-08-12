import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import Categories from "./Categories"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Shop() {
    const [products, setProducts] = useState([])


    function getProducts(data) {
        setProducts(data)
       

    }

  const fetchUserData = () => {
    fetch("https://dummyjson.com/products")
      .then(response => {
        return response.json()
      })
      .then(data => {
         const productsWithShow = data.products.map(product => {
    return { ...product, show: true }; // Set 'show' to true initially, modify it as needed
  });
        setProducts(productsWithShow);
      })
  }

    useEffect(() => {
      console.log("fetch");
    fetchUserData()
  }, [])
    
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage] = useState(10);


  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)


        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const filteredProducts = products.filter(product => product.show === true);

        const currentItems = filteredProducts.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

const [selectedProds, setSelectedProds] = useState(() => {
  const localValue = localStorage.getItem("PRODS");
  try {
    return localValue ? JSON.parse(localValue) : "";
  } catch (error) {
    console.error("Error parsing JSON from local storage:", error);
    return "";
  }
});
         const navigate = useNavigate();


  function productClickHandle(prod) {
    console.log(prod);

    setSelectedProds(currentSelectedProds => {
      return [
        ...currentSelectedProds,
        { id: prod.id, title: prod.title, price: prod.price },
      ]
    })
  }

  const [pageLoaded, setPageLoaded] = useState(true);

  useEffect(() => {
    if (selectedProds !== "") {
    localStorage.setItem("PRODS", JSON.stringify(selectedProds))
    }
    if(!pageLoaded) {navigate('checkout')} else {setPageLoaded(false)}        
  }, [selectedProds])


  return (
    <div>
                   <Link to="/checkout">Checkout</Link>
          {currentItems && (
              <>
                  <Categories products={products} getProducts={getProducts} />
        <ul>
          {currentItems.map(product => (
            product.show === true ? <li
              onClick={e => productClickHandle(product)}
              key={product.id}>{product.title} {product.price}</li> : null
))}
              </ul>
              <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
                  />
                  </>
      )}
    </div>
  );
}