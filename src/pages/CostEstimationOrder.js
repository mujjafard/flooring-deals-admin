import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const rowsPerPage = 10;

const CostEstimationOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const { id } = useParams();

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

    return (
        <div>
            <h3 className="mb-4 title ">Cost Estimation Order</h3>

            <form class="row g-3 pt-3 shadow p-3 mb-5" style={{ padding: 20, backgroundColor: "#f7f6ed" }} >
                <div className="border order-card bg-white">
                    <h5 className="fw-bold pb-2">Removal & Disposal </h5>
                    <div className="row pt-2">
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label txt-input">Carpet : </label> &nbsp; {orderData[0]?.firstName}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Carpet / Glue Down :</label> &nbsp; {orderData[0]?.lastName}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Carpet - Stairs(Min.Fee) : </label> &nbsp; {orderData[0]?.email}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Hardwood & Engineered(Nail) : </label> &nbsp; {orderData[0]?.city}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Engineered(Double Glue) : $ </label> &nbsp; {orderData[0]?.mNo}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Parquet : </label> &nbsp; {orderData[0]?.postalCode}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Laminate : </label> &nbsp; {orderData[0]?.totalPrice}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Vinyl Plank : </label> &nbsp; {orderData[0]?.totalPrice}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Sheet Vinyl : </label> &nbsp; {orderData[0]?.totalPrice}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Marmoleum :  </label> &nbsp; {orderData[0]?.totalPrice}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Tile  : </label> &nbsp; {orderData[0]?.totalPrice}
                        </div>

                    </div>
                </div>

                <div className="border order-card bg-white">
                    <h5 className="fw-bold pb-2">Floor Preparation </h5>
                    <div className="row pt-2">
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label txt-input">Patch(Standard) :  </label> &nbsp; {orderData[0]?.firstName}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Self Leveling (Supply & Install) : </label> &nbsp; {orderData[0]?.lastName}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Fasten / Screw Down Sub Floor  : </label> &nbsp; {orderData[0]?.email}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Sub Floor (Supply & Install)  : </label> &nbsp; {orderData[0]?.city}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Dmx-1 Step (Install) : </label> &nbsp; {orderData[0]?.mNo}
                        </div>

                    </div>
                </div>

                <div className="border order-card bg-white">
                    <h5 className="fw-bold pb-2">Tile (Install) </h5>
                    <div className="row pt-2">
                        <h6 className="fw-bold pb-2">Includes All Setting Materials </h6>
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label txt-input">Tile 12"X24"-24"X24"-24"X48" : </label> &nbsp; {orderData[0]?.firstName}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Tile 32"X64": </label> &nbsp; {orderData[0]?.lastName}
                        </div>

                        <div class="col-md-6">
                            <label for="formFile" class="form-label txt-input">Tile 4'X6' And Larger : </label> &nbsp; {orderData[0]?.email}
                        </div>







                    </div>
                </div>


                <div class="col-md-12 text-center " style={{ marginTop: "30px" }}>
                    {/* <Link type="submit" class="btn btn-primary shadow border-0 p-2 fw-bold" style={{ backgroundColor: "#e67929", width: 100, }} >Edit </Link> */}
                    <Link to={"/admin/Order"} type="submit" class="btn btn-primary fw-bold shadow border-0 p-2 mx-3" style={{ backgroundColor: "#e67929", width: 100, }} >Back </Link>
                </div>
                {/* to={`/admin/Products/${productData[0]?._id}`} */}

            </form >
        </div>
    )
}

export default CostEstimationOrder
