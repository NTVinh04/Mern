const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function DeleteProductController(req, res) {
    try {
        const sessionUserId = req.userId

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Bạn không có quyền truy cập vào chức năng này")
        }

        const productId = req.body._id;

        const deletedProduct = await productModel.findByIdAndDelete(productId)

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm để xóa",
                error: true,
                success: false
            })
        }

        res.status(200).json({
            message: "Xóa sản phẩm thành công",
            error: false,
            success: true,
            data: deletedProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = DeleteProductController