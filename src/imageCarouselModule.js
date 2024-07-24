const imageCarouselModule = (() => {
  const MAXLENGTH = 5; // Maximum number of images

  let xPos = 0; // For tracking position of carousel
  let timer = null; // Timer for shifting carousel

  class ImageCarousel {
    constructor(imageSources = [], carouselContainer) {
      // Validate array length
      if (imageSources.length > MAXLENGTH) {
        console.warn(
          `imageSources array exceeds limit of ${MAXLENGTH}. Only the first ${MAXLENGTH} images will be used.`
        );
        imageSources = imageSources.slice(0, MAXLENGTH); // Use only the first [MAXLENGTH] images
      }
      this.imageSources = imageSources;
      this.carousel = {
        container: null,
        content: null,
        rightBtn: null,
        leftBtn: null,
        navigationDotsContainer: null,
      };
      this.buildCarouselStructure(carouselContainer);
      this.initializeCarousel();
    }

    buildCarouselStructure(container) {
      // Clear container
      container.textContent = null;

      // Create elements
      const contentWrapper = document.createElement('div');
      const content = document.createElement('div');
      const rightBtn = document.createElement('button');
      const leftBtn = document.createElement('button');
      const navigationDotsContainer = document.createElement('div');

      // Add classes
      contentWrapper.classList.add('image-carousel-content-wrapper');
      content.classList.add('image-carousel-content');
      rightBtn.classList.add('right-btn');
      leftBtn.classList.add('left-btn');
      navigationDotsContainer.classList.add('navigation-dots-container');

      // Set attributes
      rightBtn.setAttribute('type', 'button');
      leftBtn.setAttribute('type', 'button');

      // Set text content for buttons
      rightBtn.innerHTML = '&#11166'; // Unicode character or text
      leftBtn.innerHTML = '&#11164'; // Unicode character or text

      // Append elements to container
      contentWrapper.append(content);
      container.append(contentWrapper, rightBtn, leftBtn, navigationDotsContainer);

      // Store references in this.carousel
      this.carousel = {
        container,
        content,
        rightBtn,
        leftBtn,
        navigationDotsContainer,
      };
    }

    // Initialization
    initializeCarousel() {
      // Set the index/carousel position to 0
      xPos = 0;

      // Start a timer for cycling through carousel automatically
      timer = this.startTimer(); // Set to null for no timer

      this.carousel.content.innerHTML = '';
      this.carousel.navigationDotsContainer.innerHTML = '';

      const imgWidth = this.carousel.container.offsetWidth;
      const imgHeight = this.carousel.container.offsetHeight;

      // Function to create div containers with image tags
      const createImageContainer = () => {
        const container = document.createElement('div');
        const imgElement = document.createElement('img');

        container.classList.add('image-container');

        // Set width and height styles based on carousel container dimensions
        imgElement.style.width = `${imgWidth}px`;
        imgElement.style.height = `${imgHeight}px`;

        container.append(imgElement);

        return container;
      };

      // Function to create navigation dot elements
      const createNavigationDot = () => {
        const dot = document.createElement('div');
        dot.classList.add('navigation-dot');

        return dot;
      };

      // Create image containers and navigation dots for each carousel image
      this.imageSources.forEach((src, index) => {
        const imageContainer = createImageContainer();
        const navigationDot = createNavigationDot();

        // Set the source attribute for the image
        imageContainer.querySelector('img').setAttribute('src', src);

        // Add event listener to navigation dot
        navigationDot.addEventListener('click', () => {
          // Update navigation dot
          this.setActiveNavigationDot(index);

          // Shift carousel to dot index
          this.shiftCarousel('', index);
        });

        this.carousel.content.append(imageContainer);
        this.carousel.navigationDotsContainer.append(navigationDot);
      });

      const initializeButtonEventListeners = () => {
        this.carousel.rightBtn.addEventListener('click', () => {
          this.shiftCarousel('right');
        });

        this.carousel.leftBtn.addEventListener('click', () => {
          this.shiftCarousel('left');
        });
      };

      // Set active navigation dot to the first index
      this.setActiveNavigationDot(0);

      initializeButtonEventListeners();
    }

    // Function to set an active navigation dot for styling
    setActiveNavigationDot(index) {
      const navigationDots = this.carousel.navigationDotsContainer.children;

      // Remove current active dot
      const activeDot = [...navigationDots].find((dot) => dot.classList.contains('active'));
      if (activeDot) {
        activeDot.classList.remove('active');
      }

      // Set active dot
      navigationDots[index].classList.add('active');
    }

    // Function to shift the image carousel
    shiftCarousel(direction, index) {
      // Clear the timeout
      if (timer) {
        clearTimeout(timer);
      }

      const imageWidth = this.carousel.container.offsetWidth;
      const scrollWidth = this.carousel.content.scrollWidth;
      const numberOfIndices = this.imageSources.length - 1;
      let newPos;

      // Handle direct index navigation
      if (index != null) {
        if (index < 0 || index > numberOfIndices || isNaN(index)) {
          throw new Error(
            `Index out of bounds. Index: '${index}' | Must be a number between: 0-${numberOfIndices}`
          );
        }
        newPos = index * imageWidth;
      } else {
        // Handle directional navigation
        switch (direction) {
          case 'right':
            newPos = xPos + imageWidth;
            break;
          case 'left':
            newPos = xPos - imageWidth;
            break;
          default:
            throw new Error(`Invalid direction: ${direction}. Can only be "left" or "right"`);
        }

        // Loop carousel
        if (newPos < 0) {
          newPos = scrollWidth - imageWidth;
        } else if (newPos > scrollWidth - imageWidth) {
          newPos = 0;
        }
      }

      // Apply transform animation
      this.carousel.content.style.transition = 'transform 0.3s ease';
      this.carousel.content.style.transform = `translateX(-${newPos}px)`;

      // Update xPos
      xPos = newPos;

      // Update active navigation dot
      this.setActiveNavigationDot(newPos / imageWidth);

      // Restart timer
      if (timer) {
        timer = this.startTimer();
      }
    }

    startTimer() {
      console.log('shift');
      return setTimeout(() => this.shiftCarousel('right'), 5000);
    }
  }

  return { ImageCarousel };
})();

export default imageCarouselModule;
