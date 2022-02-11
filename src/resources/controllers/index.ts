//===========================================================================================

// Auth Controller
import { signup } from "./auth/signup.controller";
import { signin } from "./auth/signin.controller";
import { googleSignin } from "./auth/googleSignin.controller";
import { validateEmail } from "./auth/validateEmail.controller";
import { refreshTokenController } from "./auth/refreshToken.controller";
import { recoverPassword } from "./auth/recoverPassword.controller";
import { changePassword } from "./auth/changePassword.controller";

// Export Auth
export {
  signup,
  signin,
  googleSignin,
  validateEmail,
  refreshTokenController,
  recoverPassword,
  changePassword,
};

//===========================================================================================
// User Controller
import { getUserByIdController } from "./user/getUserById.controller";
import { updateUserController } from "./user/updateUser.controller";
import { getUsersController } from "./user/getUsers.controller";
import { GetUserLoggedController } from "./user/getUserLogged.controller";
// User Middleware
import {
  getUserByIdSchema,
  getUsersSchema,
  updateUserSchema,
} from "../../middleware/schema/userSchema";

// Export User
export const getUserById = {
  controller: getUserByIdController,
  schema: getUserByIdSchema,
  check: ["body"],
};

export const getUsers = {
  controller: getUsersController,
  schema: getUsersSchema,
  check: ["body"],
};

export const updateUser = {
  controller: updateUserController,
  schema: updateUserSchema,
  check: ["body"],
};

export const getUserLogged = {
  controller: GetUserLoggedController,
  check: ["body"],
};

//===========================================================================================

// Address Controller
import { getAddressByUserController } from "./address/getAddressByUser.controller";
import { createAddressController } from "./address/createAddress.controller";
import { updateAddressController } from "./address/updateAddress.controller";
import { deleteAddressController } from "./address/deleteAddress.controller";
import { getAddressByIdController } from "./address/getAddressById.controller";

// Middleware of Address
import {
  createAddressSchema,
  deleteAddressSchema,
  getAddressByIdSchema,
  updateAddressSchema,
} from "../../middleware/schema/addressSchema";

// Export Address
export const getAddressByUser = {
  controller: getAddressByUserController,
  check: ["body"],
};

export const getAddressById = {
  controller: getAddressByIdController,
  schema: getAddressByIdSchema,
  check: ["body"],
};

export const createAddress = {
  controller: createAddressController,
  schema: createAddressSchema,
  check: ["body"],
};

export const updateAddress = {
  controller: updateAddressController,
  schema: updateAddressSchema,
  check: ["body"],
};

export const deleteAddress = {
  controller: deleteAddressController,
  schema: deleteAddressSchema,
  check: ["body"],
};

//===========================================================================================

// Follower Controller
import { addFollowedController } from "./follower/addFollowed.controller";
import { getFollowedController } from "./follower/getFollowed.controller";
import { getFollowerController } from "./follower/getFollower.controller";
import { suggestionsFriendShipController } from "./follower/suggestionsFriendShip.controller";

// Middleware of Follower
import {
  addFollowedSchema,
  getFollowedSchema,
  getFollowerSchema,
} from "../../middleware/schema/followerSchema";

export const addFollowed = {
  controller: addFollowedController,
  schema: addFollowedSchema,
  check: ["body"],
};

export const getFollowed = {
  controller: getFollowedController,
  schema: getFollowedSchema,
  check: ["body"],
};

export const getFollower = {
  controller: getFollowerController,
  schema: getFollowerSchema,
  check: ["body"],
};

export const suggestionsFriendShip = {
  controller: suggestionsFriendShipController,
  // schema: ,
  // check: ["body"],
}

//===========================================================================================

// Post Controller
import { createPostController } from "./posts/createPost.controller";
import { updatePostController } from "./posts/updatePost.controller";
import { deletePostController } from "./posts/deletePost.controller";
import { getPostController } from "./posts/getPost.controller";
import { getPostByUserController } from "./posts/getPostByUserController";
import { getPostByFollowedController } from "./posts/getPostByFollowed.controller";
import { createCommentController } from "./posts/createComment.controller";
import { giveLikeController } from "./posts/giveLike.controller";
import { createReportController } from "./posts/createReport.controller";
import { getReportedPostsController } from "./posts/getReport.controller";

// Middleware of Post
import {
  createCommentSchema,
  createPostSchema,
  deletePostSchema,
  getPostByUserSchema,
  getPostSchema,
  giveLikeSchema,
  updatePostSchema,
  createReportPostSchema,
  getReportedPostSchema
} from "../../middleware/schema/postSchema";

// Export Post
export const createPost = {
  controller: createPostController,
  schema: createPostSchema,
  check: ["body"],
};

export const updatePost = {
  controller: updatePostController,
  schema: updatePostSchema,
  check: ["body"],
};

