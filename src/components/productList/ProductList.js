import React, {useCallback, useState, useEffect } from "react";
import axios from "axios";
import './productList.scss';
import Filter from "./Filter";
import { Link } from "react-router-dom";
import FilterMenu from "./FilterMenu";

export default function ProductList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCatogery] = useState([]);
    const [latest, setLatest] = useState(false); 
    const [oldest, setOldest] = useState(false); 
    const [highToLow, setHighToLow] = useState(false); 
    const [lowToHigh, setLowToHigh] = useState(false); 
    const [search, setsearch] = useState("");
    const [pagination, setPagination] = useState(1);
    const [startIndex , setStartIndex ] = useState(0);
    const [endIndex , setEndIndex ] = useState(12);

    const [state, setState] = useState({
        products: data,
        filters: new Set(),
      })
      useEffect(() => {
        fetchHandler();
        
    }, []);
    useEffect(() => {
        checkDistinct();
        
    }, [data]);

    const fetchHandler = (event) => {
        setIsLoading(true);
        axios
          .get("https://fakestoreapi.com/products")
          .then((resp) => {
            setData(resp.data);
            console.log(resp.data);
            setIsLoading(false);
            
          });
          
          
    }

    const [productPage, setProductPage] = useState({
        initialPage: 0,
        totalPage: Math.ceil(data.length / 12),
        currentPageNo: 1,
        prevPage: false,
        nextPage: true
      });
    const totalPage = state.products.length > 0 ? Math.ceil(state.products.length / 12) : Math.ceil(data.length / 12);

    const pageNavigate = (event, pageNo, prev, next) => {
        pageNo = event.target.textContent;
        event.target.parentNode.childNodes.forEach((item) => {
          item.classList.remove("active");
        })
        event.target.classList.add("active");
        prev = +pageNo === 1 ? false : true;
        next = +pageNo === +totalPage ? false : true;
        setProductPage((item) => ({
          ...item,
          initialPage: (pageNo - 1) * 12,
          currentPageNo: pageNo,
          prevPage: prev,
          nextPage: next
        }));
      }

      const nextPage = (event, pageNo, next) => {
        let activePage = "";
        let totalPages = event.target.parentNode.childNodes;
        totalPages.forEach((item, index) => {
          if (item.classList.contains("active")) {
            activePage = item;
          }
          item.classList.remove("active");
        });
        pageNo = activePage.nextSibling.textContent;
        next = +pageNo === +totalPage ? false : true;
        if (Number.isInteger(+pageNo)) {
          activePage.classList === "active" && activePage.classList.remove("active");
          activePage.nextSibling.classList.add("active");
          setProductPage((item) => ({
            ...item,
            initialPage: (pageNo - 1) * 12,
            currentPageNo: pageNo,
            prevPage: true,
            nextPage: next
          }));
    
        }
      }

      const prevPage = (event, pageNo, prev) => {
        let activePage = "";
        let totalPages = event.target.parentNode.childNodes;
        totalPages.forEach((item, index) => {
          if (item.classList.contains("active")) {
            activePage = item;
          }
          item.classList.remove("active");
        });
        pageNo = activePage.previousSibling.textContent;
        prev = +pageNo === 1 ? false : true;
        if (Number.isInteger(+pageNo)) {
          activePage.classList === "active" && activePage.classList.remove("active");
          activePage.previousSibling.classList.add("active");
          setProductPage((item) => ({
            ...item,
            initialPage: (pageNo - 1) * 12,
            currentPageNo: pageNo,
            nextPage: true,
            prevPage: prev
          }));
        }
      }
    

    let content = <p>Found no Data.</p>;
    let categoryNames = <p>Found no Data.</p>;
    let paginationCount = <p>Found no Data.</p>;
    if (isLoading) {
        content = 
        <>
        Loading...
        </>
        categoryNames =
        <div class="wrapper">
            <input type="checkbox" id="Loading" name="Loading" value="Loading" />
            <label htmlFor="Loading"> Loading...</label><br></br>
        </div>
        
        paginationCount = <>Loading</>
        
      
    }
    if (data.length > 0 ) {
        if(latest){
            data.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)); 
        }
        else if(oldest){
            data.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
        }
        else if (highToLow) {
            data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }else if(lowToHigh){
            data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }
       
        // content = datas
        // .filter((datas) =>
        // datas.category.toLowerCase().includes(search.toLowerCase()))
        // .filter((data) => (data.id >= startIndex) && (data.id<= endIndex) )
       
        
        if(state.products.length !== 0){
            if(latest){
                state.products.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)); 
            }
            else if(oldest){
                state.products.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)); 
            }
            else if (highToLow) {
                state.products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            }else if(lowToHigh){
                state.products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }
            content = state.products
            .filter((data) =>
            data.category.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
                
                <div className="aem-GridColumn  aem-GridColumn--default--4 aem-GridColumn--phone--6 d-flex" key={item.id}>
                    <div className='card'>
                        <Link to={`/venia/products/ProductDetails/${item.id}`}>
                            <div className='card-body'> 
                                <img src={item.image} alt="product-img" className='img-wrapper'/>
                                <p className='title'>{item.id}</p>
                                <p className='title'>{item.title.slice(0,17-3)+'...'}</p>
                                <p className='price'>${item.price}</p>
                                <img className="icon" src={process.env.PUBLIC_URL + `/assets/icons/heart.svg`} alt="wishlist icon"/>
                            </div>
                        </Link>
                    </div>
                </div>     
            ));
            }
    
        categoryNames =
        category.map((category) => (
            <>
            <div class="filter-wrapper">
                <input type="checkbox" class="radioCheck" onClick={() =>filterSelection(category)} id={category}  value={category} />
                <label htmlFor={category}> {category}</label><br></br>
            </div>
            </>
          )) 
        // paginationCount = 
        // <>
        //     <a ><button onClick={event => nextPage(event,"1")}>1</button></a>
        //     <a ><button onClick={event => nextPage(event,"2")}>2</button></a>
        // </>
        
    }

    const checkDistinct = () => {
        var  distinctCategory = [] ;
          for(var i = 0 ; i< data.length ; i++){
            distinctCategory.push(data[i].category);
          }
        setCatogery(distinctCategory.filter((x, i, a) => a.indexOf(x) == i));
          console.log(category);
          
      };
      const filterSelection = (category) => {
        setsearch(category);

      };
      const onSelect = () => {
        let text;
        let dataSort = [];
        let getValue = document.getElementById("sort").value;
        switch(getValue) {
            case "sortByLatest":
                setLatest(true);
                setOldest(false);
                setLowToHigh(false);
                setHighToLow(false);
                
            break;
            case "sortByOldest":
                setLatest(false);
                setOldest(true);
                setHighToLow(false);
                setLowToHigh(false);
                
                
            break;
            case "highToLow":{
                setLatest(false);
                setOldest(false);
                setHighToLow(true);    
                setLowToHigh(false);
                   }
            break;
            case "lowToHigh":{
                setLatest(false);
                setOldest(false);
                setHighToLow(false); 
                setLowToHigh(true);     
            }
            break;
            case "Reset":{
                alert("Reset");
                setHighToLow(false); 
                setLowToHigh(false); 
                fetchHandler();
            }
            break;
            default:
                setHighToLow(false); 
                setLowToHigh(false);  
                fetchHandler();
                
          }
      };

    //   const nextPage = (event ,currentPage) => {
    //     console.log(currentPage);
    //     setPagination(currentPage);
    //     switch(currentPage) {
    //         case "1":{
    //             setStartIndex(0);
    //             setEndIndex(12);
    //             break;
    //         }
    //         case "2":{
    //             setStartIndex(startIndex + 12);
    //             setEndIndex(endIndex + 12);
    //             break;
    //         }
            
    //         default:
    //             alert("Page End");
    //     }
    //   }

      const datas = state.products.length > 0 ? state.products.filter((item, index) => (index >= productPage.initialPage && index < productPage.currentPageNo * 12)) : data.filter((item, index) => (index >= productPage.initialPage && index < productPage.currentPageNo * 12));
      
      content = 
      datas.map((item) => (
            
        <div className="aem-GridColumn  aem-GridColumn--default--4 aem-GridColumn--phone--6 d-flex" key={item.id}>
            <div className='card'>

            <Link to={`/venia/products/ProductDetails/${item.id}`}>
                    <div className='card-body'> 
                        <img src={item.image} alt="product-img" className='img-wrapper'/>
                        <p className='title'>{item.title.slice(0,17-5)}</p>
                        <p className='price'>${item.price}</p>
                        <img className="icon" src={process.env.PUBLIC_URL + `/assets/icons/heart.svg`} alt="wishlist icon"/>
                    </div>
                </Link>
            </div>
        </div>     
    ));

    function Product(props) {
    const { product } = props


    return (
      <li
        key={product.id}
        className="product">
        <img src={product.image} />
        <div className="product-details">
          <header>{product.title}</header>
          <div className="category">{product.category}</div>
        </div>
      </li>
    )
  }

    function ProductsList(props) {
        const { products } = props
        
        return (
          <ul className="products">
            {products.map(product => (
              <Product product={product} />
            ))}
          </ul>
        )
      }
    const handleFilterChange = useCallback(event => {
        setState(previousState => {
          let filters = new Set(previousState.filters)
          let products = data;
          
          if (event.target.checked) {
            filters.add(event.target.value)
          } else {
            filters.delete(event.target.value)
          }
          
          if (filters.size) {
            products = products.filter(product => {
              return filters.has(product.category)
            })
          }
          
          return {
            filters,
            products,
          }
        })
      }, [setState,data])


  return (
    <section className='productList'>
        <div className='container'>
            <div className='row'>
            <div className="aem-Grid aem-Grid--12 ">
                <div className="aem-GridColumn  aem-GridColumn--default--3 aem-GridColumn--phone--hide ">
                    <ul className="breadcrumb">
                        <li><a>Clothing</a></li>
                        <li><a>Women’s</a></li>
                        <li>Outerwear</li>
                    </ul> 
                </div>
                <div className="aem-GridColumn  aem-GridColumn--default--9 aem-GridColumn--phone--hide">
                    <div className="aem-Grid aem-Grid--12 ">
                        <div className="aem-GridColumn  aem-GridColumn--default--6 ">
                        <span className="results"> {data.length} Results</span>
                        </div>
                        <div className="aem-GridColumn  aem-GridColumn--default--6 ">
                            <div className="sort">
                            <select id="sort" name="sort" className="btn" onChange={() =>onSelect()} >
                                <option value="sortByLatest">Sort By Latest </option>
                                <option value="sortByOldest">Sort By Oldest</option>
                                <option value="highToLow">Price: High to Low</option>
                                <option value="lowToHigh">Price: Low to High</option>                                
                            </select>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            </div>
            <div className='row'>
                <div className="aem-Grid aem-Grid--12 ">
                    <Filter categoryNames={categoryNames} category={category} filterSelection={filterSelection}  
                    categories={category}
                    onFilterChange={handleFilterChange}/>
                    <div className="aem-GridColumn  aem-GridColumn--default--9 aem-GridColumn--phone--12">
                    <div className="aem-GridColumn  custom--desktop--hide aem-GridColumn--phone--12">
                        <div className="aem-Grid aem-Grid--12 d-flex Filter-sort-align-mob tp-bt-10">
                                <div className="aem-GridColumn  custom--desktop--hide aem-GridColumn--phone--12">
                                    <ul className="breadcrumb">
                                        <li><a>Clothing</a></li>
                                        <li><a>Women’s</a></li>
                                        <li>Outerwear</li>
                                    </ul> 
                                </div>
                        </div>
                        <div className="aem-Grid aem-Grid--12 d-flex Filter-sort-align-mob tp-bt-10" style={{ margin : "20px 0px"}}>
                                
                                <div className="aem-GridColumn  custom--desktop--hide aem-GridColumn--phone--6">
                                   <div className="filter">
                                       
                                        <FilterMenu categoryNames={categoryNames}/>
                                    </div>
                                </div>
                                <div className="aem-GridColumn  custom--desktop--hide aem-GridColumn--phone--6">
                                   <div className="filter">
                                        <img className="sort-icon" src={process.env.PUBLIC_URL + `/assets/icons/sort.png`}  alt="profile icon"/>
                                        <a className="Filter-sort">Sort Products</a>
                                    </div>
                                </div>
                            
                        </div>
                        <div className="aem-Grid aem-Grid--12 d-flex Filter-sort-align-mob tp-bt-10">
                            <div className="aem-GridColumn  custom--desktop--hide aem-GridColumn--phone--12">
                                 <div className="filter">
                                    <a className="results">{data.length} Results</a></div>
                            </div>
                        </div>  
                    </div>
                        <div className="aem-Grid aem-Grid--12 d-flex">
                            {content}
                            
                        </div>
                        <div className="aem-Grid aem-Grid--12 d-flex justify-content-center">
                            
                            {/* <div class="pagination">
                                
                                {paginationCount}
                            </div> */}
                              <div className="pagination">
            <ul>
              {productPage.prevPage && <li className="prev" onClick={prevPage}>prev</li>}
              {Array.from({length: totalPage}).map((item, index) => {
                return <li key={index} className={index === 0 ? "active" : undefined} onClick={pageNavigate}>{index + 1}</li>
              })}
              {totalPage > 1 && productPage.nextPage && <li className="next" onClick={nextPage}>next</li>}
            </ul>
          </div>
                        </div>

                    </div>  
                    
                </div>
            </div> 
        </div> 
    </section>
  )
}
