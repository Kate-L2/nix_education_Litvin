const { Decimal128 } = require("bson");
const { url } = require("inspector");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: { type: Number, require: true },
  category: { type: String, require: true },
  imgUrl: { type: String, require: true },
  name: { type: String, require: true },
  display: { type: Decimal128, require: true },
  color: { type: Array, require: true },
  price: { type: Number, require: true },
//   id: 1,
//         category: 'mac',
//         imgUrl: 'items/macbook-air.png',
//         name: 'MacBook Air',
//         display: 13.3, // дюймы
//         color: ['Gold', 'Silver', 'Space Grey'],
//         price: 999, // доллары
//         chip: {
//             name: 'M1',
//             cores: 8,
//         },
//         ram: 8, // Гб
//         storage: 256, // Гб
//         touchId: true,
//         faceId: false,
//         wireless: ['Wi-Fi', 'Bluetooth 5.0'],
//         camera: {
//             front: '720p FaceTime HD camera',
//             back: null,
//         },
//         audio: {
//             microphone: 'Three-mic array with directional beamforming',
//             speakers: 'Stereo speakers',
//         },
//         size: {
//             height: '1.61', // cm
//             width: '30.41', // cm
//             depth: '21.24', // cm
//             weight: '1.29', // Кг
//         },
//         os: 'macOS',
//         InTheBox: ['MacBook Air', '30W USB-C Power Adapter', 'USB-C Charge Cable (2 m)'],
//         orderInfo: {
//         	inStock: 435, // кол-во едениц товара в наличии
//         	reviews: 77, // процент положительных отзывов
});

module.exports = mongoose.model("Product", ProductSchema);
