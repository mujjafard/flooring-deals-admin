import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const CostEstiOrderView = () => {
    const [orderData, setOrderData] = useState([]);
    // const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://174.138.112.6/api/InstallationOrder/${id}`)
            .then((res) => {
                const response = res.data
                console.log(14, response)
                setOrderData(response)
                // console.log(317, response)
            })
            .catch((err) => { console.log(err) })
    }, [id]);

    return (
        <div>
            <h3 className="mb-4 title ">Cost Estimation Order </h3>

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
                    <label for="formFile" class="form-label txt-input">Total Square Feet :</label> &nbsp; {orderData[0]?.totalSquareFeet}
                </div>

                <div class="col-md-6">
                    <label for="formFile" class="form-label txt-input">Total Price :</label> &nbsp; {orderData[0]?.totalPrice}
                </div>
                <h4 className='fw-bold mt-5'>Order Item</h4>
                <div className="border order-card bg-white">
                    <h5 className='pt-3 fw-bold'>{orderData[0]?.orderItems[0]?.Removal_Disposal?.parentName} </h5>
                    <div className="row pt-2">
                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">name :</label> &nbsp; {orderData[0]?.orderItems[0]?.Removal_Disposal?.name}
                        </div>
                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">price :</label> &nbsp; {orderData[0]?.orderItems[0]?.Removal_Disposal?.price} /sq/feet
                        </div>
                    </div>
                </div>
                <div className="border order-card bg-white">
                    <h5 className='pt-3 fw-bold'>{orderData[0]?.orderItems[1]?.floorPreparation?.parentName}</h5>
                    <div className="row pt-2">
                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">name :</label> &nbsp; {orderData[0]?.orderItems[1]?.floorPreparation?.name}
                        </div>
                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">price :</label> &nbsp; {orderData[0]?.orderItems[1]?.floorPreparation?.price} /sq/feet
                        </div>
                    </div>
                </div>
                <div className="border order-card bg-white">
                    <h5 className='pt-3 fw-bold'>{orderData[0]?.orderItems[2]?.installation?.parentName}</h5>
                    <div className="row pt-2">
                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">name :</label> &nbsp; {orderData[0]?.orderItems[2]?.installation?.name}
                        </div>
                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">price :</label> &nbsp; {orderData[0]?.orderItems[2]?.installation?.price} /sq/feet
                        </div>
                    </div>
                </div>


                <div class="col-md-12 text-center " style={{ marginTop: "30px" }}>
                    {/* <Link type="submit" class="btn btn-primary shadow border-0 p-2 fw-bold" style={{ backgroundColor: "#e67929", width: 100, }} >Edit </Link> */}
                    <Link to={"/admin/CostEstimationList"} type="submit" class="btn btn-primary fw-bold shadow border-0 p-2 mx-3" style={{ backgroundColor: "#e67929", width: 100, }} >Back </Link>
                </div>
                {/* to={`/admin/Products/${productData[0]?._id}`} */}

            </form >
        </div>
    )
}

export default CostEstiOrderView

