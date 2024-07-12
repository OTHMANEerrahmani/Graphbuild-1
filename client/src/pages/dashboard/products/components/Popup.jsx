import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "./ImageUpload";

import SelectedMenu from "./SelectedMenu";
import { IoMdAdd } from "react-icons/io";
import {
  fetchProductFailure,
  fetchProductSuccess,
} from "../../../../../state/actions/productsActions";

const Popup = ({ add, update, setAdd, setUpdate, productToUpdate }) => {
  const [productName, setProductName] = useState("");
  const [prdPrix, setPrdPrix] = useState("");
  const [prixVente, setPrixVente] = useState("");
  const [callCenter, setCallCenter] = useState("");
  const [country, setCountry] = useState("");

  const darkMode = useSelector((state) => state.theme.darkMode);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState(null);
  const [image, setImage] = useState(null);
  const [firstUse, setFirstUse] = useState(true);

  const handleImageChange = (e) => {
    const fileInput = e.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setCurrentImage(e.target.result);
        setImage(fileInput.files[0]);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
    setFirstUse(false);
  };

  const [list, setList] = useState([]);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", auth.user._id);

    if (currentImage) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    formData.append("name", productName);

    formData.append("prdPrix", prdPrix);
    formData.append("prixVente", prixVente);
    formData.append("callCenter", callCenter);
    formData.append("country", country);
    formData.append("senarioData", JSON.stringify(list));

    try {
      let response;
      if (update && productToUpdate) {
        response = await fetch(
          `${import.meta.env.VITE_APP_SERVER}/products/${productToUpdate._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        response = await fetch(`${import.meta.env.VITE_APP_SERVER}/products`, {
          method: "POST",
          body: formData,
        });
      }
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to add product: ${errorMessage}`);
      }

      const products = await response.json();
      dispatch(fetchProductSuccess(products));
    } catch (error) {
      console.error(error);
      dispatch(fetchProductFailure(error.message));
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAdaccount, setSelectedAdaccount] = useState([]);

  const handleAddToList = () => {
    const adsets = selectedItems.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    const adAccount = {
      id: selectedAdaccount.id,
      name: selectedAdaccount.name,
      adsets: adsets,
    };
    setList([...list, adAccount]);
    setSelectedItems([]);
  };

  const handleremoveList = (indexToRemove) => {
    setList((prevList) => {
      const updatedList = prevList.filter(
        (_, index) => index !== indexToRemove
      );
      return updatedList;
    });
  };

  useEffect(() => {
    if (update && productToUpdate) {
      setProductName(productToUpdate.name);
      setPrdPrix(productToUpdate.prdPrix);
      setPrixVente(productToUpdate.prixVente);
      setCallCenter(productToUpdate.callCenter);
      setCountry(productToUpdate.country);
      setList(productToUpdate.senarioData);
    }
  }, [update, productToUpdate]);

  return (
    <div>
      <div className="w-full h-full top-0 left-0 z-10 backdrop-blur-sm absolute"></div>
      <div className="w-5/6 h-3/4 z-20 dark:bg-darkPrimary bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <div className="absolute  top-4 right-4 ">
          <RxCross1
            size={"25px"}
            color={darkMode ? "white" : "black"}
            onClick={() => {
              setAdd(false);
              setUpdate(false);
            }}
          />
        </div>
        <div className="h-5/6 py-8 overflow-auto mt-12  no-scrollbar  ">
          <div className="mx-4 space-y-2 flex flex-col  justify-center">
            <div className="flex lg:flex-row  justify-around items-center flex-col lg:space-x-2 space-y-2 lg:space-y-0">
              <ImageUpload
                firstUse={firstUse}
                update={update}
                picturePath={productToUpdate?.picturePath}
                previewImage={currentImage}
                handleImageChange={handleImageChange}
              />
              <div className="flex w-full lg:w-1/2 justify-center flex-col  space-y-2  ">
                <input
                  type="text"
                  id="first_name"
                  className="input w-full"
                  placeholder="name of product"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  required
                ></input>

                <input
                  type="text"
                  id="first_name"
                  className="input w-full"
                  placeholder="prd price."
                  onChange={(e) => setPrdPrix(e.target.value)}
                  value={prdPrix}
                  required
                ></input>

                <input
                  type="text"
                  className="input w-full"
                  placeholder="prix de vente"
                  onChange={(e) => setPrixVente(e.target.value)}
                  value={prixVente}
                  required
                ></input>

                <input
                  type="text"
                  className="input w-full"
                  placeholder="call center"
                  onChange={(e) => setCallCenter(e.target.value)}
                  value={callCenter}
                  required
                ></input>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="country"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  required
                ></input>
              </div>
            </div>
            {list.length > 0 && (
              <div className="flex flex-row  text-black dark:text-white dark:bg-darkBackground bg-white  rounded-md shadow-md px-4 overflow-auto max-h-44">
                <div className="w-full">
                  {list.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center my-1 w-full"
                    >
                      <div className="py-2">
                        <h3>Ad Account {item.name}</h3>
                        <ul className="px-2">
                          {item.adsets.map((adset, adsetIndex) => (
                            <li key={adsetIndex}>{adset.name}</li>
                          ))}
                        </ul>
                      </div>
                      <RxCross1
                        size={"20px"}
                        color={darkMode ? "white" : "black"}
                        onClick={() => {
                          handleremoveList(index);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedAdaccount && selectedItems.length > 0 && (
              <div className="flex flex-row justify-end items-center ">
                <IoMdAdd
                  size={"25px"}
                  color={darkMode ? "white" : "black"}
                  onClick={() => {
                    handleAddToList();
                  }}
                />
              </div>
            )}
            <SelectedMenu
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              setSelectedAdaccount={setSelectedAdaccount}
              className={""}
            />
          </div>

          <div className="flex flex-row space-x-2 justify-center absolute left-1/2 transform -translate-x-1/2 bottom-4">
            <button
              className="font-medium dark:text-white text-gray-900  hover:underline rounded-full px-4 py-2 bg-white dark:bg-darkBackground border dark:border-white border-black"
              onClick={
                add
                  ? () => {
                      handlePost();
                      setAdd(false);
                    }
                  : () => {
                      handlePost();
                      setUpdate(false);
                    }
              }
            >
              {add ? "Add Product" : "Update Product"}
            </button>
            <button
              className="font-medium dark:text-white text-gray-900  hover:underline rounded-full px-4 py-2 bg-white dark:bg-darkBackground border dark:border-white border-black"
              onClick={() => {
                setAdd(false);
                setUpdate(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