export const deletePost = {
  controller: deletePostController,
  schema: deletePostSchema,
  check: ["body"],
};

export const getPost = {
  controller: getPostController,
  schema: getPostSchema,
  check: ["body"],
};

export const getPostByUser = {
  controller: getPostByUserController,
  schema: getPostByUserSchema,
  check: ["body"],
};

export const getPostByFollowed = {
  controller: getPostByFollowedController,
};

export const createComment = {
  controller: createCommentController,
  schema: createCommentSchema,
  check: ["body"],
};

export const giveLike = {
  controller: giveLikeController,
  schema: giveLikeSchema,
  check: ["body"],
};

export const createReportPost = {
  controller: createReportController,
  schema: createReportPostSchema,
  check: ["body"],
};

export const getReportedPost = {
  controller: getReportedPostsController,
  schema: getReportedPostSchema,
  check: ["body"],
};

//===========================================================================================

//Importar controladores de productos
import { getProductController } from "./product/getProduct.controller";
import { getProductByIdController } from "./product/getProductById.controller";
import { getProductByUserController } from "./product/getProductByUser.controller";
import { getProductBySearchController } from "./product/getProductBySearch.controller";
import { createProductController } from "./product/createProduct.controller";
import { deleteProductController } from "./product/deleteProduct.controller";
import { updateProductController } from "./product/updateProduct.controller";
import { createReviewController } from "./product/createReview.controller";
import { createReportProductController } from "./product/createReportProduct.controller";
import { getReportedProductsController } from "./product/getReportProduct.controller";
import {giveLikeProductController} from "./product/giveLikeProduct.controller"

//Importar el esquema de los productos
import {
  createProductSchema,
  getProductSchema,
  getProductByIdSchema,
  getProductByUserSchema,
  deleteProductSchema,
  getProductBySearchSchema,
  updateProductSchema,
  createReviewSchema,
  createReportProductSchema,
  getReportedProductSchema,
  giveLikeProductSchema
} from "../../middleware/schema/productSchema";

//Exportacion de los controladores de Productos

export const getProduct = {
  controller: getProductController,
  schema: getProductSchema,
  check: ["body"],
};

export const getProductById = {
  controller: getProductByIdController,
  schema: getProductByIdSchema,
  check: ["body"],
};

export const findProduct = {
  controller: getProductBySearchController,
  schema: getProductBySearchSchema,
  check: ["body"],
};

export const getProductByUser = {
  controller: getProductByUserController,
  schema: getProductByUserSchema,
  check: ["body"],
};

export const createProduct = {
  controller: createProductController,
  schema: createProductSchema,
  check: ["body"],
};

export const deleteProduct = {
  controller: deleteProductController,
  schema: deleteProductSchema,
  check: ["body"],
};

export const updateProduct = {
  controller: updateProductController,
  schema: updateProductSchema,
  check: ["body"],
};

export const createReview = {
  controller: createReviewController,
  schema: createReviewSchema,
  check: ["body"],
};

export const createReportProduct = {
  controller: createReportProductController,
  schema: createReportProductSchema,
  check: ["body"],
};

export const getReportedProducts = {
  controller: getReportedProductsController,
  schema: getReportedProductSchema,
  check: ["body"],
};

export const giveLikeProduct = {
  controller: giveLikeProductController,
  schema: giveLikeProductSchema,
  check: ["body"],
}

//=============================================================================================

//Importar controladores de categorias Y Subcategorias
import { createCategoryController } from "./category/createCategory.controller";
import { createSubcategoryController } from "./category/createSubcategory.controller";
import { getCategoryController } from "./category/getCategory.controller";
import { getSubcategoryController } from "./category/getSubcategory.controller";
import { getSubcategoryByCategoryController } from "./category/getSubcategoryByCategory.controller";

//Importar el esquema de categorias y SubCategorias
import {
  createCategorySchema,
  createSubcategorySchema,
  getSubcategoryByCategorySchema,
} from "../../middleware/schema/categorySchema";

//Exportacion de los controladores de categorias
export const createCategory = {
  controller: createCategoryController,
  schema: createCategorySchema,
  check: ["body"],
};

export const createSubcategory = {
  controller: createSubcategoryController,
  schema: createSubcategorySchema,
  check: ["body"],
};

export const getCategory = {
  controller: getCategoryController,
  check: ["body"],
};

export const getSubcategory = {
  controller: getSubcategoryController,
  check: ["body"],
};

export const getSubcategoryByCategory = {
  controller: getSubcategoryByCategoryController,
  schema: getSubcategoryByCategorySchema,
};

//=============================================================================================

