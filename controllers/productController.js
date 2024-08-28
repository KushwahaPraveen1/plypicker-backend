const axios = require('axios');
const { uploadImage } = require('../services/firebaseService');

const updateProduct = async (req, res) => {
  const { productId, productData } = req.body;

  try {
    const response = await axios.put(`https://64e0caef50713530432cafa1.mockapi.io/api/products/${productId}`, productData);
    res.send('Product updated successfully');
  } catch (error) {
    res.status(500).send('Error updating product');
  }
};

module.exports = { updateProduct };
