// Import CSS stylesheet
import './style.css';
import dropDownFunc from './dropDownFunc';
import imageCarouselModule from './imageCarouselModule';

// Create a context for the images folder (does not search subdirectories)
const imagesContext = require.context('./images', false, /\.(png|jpe?g|gif|svg)$/);

// Add image sources to images array
const imagesArray = [];
imagesContext.keys().forEach((key) => {
  imagesArray.push(imagesContext(key));
});

// Initialize dropdown functionality
dropDownFunc();

// Initialize carousel functionality
const carouselContainer = document.querySelector('.image-carousel-container');
const carousel = new imageCarouselModule.ImageCarousel(imagesArray, carouselContainer);

window.carousel = carousel;
