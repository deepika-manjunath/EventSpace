const slides = document.querySelectorAll(".slide")
var counter = 0;

slides.forEach(
  (slide,index) => {
    slide.style.left = `${index * 100}%`
  }
)
const goPrev = () => {
  counter--
  slideImage()
}

const goNext = () => {
  counter++
   if (counter >=2) {
     counter = 0;
    }  
  slideImage()
}
const slideImage = () =>{
  slides.forEach(
    (slide) => {
      slide.style.transform = `translateX(-${counter * 100}%)`
    }
  )
}

// Select all checkboxes with the class 'myCheckbox'
const checkboxes = document.querySelectorAll('.myCheckbox');

// Function to update local storage
function updateLocalStorage() {
    const checkedBoxes = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.name);
    
    localStorage.setItem('checkedFacilities', JSON.stringify(checkedBoxes));
}

// Load the stored checkbox names from local storage on page load
window.addEventListener('load', () => {
    const storedBoxes = JSON.parse(localStorage.getItem('checkedFacilities')) || [];
    checkboxes.forEach(checkbox => {
        checkbox.checked = storedBoxes.includes(checkbox.name);
    });
});

// Add a click event listener to each checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function() {
        // Update local storage whenever a checkbox is clicked
        updateLocalStorage();

        // Access the name of the clicked checkbox
        const checkboxName = this.name;
        console.log(`${checkboxName} is ${this.checked ? 'checked' : 'unchecked'}`);
    });
});

