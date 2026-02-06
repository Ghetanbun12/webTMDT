import Product from "../models/product.js";
const createProducts = async (req, res) => {
  const { name, description, price, category, imageUrl, stock, type } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
      type,
    });
    await product.save();
    res.status(201).json({ message: "Sản phẩm được tạo thành công", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server ssd" });
  }
};
const searchProducts = async (req, res) => {
  let { keyword } = req.query;

  if (!keyword) keyword = "";

  keyword = decodeURIComponent(keyword); // xử lý Unicode

  try {
    const products = await Product.find({
      name: { $regex: keyword, $options: "i" }, // search theo keyword
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
const searchProductsByType = async (req, res) => {
  let { type } = req.query;

  if (!type) type = "";

  try {
    const products = await Product.find({
      type: { $regex: type, $options: "i" }, 
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
const getBestSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ bestSeller: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated)
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  res.json({ message: "Cập nhật sản phẩm thành công", product: updated });
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted)
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  res.json({ message: "Xóa sản phẩm thành công" });
};

export {
  searchProductsByType,
  createProducts,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsById,
  searchProducts,
  getBestSellerProducts
};
