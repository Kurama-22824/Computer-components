// Select buttons and card container
const filterVideoCardsButton = document.getElementById('filter-video-cards');
const filterProcessorsButton = document.getElementById('filter-processors');
const cards = document.querySelectorAll('.card-box');

// State variables to track active filters
let videoCardFilterActive = false;
let processorFilterActive = false;

// Function to filter cards by category
function filterCards(category) {
  cards.forEach(card => {
    if (card.dataset.category !== category) {
      card.classList.add('hidden');
    } else {
      card.classList.remove('hidden');
    }
  });
}

// Function to show all cards
function showAllCards() {
  cards.forEach(card => card.classList.remove('hidden'));
}

// Event listener for Video Cards button
filterVideoCardsButton.addEventListener('click', () => {
  videoCardFilterActive = !videoCardFilterActive; // Toggle filter state
  processorFilterActive = false; // Disable other filter
  if (videoCardFilterActive) {
    filterCards('video-card');
  } else {
    showAllCards();
  }
});

// Event listener for Processors button
filterProcessorsButton.addEventListener('click', () => {
  processorFilterActive = !processorFilterActive; // Toggle filter state
  videoCardFilterActive = false; // Disable other filter
  if (processorFilterActive) {
    filterCards('processor');
  } else {
    showAllCards();
  }
});