import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";


const Brand = () => {
  const navigate = useNavigate();
  const [brandLogo, setBrandLogo] = useState();
  const [brandLogo1, setBrandLogo1] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  console.log(id)
  const [data, setData] = useState({
    brand_name: ""
  })
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    axios.get(`http://174.138.112.6/api/brand/get/${id}`)
      .then((res) => {
        const response = res.data;
        data.brand_name = response.brand_name
        console.log(41, response)
        setBrandData(response)
        console.log(43, response)
      })
      .catch((err) => { console.log(err) })
  }, [id]);

  const handleUpload = (id) => {
    const formData = new FormData();
    formData.append("brandLogo", selectedImage);
    axios
      .put(
        `http://174.138.112.6/api/brand/files/${id}`,
        formData
      )
      .then((res) => console.log("otherSecond", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const SaveData = (e) => {
    e.preventDefault()
    axios.post("http://174.138.112.6/api/brand/create", data)
      .then((res) => {
        const response = res.data.address
        const id = response._id;
        handleUpload(id)
        alert("Form Submited")
      })
      .catch((err) => { console.log(err) })
  }

  const updateFormData = (e) => {
    e.preventDefault();
    console.log("ok")
    axios.put(`http://174.138.112.6/api/brand/${id}`, data)
      .then((res) => {
        const response = res.data
        console.log(72, response);
        handleUpload(id)
      }).then(() => navigate(`/admin/BrandList`))
      .catch((err) => { console.log(err) })
  }

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>

      <form class="row g-3 pt-3 shadow p-3 mb-5" style={{ padding: 20, backgroundColor: "#f7f6ed" }} >
        <div class="col-md-7">
          <label for="inputEmail4" class="form-label txt-input">Brand <span className="text-danger"></span></label>
          <input type="text" class="form-control" id="inputEmail4" placeholder="Enter brand name.." value={data.brand_name} onChange={(e) => { setData({ ...data, brand_name: e.target.value }); console.log(e.target.value) }} />
        </div>

        <div class="col-md-6">
          <label for="formFile" class="form-label txt-input">Upload File <span className="text-danger"></span></label>
          <input class="form-control" type="file" id="formFile" accept="image/*" onChange={(e) => { setSelectedImage(e.target.files[0]); handleImageChange(e); }} />
          {selectedImage && (
            <div>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ height: "30px" }}
                className="m-1"
              />
            </div>
          )}
        </div>

        <div class="col-md-12 " style={{ marginTop: 20 }}>
          {
            id ? (<>
              <Link to={""} type="" class="btn btn-primary fw-bold shadow border-0 " style={{ backgroundColor: "#e67929", width: 100, height: 40 }} onClick={(e) => { updateFormData(e); }}>Update </Link>
            </>) : (<>
              <Link type="" class="btn btn-primary fw-bold shadow border-0 " style={{ backgroundColor: "#e67929", width: 100, height: 40 }} onClick={(e) => { SaveData(e); handleUpload(e); }}>Submit</Link>
            </>)
          }
        </div>
      </form>

    </div>
  );
};

export default Brand;
