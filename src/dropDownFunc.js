const dropDownFunc = function () {
  // Handle dropdown visiblity
  function toggleDropDownVisibility(contentElement) {
    if (contentElement) {
      contentElement.classList.toggle('visible');
    } else {
      document.querySelectorAll('.dropdown-content.visible').forEach((content) => {
        content.classList.remove('visible');
      });
    }
  }

  // Event listener for toggle dropdown on button click and close on outside click
  window.addEventListener('click', (e) => {
    const dropDownContainer = e.target.closest('.dropdown-container');
    const activeDropDown = document.querySelector(
      '.dropdown-container > .dropdown-content.visible'
    );

    // Hide active dropdown menu
    toggleDropDownVisibility(activeDropDown);

    if (dropDownContainer == null) {
      return;
    }

    const dropDownContent = dropDownContainer.querySelector('.dropdown-content');

    if (dropDownContent === activeDropDown) {
      return;
    }

    // Show dropdown menu
    toggleDropDownVisibility(dropDownContent);
  });
};

export default dropDownFunc;
