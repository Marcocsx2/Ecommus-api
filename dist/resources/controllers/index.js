"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = exports.estimateDelivery = exports.getOrderDetailByOrder = exports.getOrderByUser = exports.getAllOrder = exports.createOrder = exports.deleteWarehouse = exports.updateWarehouse = exports.getWarehouseById = exports.getWarehouseByUser = exports.createWarehouse = exports.updateShoppingCart = exports.changeShoppingCart = exports.deleteProductToCart = exports.findShoppingCart = exports.addProductToCart = exports.getSubcategoryByCategory = exports.getSubcategory = exports.getCategory = exports.createSubcategory = exports.createCategory = exports.giveLikeProduct = exports.getReportedProducts = exports.createReportProduct = exports.createReview = exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getProductByUser = exports.findProduct = exports.getProductById = exports.getProduct = exports.getReportedPost = exports.createReportPost = exports.giveLike = exports.createComment = exports.getPostByFollowed = exports.getPostByUser = exports.getPost = exports.deletePost = exports.updatePost = exports.createPost = exports.suggestionsFriendShip = exports.getFollower = exports.getFollowed = exports.addFollowed = exports.deleteAddress = exports.updateAddress = exports.createAddress = exports.getAddressById = exports.getAddressByUser = exports.getUserLogged = exports.updateUser = exports.getUsers = exports.getUserById = exports.changePassword = exports.recoverPassword = exports.refreshTokenController = exports.validateEmail = exports.googleSignin = exports.signin = exports.signup = void 0;
const signup_controller_1 = require("./auth/signup.controller");
Object.defineProperty(exports, "signup", { enumerable: true, get: function () { return signup_controller_1.signup; } });
const signin_controller_1 = require("./auth/signin.controller");
Object.defineProperty(exports, "signin", { enumerable: true, get: function () { return signin_controller_1.signin; } });
const googleSignin_controller_1 = require("./auth/googleSignin.controller");
Object.defineProperty(exports, "googleSignin", { enumerable: true, get: function () { return googleSignin_controller_1.googleSignin; } });
const validateEmail_controller_1 = require("./auth/validateEmail.controller");
Object.defineProperty(exports, "validateEmail", { enumerable: true, get: function () { return validateEmail_controller_1.validateEmail; } });
const refreshToken_controller_1 = require("./auth/refreshToken.controller");
Object.defineProperty(exports, "refreshTokenController", { enumerable: true, get: function () { return refreshToken_controller_1.refreshTokenController; } });
const recoverPassword_controller_1 = require("./auth/recoverPassword.controller");
Object.defineProperty(exports, "recoverPassword", { enumerable: true, get: function () { return recoverPassword_controller_1.recoverPassword; } });
const changePassword_controller_1 = require("./auth/changePassword.controller");
Object.defineProperty(exports, "changePassword", { enumerable: true, get: function () { return changePassword_controller_1.changePassword; } });
const getUserById_controller_1 = require("./user/getUserById.controller");
const updateUser_controller_1 = require("./user/updateUser.controller");
const getUsers_controller_1 = require("./user/getUsers.controller");
const getUserLogged_controller_1 = require("./user/getUserLogged.controller");
const userSchema_1 = require("../../middleware/schema/userSchema");
exports.getUserById = {
    controller: getUserById_controller_1.getUserByIdController,
    schema: userSchema_1.getUserByIdSchema,
    check: ["body"],
};
exports.getUsers = {
    controller: getUsers_controller_1.getUsersController,
    schema: userSchema_1.getUsersSchema,
    check: ["body"],
};
exports.updateUser = {
    controller: updateUser_controller_1.updateUserController,
    schema: userSchema_1.updateUserSchema,
    check: ["body"],
};
exports.getUserLogged = {
    controller: getUserLogged_controller_1.GetUserLoggedController,
    check: ["body"],
};
const getAddressByUser_controller_1 = require("./address/getAddressByUser.controller");
const createAddress_controller_1 = require("./address/createAddress.controller");
const updateAddress_controller_1 = require("./address/updateAddress.controller");
const deleteAddress_controller_1 = require("./address/deleteAddress.controller");
const getAddressById_controller_1 = require("./address/getAddressById.controller");
const addressSchema_1 = require("../../middleware/schema/addressSchema");
exports.getAddressByUser = {
    controller: getAddressByUser_controller_1.getAddressByUserController,
    check: ["body"],
};
exports.getAddressById = {
    controller: getAddressById_controller_1.getAddressByIdController,
    schema: addressSchema_1.getAddressByIdSchema,
    check: ["body"],
};
exports.createAddress = {
    controller: createAddress_controller_1.createAddressController,
    schema: addressSchema_1.createAddressSchema,
    check: ["body"],
};
exports.updateAddress = {
    controller: updateAddress_controller_1.updateAddressController,
    schema: addressSchema_1.updateAddressSchema,
    check: ["body"],
};
exports.deleteAddress = {
    controller: deleteAddress_controller_1.deleteAddressController,
    schema: addressSchema_1.deleteAddressSchema,
    check: ["body"],
};
const addFollowed_controller_1 = require("./follower/addFollowed.controller");
const getFollowed_controller_1 = require("./follower/getFollowed.controller");
const getFollower_controller_1 = require("./follower/getFollower.controller");
const suggestionsFriendShip_controller_1 = require("./follower/suggestionsFriendShip.controller");
const followerSchema_1 = require("../../middleware/schema/followerSchema");
exports.addFollowed = {
    controller: addFollowed_controller_1.addFollowedController,
    schema: followerSchema_1.addFollowedSchema,
    check: ["body"],
};
exports.getFollowed = {
    controller: getFollowed_controller_1.getFollowedController,
    schema: followerSchema_1.getFollowedSchema,
    check: ["body"],
};
exports.getFollower = {
    controller: getFollower_controller_1.getFollowerController,
    schema: followerSchema_1.getFollowerSchema,
    check: ["body"],
};
exports.suggestionsFriendShip = {
    controller: suggestionsFriendShip_controller_1.suggestionsFriendShipController,
};
const createPost_controller_1 = require("./posts/createPost.controller");
const updatePost_controller_1 = require("./posts/updatePost.controller");
const deletePost_controller_1 = require("./posts/deletePost.controller");
const getPost_controller_1 = require("./posts/getPost.controller");
const getPostByUserController_1 = require("./posts/getPostByUserController");
const getPostByFollowed_controller_1 = require("./posts/getPostByFollowed.controller");
const createComment_controller_1 = require("./posts/createComment.controller");
const giveLike_controller_1 = require("./posts/giveLike.controller");
const createReport_controller_1 = require("./posts/createReport.controller");
const getReport_controller_1 = require("./posts/getReport.controller");
const postSchema_1 = require("../../middleware/schema/postSchema");
exports.createPost = {
    controller: createPost_controller_1.createPostController,
    schema: postSchema_1.createPostSchema,
    check: ["body"],
};
exports.updatePost = {
    controller: updatePost_controller_1.updatePostController,
    schema: postSchema_1.updatePostSchema,
    check: ["body"],
};
exports.deletePost = {
    controller: deletePost_controller_1.deletePostController,
    schema: postSchema_1.deletePostSchema,
    check: ["body"],
};
exports.getPost = {
    controller: getPost_controller_1.getPostController,
    schema: postSchema_1.getPostSchema,
    check: ["body"],
};
exports.getPostByUser = {
    controller: getPostByUserController_1.getPostByUserController,
    schema: postSchema_1.getPostByUserSchema,
    check: ["body"],
};
exports.getPostByFollowed = {
    controller: getPostByFollowed_controller_1.getPostByFollowedController,
};
exports.createComment = {
    controller: createComment_controller_1.createCommentController,
    schema: postSchema_1.createCommentSchema,
    check: ["body"],
};
exports.giveLike = {
    controller: giveLike_controller_1.giveLikeController,
    schema: postSchema_1.giveLikeSchema,
    check: ["body"],
};
exports.createReportPost = {
    controller: createReport_controller_1.createReportController,
    schema: postSchema_1.createReportPostSchema,
    check: ["body"],
};
exports.getReportedPost = {
    controller: getReport_controller_1.getReportedPostsController,
    schema: postSchema_1.getReportedPostSchema,
    check: ["body"],
};
const getProduct_controller_1 = require("./product/getProduct.controller");
const getProductById_controller_1 = require("./product/getProductById.controller");
const getProductByUser_controller_1 = require("./product/getProductByUser.controller");
const getProductBySearch_controller_1 = require("./product/getProductBySearch.controller");
const createProduct_controller_1 = require("./product/createProduct.controller");
const deleteProduct_controller_1 = require("./product/deleteProduct.controller");
const updateProduct_controller_1 = require("./product/updateProduct.controller");
const createReview_controller_1 = require("./product/createReview.controller");
const createReportProduct_controller_1 = require("./product/createReportProduct.controller");
const getReportProduct_controller_1 = require("./product/getReportProduct.controller");
const giveLikeProduct_controller_1 = require("./product/giveLikeProduct.controller");
const productSchema_1 = require("../../middleware/schema/productSchema");
exports.getProduct = {
    controller: getProduct_controller_1.getProductController,
    schema: productSchema_1.getProductSchema,
    check: ["body"],
};
exports.getProductById = {
    controller: getProductById_controller_1.getProductByIdController,
    schema: productSchema_1.getProductByIdSchema,
    check: ["body"],
};
exports.findProduct = {
    controller: getProductBySearch_controller_1.getProductBySearchController,
    schema: productSchema_1.getProductBySearchSchema,
    check: ["body"],
};
exports.getProductByUser = {
    controller: getProductByUser_controller_1.getProductByUserController,
    schema: productSchema_1.getProductByUserSchema,
    check: ["body"],
};
exports.createProduct = {
    controller: createProduct_controller_1.createProductController,
    schema: productSchema_1.createProductSchema,
    check: ["body"],
};
exports.deleteProduct = {
    controller: deleteProduct_controller_1.deleteProductController,
    schema: productSchema_1.deleteProductSchema,
    check: ["body"],
};
exports.updateProduct = {
    controller: updateProduct_controller_1.updateProductController,
    schema: productSchema_1.updateProductSchema,
    check: ["body"],
};
exports.createReview = {
    controller: createReview_controller_1.createReviewController,
    schema: productSchema_1.createReviewSchema,
    check: ["body"],
};
exports.createReportProduct = {
    controller: createReportProduct_controller_1.createReportProductController,
    schema: productSchema_1.createReportProductSchema,
    check: ["body"],
};
exports.getReportedProducts = {
    controller: getReportProduct_controller_1.getReportedProductsController,
    schema: productSchema_1.getReportedProductSchema,
    check: ["body"],
};
exports.giveLikeProduct = {
    controller: giveLikeProduct_controller_1.giveLikeProductController,
    schema: productSchema_1.giveLikeProductSchema,
    check: ["body"],
};
const createCategory_controller_1 = require("./category/createCategory.controller");
const createSubcategory_controller_1 = require("./category/createSubcategory.controller");
const getCategory_controller_1 = require("./category/getCategory.controller");
const getSubcategory_controller_1 = require("./category/getSubcategory.controller");
const getSubcategoryByCategory_controller_1 = require("./category/getSubcategoryByCategory.controller");
const categorySchema_1 = require("../../middleware/schema/categorySchema");
exports.createCategory = {
    controller: createCategory_controller_1.createCategoryController,
    schema: categorySchema_1.createCategorySchema,
    check: ["body"],
};
exports.createSubcategory = {
    controller: createSubcategory_controller_1.createSubcategoryController,
    schema: categorySchema_1.createSubcategorySchema,
    check: ["body"],
};
exports.getCategory = {
    controller: getCategory_controller_1.getCategoryController,
    check: ["body"],
};
exports.getSubcategory = {
    controller: getSubcategory_controller_1.getSubcategoryController,
    check: ["body"],
};
exports.getSubcategoryByCategory = {
    controller: getSubcategoryByCategory_controller_1.getSubcategoryByCategoryController,
    schema: categorySchema_1.getSubcategoryByCategorySchema,
};
const addProductToCart_controller_1 = require("./shoppingCart/addProductToCart.controller");
const findShoppingCart_controller_1 = require("./shoppingCart/findShoppingCart.controller");
const deleteProductToCart_controller_1 = require("./shoppingCart/deleteProductToCart.controller");
const changeShoppingCartState_controller_1 = require("./shoppingCart/changeShoppingCartState.controller");
const updateShoppingCart_controller_1 = require("./shoppingCart/updateShoppingCart.controller");
const shoppingCartSchema_1 = require("../../middleware/schema/shoppingCartSchema");
exports.addProductToCart = {
    controller: addProductToCart_controller_1.addProductToCartController,
    schema: shoppingCartSchema_1.addProductToCartSchema,
    check: ["body"],
};
exports.findShoppingCart = {
    controller: findShoppingCart_controller_1.findShoppingCartController,
    check: ["body"],
};
exports.deleteProductToCart = {
    controller: deleteProductToCart_controller_1.deleteProductToCartController,
    schema: shoppingCartSchema_1.deleteProductToCartSchema,
    check: ["body"],
};
exports.changeShoppingCart = {
    controller: changeShoppingCartState_controller_1.changeShoppingCartStateController,
    schema: shoppingCartSchema_1.changeShoppingCartStateSchema,
    check: ["body"],
};
exports.updateShoppingCart = {
    controller: updateShoppingCart_controller_1.updateShoppingCartController,
    schema: shoppingCartSchema_1.updateShoppingCartSchema,
    check: ["body"],
};
const createWarehouse_controller_1 = require("./warehouse/createWarehouse.controller");
const getWarehouseByUser_controller_1 = require("./warehouse/getWarehouseByUser.controller");
const getWarehouseById_controller_1 = require("./warehouse/getWarehouseById.controller");
const updateWarehouse_controller_1 = require("./warehouse/updateWarehouse.controller");
const deleteWarehouse_controller_1 = require("./warehouse/deleteWarehouse.controller");
const warehouseSchema_1 = require("../../middleware/schema/warehouseSchema");
exports.createWarehouse = {
    controller: createWarehouse_controller_1.createWarehouseController,
    schema: warehouseSchema_1.createWarehouseSchema,
    check: ["body"],
};
exports.getWarehouseByUser = {
    controller: getWarehouseByUser_controller_1.getWarehouseByUserController,
};
exports.getWarehouseById = {
    controller: getWarehouseById_controller_1.getWarehouseByIdController,
    schema: warehouseSchema_1.getWarehouseByIdSchema,
    check: ["body"],
};
exports.updateWarehouse = {
    controller: updateWarehouse_controller_1.updateWarehouseController,
    schema: warehouseSchema_1.updateWarehouseSchema,
    check: ["body"],
};
exports.deleteWarehouse = {
    controller: deleteWarehouse_controller_1.deleteWarehouseController,
    schema: warehouseSchema_1.deleteWarehouseSchema,
    check: ["body"],
};
const createOrder_controller_1 = require("./orders/createOrder.controller");
const getAllOrder_controller_1 = require("./orders/getAllOrder.controller");
const getOrderByUser_controller_1 = require("./orders/getOrderByUser.controller");
const getOrderDetailByOrder_controller_1 = require("./orders/getOrderDetailByOrder.controller");
const orderSchema_1 = require("../../middleware/schema/orderSchema");
exports.createOrder = {
    controller: createOrder_controller_1.createOrderController,
    schema: orderSchema_1.createOrderSchema,
    check: ["body"],
};
exports.getAllOrder = {
    controller: getAllOrder_controller_1.getAllOrderController,
    schema: orderSchema_1.getAllOrderSchema,
    check: ["body"],
};
exports.getOrderByUser = {
    controller: getOrderByUser_controller_1.getOrderByUserController,
    check: ["body"],
};
exports.getOrderDetailByOrder = {
    controller: getOrderDetailByOrder_controller_1.getOrderDetailByOrderController,
    schema: orderSchema_1.getOrderDetailByOrderSchema,
    check: ["body"],
};
const estimateDelivery_controller_1 = require("./delivery/estimateDelivery.controller");
const deliverySchema_1 = require("../../middleware/schema/deliverySchema");
exports.estimateDelivery = {
    controller: estimateDelivery_controller_1.estimateDeliveryController,
    schema: deliverySchema_1.estimateDeliverySchema,
    check: ["body"],
};
const createPayment_controller_1 = require("../controllers/payments/createPayment.controller");
const paymentSchema_1 = require("../../middleware/schema/paymentSchema");
exports.createPayment = {
    controller: createPayment_controller_1.createPaymentController,
    schema: paymentSchema_1.createPaymentSchema,
    check: ["body"],
};
//# sourceMappingURL=index.js.map