import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import Categories from "./Categories"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

export default function Shop() {
  const [products, setProducts] = useState([])
  const [featuredImages, setFeaturedImage] = useState([])


    function getProducts(data) {
        setProducts(data)
       

    }

  const fetchUserData = () => {


  
    fetch("https://tastytests.x10.mx/wp/wp-json/wp/v2/prod?_embed")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
         const productsWithShow = data.map(product => {
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
        { id: prod.id, title: prod.title.rendered, price: Number(prod.excerpt.rendered.replace("<p>", " ").replace("</p>", "").replace("/n", "")) },
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
          <ul
            style={{ display: "flex", flexWrap:  "wrap", gap: 40}}
          >
          {currentItems.map(product => (
            product.show === true ? <li
              style={{width: 200}}
              onClick={e => productClickHandle(product)}
              key={product.id}>
              {product.title.rendered}
              {product.excerpt.rendered.replace("<p>", " ").replace("</p>", "")}

              <img
                style={{width: 100}}
                src={product._embedded['wp:featuredmedia'][0].source_url} alt={product.title.rendered + " image"} />
              

              <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {/* {product.images.map((slideContent, index) => (
        <SwiperSlide key={slideContent} virtualIndex={index}>
          <img src={slideContent} alt={product.title + " image"} />
        </SwiperSlide>
      ))}      ... */}
    </Swiper>
            
            </li> : null
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