// Importacion de controlladores de Shopping Cart
import { addProductToCartController } from "./shoppingCart/addProductToCart.controller";
import { findShoppingCartController } from "./shoppingCart/findShoppingCart.controller";
import { deleteProductToCartController } from "./shoppingCart/deleteProductToCart.controller";
import { changeShoppingCartStateController } from "./shoppingCart/changeShoppingCartState.controller";
import { updateShoppingCartController } from "./shoppingCart/updateShoppingCart.controller";

// Importacion de Schemas de Shopping Cart
import {
  addProductToCartSchema,
  changeShoppingCartStateSchema,
  deleteProductToCartSchema,
  updateShoppingCartSchema,
} from "../../middleware/schema/shoppingCartSchema";

//Exportacion de los controladores de carrito de compras
export const addProductToCart = {
  controller: addProductToCartController,
  schema: addProductToCartSchema,
  check: ["body"],
};

export const findShoppingCart = {
  controller: findShoppingCartController,
  check: ["body"],
};

export const deleteProductToCart = {
  controller: deleteProductToCartController,
  schema: deleteProductToCartSchema,
  check: ["body"],
};

export const changeShoppingCart = {
  controller: changeShoppingCartStateController,
  schema: changeShoppingCartStateSchema,
  check: ["body"],
};

export const updateShoppingCart = {
  controller: updateShoppingCartController,
  schema: updateShoppingCartSchema,
  check: ["body"],
};

//=============================================================================================
// Importancion de controladores de Warehouse
import { createWarehouseController } from "./warehouse/createWarehouse.controller";
import { getWarehouseByUserController } from "./warehouse/getWarehouseByUser.controller";
import { getWarehouseByIdController } from "./warehouse/getWarehouseById.controller";
import { updateWarehouseController } from "./warehouse/updateWarehouse.controller";
import { deleteWarehouseController } from "./warehouse/deleteWarehouse.controller";

// Importancion de Schemas de Warehouse
import {
  createWarehouseSchema,
  deleteWarehouseSchema,
  getWarehouseByIdSchema,
  updateWarehouseSchema,
} from "../../middleware/schema/warehouseSchema";

// Exportaciones de Warehouse

export const createWarehouse = {
  controller: createWarehouseController,
  schema: createWarehouseSchema,
  check: ["body"],
};

export const getWarehouseByUser = {
  controller: getWarehouseByUserController,
};

export const getWarehouseById = {
  controller: getWarehouseByIdController,
  schema: getWarehouseByIdSchema,
  check: ["body"],
};

export const updateWarehouse = {
  controller: updateWarehouseController,
  schema: updateWarehouseSchema,
  check: ["body"],
};

export const deleteWarehouse = {
  controller: deleteWarehouseController,
  schema: deleteWarehouseSchema,
  check: ["body"],
};

//=============================================================================================

// Importacion de controlladores de Orders y Detail orders
import { createOrderController } from "./orders/createOrder.controller";
import { createOrderDetailController } from "./orders/createOrderDetail.controller";
import { getAllOrderController } from "./orders/getAllOrder.controller";
import { getOrderByUserController } from "./orders/getOrderByUser.controller";
import { getOrderDetailByOrderController } from "./orders/getOrderDetailByOrder.controller";

// Importacion de Schemas de Orders y Detail Orders
import {
  createOrderSchema,
  getAllOrderSchema,
  getOrderDetailByOrderSchema,
} from "../../middleware/schema/orderSchema";

// Exportaciones de las ordenes y detalle de ordenes

export const createOrder = {
  controller: createOrderController,
  schema: createOrderSchema,
  check: ["body"],
};

// export const createOrderDetail = {
//   controller: createOrderDetailController,
//   schema: createOrderDetailSchema,
//   check: ["body"],
// };

export const getAllOrder = {
  controller: getAllOrderController,
  schema: getAllOrderSchema,
  check: ["body"],
};

export const getOrderByUser = {
  controller: getOrderByUserController,
  check: ["body"],
};

export const getOrderDetailByOrder = {
  controller: getOrderDetailByOrderController,
  schema: getOrderDetailByOrderSchema,
  check: ["body"],
};

//=============================================================================================

// Importacion de controlladores de Delivery
import { estimateDeliveryController } from "./delivery/estimateDelivery.controller";

// Importacion de Schemas de Delivery
import { estimateDeliverySchema } from "../../middleware/schema/deliverySchema";

// Exportaciones de las Delivery

export const estimateDelivery = {
  controller: estimateDeliveryController,
  schema: estimateDeliverySchema,
  check: ["body"],
};

//=============================================================================================

// Importacion de controlladores de Payments
import { createPaymentController } from "../controllers/payments/createPayment.controller";

// Importacion de Schemas de Payments
import { createPaymentSchema } from "../../middleware/schema/paymentSchema";

// Exportaciones de las Payments
export const createPayment = {
  controller: createPaymentController,
  schema: createPaymentSchema,
  check: ["body"],
};
