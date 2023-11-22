import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const OrderViewPage = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get(`http://174.138.112.6/api/order/${id}`)
            .then((res) => {
                const response = res.data
                console.log(15, response)
                setOrderData(response)
                // console.log(317, response)
            })
            .catch((err) => { console.log(err) })
    }, [id]);

    // const openModal = (image) => {
    //     setSelectedImage(image);
    //     setModalOpen(true);
    // };

    return (
        <>
            {/* <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content ">
                        <button type="button" class="btn-close" style={{ position: 'absolute', right: "20px", display: "flex", zIndex: "1", marginTop: 20 }} data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="modal-body">
                            <img src={selectedImage} className='popup-img' alt="" style={{ height: "29rem" }} />
                        </div>
                    </div>
                </div>
            </div> */}

            <h3 className="mb-4 title ">Product Order </h3>

            <form class="row g-3 pt-3 shadow p-3 mb-5" style={{ padding: 20, backgroundColor: "#f7f6ed" }} >
                <h5 className="fw-bold">Personal Details </h5>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label txt-input">First Name :</label> &nbsp; {orderData[0]?.firstName}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Last Name :</label> &nbsp; {orderData[0]?.lastName}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Email :</label> &nbsp; {orderData[0]?.email}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">City :</label> &nbsp; {orderData[0]?.city}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Mobile No. :</label> &nbsp; {orderData[0]?.mNo}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Postal Code :</label> &nbsp; {orderData[0]?.postalCode}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Total Price :</label> &nbsp; {orderData[0]?.totalPrice}
                </div>
                <h4 className='fw-bold text-center'>Order Item</h4>

                {
                    orderData[0]?.orderItems.map((item, index) => {
                        return (<>
                            <div className="border order-card bg-white">
                                <h5 className='pt-3 fw-bold'>{index+1}. Product Details</h5>
                                <div className="row pt-2">
                                    <div class="col-md-6">
                                        <label for="formFile" class="form-label txt-input">Product Name :</label> &nbsp; {item.ProductName}
                                    </div>

                                    <div class="col-md-6">
                                        <label for="formFile" class="form-label txt-input">SKU :</label> &nbsp; {item.SKU}
                                    </div>

                                    <div class="col-md-6">
                                        <label for="formFile" class="form-label txt-input">Box Coverage :</label> &nbsp; {item.boxCovrage}
                                    </div>

                                    <div class="col-md-6">
                                        <label for="formFile" class="form-label txt-input">Box Quantity :</label> &nbsp; {item.boxQuantity}
                                    </div>

                                    <div class="col-md-6">
                                        <label for="formFile" class="form-label txt-input">Box Price :</label> &nbsp; {item.perBoxPrice}
                                    </div>


                                    <h5 className='pt-4 mb-3 fw-bold '>Room Details</h5>
                                    {
                                        item.room.map((item, index) => {
                                            return (<>
                                              
                                                <div class="col-md-6">
                                                    <label for="formFile" class="form-label txt-input">Room length :</label> &nbsp; {item.roomLength}
                                                </div>

                                                <div class="col-md-6">
                                                    <label for="formFile" class="form-label txt-input">Room Type :</label> &nbsp; {item.roomType}
                                                </div>

                                                <div class="col-md-6">
                                                    <label for="formFile" class="form-label txt-input">Room Width :</label> &nbsp; {item.roomWidth}
                                                </div>

                                                <div class="col-md-6">
                                                    <label for="formFile" class="form-label txt-input">Total Sq.ft. :</label> &nbsp; {item.totalsqft}
                                                </div>
                                                <hr className='mt-3' style={{height:"2px", borderWidth:0, color:"gray", backgroundColor:"lightgray", width:"93%", marginLeft:"30px"}}></hr>
                                            </>)
                                        })
                                    }
                                </div>
                            </div>
                        </>)
                    }
                    )
                }

                <div class="col-md-12 text-center " style={{ marginTop: "30px" }}>
                    {/* <Link type="submit" class="btn btn-primary shadow border-0 p-2 fw-bold" style={{ backgroundColor: "#e67929", width: 100, }} >Edit </Link> */}
                    <Link to={"/admin/Order"} type="submit" class="btn btn-primary fw-bold shadow border-0 p-2 mx-3" style={{ backgroundColor: "#e67929", width: 100, }} >Back </Link>
                </div>
                {/* to={`/admin/Products/${productData[0]?._id}`} */}

            </form >
        </>
    )
}

export default OrderViewPage;
