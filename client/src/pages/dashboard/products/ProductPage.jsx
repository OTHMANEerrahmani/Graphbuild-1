import { useEffect, useState } from "react";
import {
  DropDown,
  PopUpConfirme,
} from "../../../components";
import { useCookies } from "react-cookie";
// import SearchBar from "../../../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaCopy, FaEye } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Popup } from "./components";
import { formatDate } from "../../../utils/dateFormatter";
import {
  fetchProductFailure,
  fetchProductSuccess,
} from "../../../../state/actions/productsActions";
import { SearchBar } from "../../../components/Layout";

function ProductPage() {
  const [cookies] = useCookies(["access-token"]);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER}/products?userId=${auth.user._id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      dispatch(fetchProductSuccess(data));
    } catch (error) {
      dispatch(fetchProductFailure(error.message));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER}/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center w-full font-medium text-2xl dark:text-white">
        Loading...
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex flex-col justify-center items-center w-full font-medium text-2xl dark:text-white">
  //       Error <span className="text-red-600">{error}</span>
  //     </div>
  //   );
  // }

  const [productToUpdate, setProductToUpdate] = useState(null);

  const handleUpdateClick = (product) => {
    setProductToUpdate(product);
    setUpdate(true);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productId, setProductId] = useState("");

    const copyText = (text) => {
      navigator.clipboard.writeText(text);
    };
  return (
    <>
      <>
        <div className="text-[10px] md:text-xs text-left text-gray-500 dark:text-gray-400 table-auto w-full d:px-4 space-y-4 px-2 relative ">
          {(add || update) && (
            <Popup
              add={add}
              update={update}
              setAdd={setAdd}
              setUpdate={setUpdate}
              productToUpdate={productToUpdate}
            />
          )}

          <div className="w-full flex flex-row justify-between md:pt-4 pt-2 ">
            {showConfirmation && (
              <PopUpConfirme
                action={() => deleteProduct(productId)}
                setShowConfirmation={setShowConfirmation}
                isAbsolute={true}
              />
            )}
            <div className=" space-x-4 w-full flex flex-row justify-end items-center">
              <SearchBar className="border w-2/3 md:w-1/3 " />
              <div className="md:w-44 w-1/3">
                <DropDown
                  default="Filter By "
                  options={[
                    {
                      name: "Name",
                      action: () => {
                        sortByName();
                      },
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <button
              className="font-medium dark:text-white text-gray-900  hover:underline rounded-full px-4 py-2 bg-white dark:bg-darkBackground border dark:border-white border-black"
              onClick={() => {
                setAdd(true);
              }}
            >
              Add Product
            </button>
          </div>
          <div className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <div className="flex">
              <div className="w-1/5 py-3 px-6"></div>
              <div className="w-1/5 py-3 px-6">Name</div>
              <div className="w-1/5 py-3 px-6">Created Time</div>
              <div className="w-1/5 py-3 px-6">Updated Time</div>
              <div className="w-1/5 py-3 px-6 text-center">Action</div>
            </div>
          </div>
          <div className="h-[calc(60vh)] overflow-auto no-scrollbar dark:text-slate-200 text-gray-900 relative ">
            {products &&
              Array.isArray(products) &&
              products.map((product, index) => (
                <div
                  key={index}
                  className="flex border-b bg-white dark:bg-gray-800 dark:border-gray-700 items-center"
                >
                  <div className={`w-1/5 py-4 px-6 `}>
                    <img
                      src={
                        product.picturePath
                          ? `${import.meta.env.VITE_APP_SERVER}/assets/${
                              product.picturePath
                            }`
                          : `/default-image.jpg`
                      }
                      alt=""
                      className="h-14"
                    />
                  </div>
                  <div className="w-1/5 py-4 px-6">{product.name}</div>
                  <div className="w-1/5 py-4 px-6">
                    {formatDate(product.createdAt)}
                  </div>
                  <div className="w-1/5 py-4 px-6">
                    {formatDate(product.updatedAt)}
                  </div>
                  <div className="w-1/5 flex justify-center items-center space-x-2">
                    <MdOutlineUpdate
                      size={"25px"}
                      color={darkMode ? "white" : "black"}
                      onClick={() => {
                        handleUpdateClick(product);
                      }}
                    />
                    <FaEye
                      size={"25px"}
                      color={darkMode ? "white" : "black"}
                      onClick={() => navigate(product._id)}
                    />
                    <MdDelete
                      size={"25px"}
                      color={darkMode ? "white" : "black"}
                      onClick={() => {
                        setProductId(product._id);
                        setShowConfirmation(true);
                      }}
                    />
                    <FaCopy
                      size={"20px"}
                      onClick={() => {
                        copyText(product._id);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    </>
  );
}

export default ProductPage;
