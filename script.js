// Functions for index.html

// Show image near cursor on hover
function showImage(image) {
  const hoverImage = document.getElementById('hover-image');
  hoverImage.src = `images/${image}`;
  hoverImage.style.display = 'block';
  // Position the image near the cursor with slight offset
  hoverImage.style.top = `${event.clientY + 10}px`;
  hoverImage.style.left = `${event.clientX + 10}px`;
}

// Hide the hover image
function hideImage() {
  const hoverImage = document.getElementById('hover-image');
  hoverImage.style.display = 'none';
}

// Open Discovery by redirecting to discoveries.html with hash
function openDiscovery(title) {
  // Map title to corresponding discovery ID
  const titleToIdMap = {
    "Galileo Telescope": "galileo",
    "Penicillin": "penicillin",
    "Discovery of Electricity": "electricity",
    "Theory of Relativity": "relativity",
    "DNA Structure": "dna",
    "The Internet": "internet",
    "Quantum Computing": "quantum-computing" // Add mapping for the 7th item
  };

  const id = titleToIdMap[title];
  if(id) {
    window.location.href = `discoveries.html#${id}`;
  } else {
    alert(`More information about: ${title}`);
  }
}

// Smooth scroll for navigation links within the same page
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
        }
    });
});

// Modal Functionality for discoveries.html
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalFacts = document.getElementById("modal-facts");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementsByClassName("close")[0];

    // Function to open modal with specific discovery details
    function openModal(title, description, facts, image) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalFacts.textContent = facts;
        modalImage.src = image;
        modal.style.display = "block";
    }

    // Add click event to each discovery card
    document.querySelectorAll('.discovery-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const facts = this.getAttribute('data-facts');
            const image = this.getAttribute('data-image');

            openModal(title, description, facts, image);
        });
    });

    // Close modal when user clicks on <span> (x)
    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Open modal based on URL hash
    const hash = window.location.hash.substring(1); // Remove the #
    if(hash) {
        const card = document.getElementById(hash);
        if(card) {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const facts = card.getAttribute('data-facts');
            const image = card.getAttribute('data-image');

            openModal(title, description, facts, image);
        }
    }
});