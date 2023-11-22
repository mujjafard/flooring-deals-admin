import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ProductViewPage = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get(`http://174.138.112.6/api/product/get/${id}`)
            .then((res) => {
                const response = res.data
                console.log(278, response)
                setProductData(response)
                console.log(17, response)
            })
            .catch((err) => { console.log(err) })
    }, [id]);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    return (
        <>
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content ">
                        <button type="button" class="btn-close" style={{ position: 'absolute', right: "20px", display: "flex", zIndex: "1", marginTop: 20 }} data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="modal-body">
                            <img src={selectedImage} className='popup-img' alt="" style={{ height: "29rem" }} />
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="mb-4 title">Product Details</h3>

            <form class="row g-3 pt-3 shadow p-3 mb-5" style={{ padding: 20, backgroundColor: "#f7f6ed" }} >

                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label txt-input">Product Name :</label> &nbsp; {productData[0]?.name}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Installation Method :</label> &nbsp; {productData[0]?.installation_method}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Price :</label> &nbsp; {productData[0]?.price}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Sale Price :</label> &nbsp; {productData[0]?.sale_price}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Stock :</label> &nbsp; {productData[0]?.stock}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Box Price :</label> &nbsp; {productData[0]?.BoxPrice}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Box Coverage :</label> &nbsp; {productData[0]?.BoxCoverage}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Rating :</label> &nbsp; {productData[0]?.ratings}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Review :</label> &nbsp; {productData[0]?.review}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Collection Name :</label> &nbsp; {productData[0]?.Collection_Name}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">New Product :</label> &nbsp; {productData[0]?.newProduct ? "true" : "false"}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Thickness :</label> &nbsp; {productData[0]?.thickness}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Wear Layer Thickness :</label> &nbsp; {productData[0]?.wear_layer_thickness}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Discount :</label> &nbsp; {productData[0]?.isDiscount ? "true" : "false"}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Width :</label> &nbsp; {productData[0]?.width}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Best Seller :</label> &nbsp; {productData[0]?.BestSeller ? "true" : "false"}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Length :</label> &nbsp; {productData[0]?.length}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">SKU :</label> &nbsp; {productData[0]?.sku}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Main Category :</label> &nbsp; {productData[0]?.SuperCatName}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Category :</label> &nbsp; {productData[0]?.CatName}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Sub Category :</label> &nbsp; {productData[0]?.SubCatName}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Brand Name :</label> &nbsp; {productData[0]?.BrandName}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Most Viewed :</label> &nbsp; {productData[0]?.IsmostViewed ? "true" : "false"}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Short Description :</label> &nbsp; {productData[0]?.short_desc}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Long Description :</label> &nbsp; {productData[0]?.long_desc}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Additional info :</label> &nbsp; {productData[0]?.additional_info}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Colour :</label> &nbsp; {productData[0]?.color}
                </div>

                <div class="col-md-6 ">
                    <label for="formFile" class="form-label txt-input">Upload Pictures / Files :</label><br />
                    {productData[0]?.productPictures.map((item, index) => {
                        return (
                            <>
                                <img key={index} className=" mx-1 mt-1" alt="" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ height: "60px" }} src={item} onClick={(e) => setSelectedImage(item)} />
                            </>
                        );
                    })}
                </div>

                <div class="col-md-12 text-center " style={{ marginTop: "30px" }}>
                    <Link to={`/admin/Products/${productData[0]?._id}`} type="submit" class="btn btn-primary shadow border-0 p-2 fw-bold" style={{ backgroundColor: "#e67929", width: 100, }} >Edit </Link>
                    <Link to={"/admin/ProductList"} type="submit" class="btn btn-primary fw-bold shadow border-0 p-2 mx-3" style={{ backgroundColor: "#e67929", width: 100, }} >Back </Link>
                </div>

            </form>
        </>
    )
}

export default ProductViewPage
