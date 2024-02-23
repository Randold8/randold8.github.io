// Define prices for materials and sizes
const prices = {
    'Дуб': {
      '10': 15000,
      '20': 30000,
      '30': 45000,
      '1': 450,
      '2': 900,
      '3': 1350
    },
    'Береза': {
        
            '100': 15000,
            '200': 30000,
            '300': 45000,
            '1': 450,
            '2': 900,
            '3': 1350
          
    },
    'Ель': {
        
            '100': 15000,
            '200': 30000,
            '300': 45000,
            '1': 450,
            '2': 900,
            '3': 1350
        
    },
  };
  
  // Calculate and update the price for section1
  function calculateAndUpdatePrice(sectionId) {
  
    const section = document.getElementById(sectionId);
  
    // Get selected material and size
    const materialSelect = section.querySelector('select[name="material"]');
    const materialValue = materialSelect.value;
  
     // For different selections in sections
     let sizeSelect;
  

    sizeSelect = section.querySelector('select[name="size"]');
  
     const sizeValue = sizeSelect.value;
  
     // Get quantity value as number
     const quantityInput = section.querySelector('input[type=number][name="quantity"]');
  
     const quantityValue = parseInt(quantityInput.value,10);
  
     // Calculate total price using our pricing data structure above.
     let totalPrice;
  
     try {
        totalPrice = prices[materialValue][sizeValue] * quantityValue;
  
        // Handle case where no pricing data available.
        if (!totalPrice && totalPrice !==0){
           throw new Error("No pricing available for selection.");
        }
  
      } catch(error) {
          console.log(error.message);
          totalPrice ="N/A";
  
          }
  
       // Update UI - Assuming there is only one p element to show price within each content section
  
       const priceDisplayElement=section.querySelector('p[id="price"]');
  
       if(priceDisplayElement){
         priceDisplayElement.textContent=`${totalPrice} руб. без НДС`;
       }else{
         console.warn(`No element found to display the calculated price in ${sectionId}`);
         }
  }
  
  
  // Attach onChange event listeners to recalculate whenever user makes changes.
  document.querySelectorAll('.content select,.content input[type=number]').forEach(input => {
  
   input.addEventListener('change', () => {
  
   let parentSection=input.closest('.content').id;
  
  calculateAndUpdatePrice(parentSection);
  
  });
  });
  document.addEventListener("DOMContentLoaded", function () {
    calculateAndUpdatePrice('content-section1');
    calculateAndUpdatePrice('content-section2');
  });
  