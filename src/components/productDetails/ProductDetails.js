import React, { useContext, useRef } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./ProductDetails.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CartItemForm from "../cart/CartItemForm";
import Input from "../UI/Input";
import CartContext from "../../redux/cart-context";
import ProductDetailsForm from "./ProductDetailsForm";
import { getProduct } from "../../redux/actions/ProductAction";
import Product from './../Product';

export default function ProductDetails(props) {
  const [data, setData] = useState([]);
  const [star, setStar] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const param = useParams();
  let id = param.id;

  const cartCtx = useContext(CartContext);

  let slideIndex = 1;

  let dispatch = useDispatch();
  const { product } = useSelector(state => state.product)
  console.log(product, "redux");



  useEffect(() => {
    fetchHandler();
    dispatch(getProduct(id));
  }, []);

  useEffect(() => {
  }, [data]);

  const fetchHandler = (event) => {
    setIsLoading(true);
    axios.get(`https://fakestoreapi.com/products/${id}`).then((resp) => {
      setData(resp.data);
      setStar(resp.data.rating.rate);
      console.log(resp.data);
      setIsLoading(false);
    });
  };
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: data.id,
      image: data.image,
      title: data.title,
      amount: amount,
      price: data.price,
    });
  };
  const changeImgHandler = () => {
    var header = document.getElementsByClassName("preview-thumbnail");
    var imgBtns = document.getElementsByClassName("imgBtn");
    for (var i = 0; i < imgBtns.length; i++) {
      console.log(imgBtns[i]);
      imgBtns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  };

  const currentSlide = (n) => {
    console.log(n, "currentSlide");
    showSlides(n);
  };

  const showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    console.log("First Time");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      console.log("in fun First Time");
    }
    slides[n - 1].style.display = "block";
  };



  let arrStar = [];
  let countstar = Math.round(star);
  for (let i = 0; i < 5; i++) {
    if (countstar) {
      arrStar.push("checked");
    } else {
      arrStar.push("");
    }
    if (countstar != 0) countstar--;
  }

  let content = <p>Found no Data.</p>;
  let contentImg;
  if (isLoading) {
    content = (
      <div className="loading-placeHolder">
        <div className="bd-example bd-example-placeholder-cards d-flex justify-content-around">
          <div className="card" aria-hidden="true">
            <svg
              className="bd-placeholder-img card-img-top"
              width="100%"
              height="180"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#868e96"></rect>
            </svg>
            <div className="card-body">
              <div className="h5 card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </div>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a
                href="#"
                tabIndex="-1"
                className="btn btn-primary disabled placeholder col-6"
              ></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (data.id > 0) {
    content = (
      <div
        className="aem-GridColumn  aem-GridColumn--default--4 aem-GridColumn--phone--6 d-flex"
        key={data.id}
      >
        <div className="card-detail">
          <div className="card-body-detail">
            <ul className="breadcrumb">
              <li>
                <a>Clothing</a>
              </li>
              <li>
                <a>Women’s</a>
              </li>
              <li>Outerwear</li>
            </ul>
            <p className="title">{data.title.slice(0,17-3)+'...'}</p>
            <p className="price">${data.price}</p>
            <div className="rating">
              <div className="stars">
                {arrStar.map((arrStar) => (
                  <span
                    className={"fa fa-star " + (arrStar ? arrStar : arrStar)}
                  ></span>
                ))}


              </div>
              <span className="review-no"> ({data.rating.count}) </span>
            </div>
            <p className="description">
              {data.description.slice(0, 100 - 3) + "..."}
            </p>
            <div className="divider"></div>
            <p>Color</p>
            <a href="#" className="btn btn-black"></a>
            <a href="#" className="btn btn-white"></a>
            <a href="#" className="btn btn-darkGreen"></a>
            <a href="#" className="btn btn-yellow"></a>

            <p>Size</p>
            <a className="size ">XS</a>
            <a className="size ">S</a>
            <a className="size ">M</a>
            <a className="size ">L</a>
            <a className="size ">XL</a>

            <p>Quantity</p>
            <div className="quantity">
              <ProductDetailsForm onAddToCart={addToCartHandler} />
            </div>

            <img
              className="icon mr-rt-32"
              src={process.env.PUBLIC_URL + `/assets/icons/heart.svg`}
              alt="wishlist icon"
            />
            <span className="mr-rt-32">Save</span>

            <i className="fa fa-share-alt fa-mt-rt"></i>
            <span className="mr-rt-32">Share</span>
          </div>

        </div>
      </div>
    );
    contentImg = (
      <div className="card">
        <div className="card-body">
          <div className="aem-Grid aem-Grid--12 ">
            <div className="aem-GridColumn  aem-GridColumn--default--3 aem-GridColumn--phone--12 d-flex">
              <ul className="preview-thumbnail nav nav-tabs custom--phone--hide">
                <li>
                  <a data-target="#pic-1" data-toggle="tab">
                    <img
                      src={data.image}
                      alt="product-img "
                      onClick={changeImgHandler}
                      className="imgBtn first-child "
                    />
                  </a>
                </li>
                <li>
                  <a data-target="#pic-2" data-toggle="tab">
                    <img
                      src={data.image}
                      alt="product-img"
                      onClick={changeImgHandler}
                      className="imgBtn active"
                    />
                  </a>
                </li>
                <li>
                  <a data-target="#pic-3" data-toggle="tab">
                    <img
                      src={data.image}
                      alt="product-img"
                      onClick={changeImgHandler}
                      className="imgBtn "
                    />
                  </a>
                </li>
                <li>
                  <a data-target="#pic-4" data-toggle="tab">
                    <img
                      src={data.image}
                      alt="product-img"
                      onClick={changeImgHandler}
                      className="imgBtn "
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="aem-GridColumn  aem-GridColumn--default--9 aem-GridColumn--phone--12">
              {initialLoading ? <><img src={data.image} alt="product-img" className="img-wrapper" /></> :

                <>
                  <div className="slideshow-container">
                    <div className="mySlides fade">
                      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" />
                    </div>

                    <div className="mySlides fade">
                      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" />
                    </div>

                    <div className="mySlides fade">
                      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" />
                    </div>
                  </div>
                  <br />


                </>
              }
              <div className="dot-container custom--desktop--hide">
                <span className="dot" ></span>
                <span className="dot" ></span>
                <span className="dot" ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="productDetails">
        <div className="container">
          <div className="row">
            <div className="aem-Grid aem-Grid--12 ">
              <div className="aem-GridColumn  aem-GridColumn--default--6 aem-GridColumn--phone--12">
                <div>{contentImg}</div>


              </div>
              <div className="aem-GridColumn  aem-GridColumn--default--6 aem-GridColumn--phone--12">
                {" "}
                {content}{" "}
              </div>
              <div className="aem-GridColumn  aem-GridColumn--default--12 aem-GridColumn--phone--12">
                <div className="static ">
                  <p className="title">{data.title}</p>
                  <div className="aem-Grid aem-Grid--12 ">
                    <div className="aem-GridColumn  aem-GridColumn--default--6 aem-GridColumn--phone--12 padding-lt-rt-10">
                      <p className="description">Description</p>
                      <p className="description-text">{data.description}</p>
                      <div className="line"></div>
                    </div>
                    <div className="aem-GridColumn  aem-GridColumn--default--6 aem-GridColumn--phone--12 padding-lt-rt-10">
                      <p className="description">Details</p>
                      <ul>
                        <li>
                          <span className="description-text">
                            <img
                              className="icon mr-rt-7"
                              src={
                                process.env.PUBLIC_URL +
                                `/assets/icons/pd (1).png`
                              }
                              alt="ProductDetails icon"
                            />
                            Sweat-wicking
                          </span>
                        </li>
                        <li>
                          <span className="description-text">
                            <img
                              className="icon mr-rt-7"
                              src={
                                process.env.PUBLIC_URL +
                                `/assets/icons/pd (2).png`
                              }
                              alt="ProductDetails icon"
                            />
                            Breathable
                          </span>
                        </li>
                        <li>
                          <span className="description-text">
                            <img
                              className="icon mr-rt-7"
                              src={
                                process.env.PUBLIC_URL +
                                `/assets/icons/pd (3).png`
                              }
                              alt="ProductDetails icon"
                            />
                            Lightweight fabric
                          </span>
                        </li>
                        <li>
                          <span className="description-text">
                            <img
                              className="icon mr-rt-7"
                              src={
                                process.env.PUBLIC_URL +
                                `/assets/icons/pd (4).png`
                              }
                              alt="ProductDetails icon"
                            />
                            69% nylon
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
