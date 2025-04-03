/*DARK MODE TOGGLE */
$(document).ready(function() {
    // Check if dark mode is enabled in local storage
    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
    }

    // Toggle Dark Mode when button is clicked
    $("#darkModeToggle").click(function() {
        if ($("body").hasClass("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Function to enable dark mode
    function enableDarkMode() {
        $("body").addClass("dark-mode bg-dark text-white"); // Add dark mode classes
        $("header, footer").addClass("bg-dark"); // Darken header & footer
        $(".list-group-item").addClass("bg-secondary text-white"); // Darken list items
        $("#darkModeToggle").html('<i class="bi bi-sun-fill"></i>'); // Change button icon to Sun
        localStorage.setItem("darkMode", "enabled"); // Save mode in local storage
    }

    // Function to disable dark mode
    function disableDarkMode() {
        $("body").removeClass("dark-mode bg-dark text-white"); // Removes the dark mode classes
        $("header, footer").removeClass("bg-dark"); // Removes the dark color from header & footer
        $(".list-group-item").removeClass("bg-secondary text-white"); // Removes the dark of the list items
        $("#darkModeToggle").html('<i class="bi bi-moon-fill"></i>'); // Change button icon to Moon
        localStorage.setItem("darkMode", "disabled"); // Save mode in local storage
    }
});

/*COUNTDOWN TIMER FOR SNEAKER DROP */
function countdownTimer() {
    // Set the sneaker drop release date (Year, Month-1, Day, Hour, Minute, Second)
    const releaseDate = new Date(2025, 2, 14, 0, 0, 0).getTime();

    const timer = setInterval(function () {
        const now = new Date().getTime(); // Get current time
        const timeLeft = releaseDate - now; // Calculate remaining time

        if (timeLeft < 0) {
            clearInterval(timer); // Stop timer when countdown reaches 0
            $("#countdown").html("🚀 DROP IS LIVE! GET YOURS NOW! 🔥");
            $("#countdown-box").addClass("drop-live"); // Highlight the countdown box
            return;
        }

        // Convert time to Days, Hours, Minutes, and Seconds
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display countdown time
        $("#countdown").html(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000); // Update every second
}

$(document).ready(function() {
    countdownTimer();
});

/*LATEST ACTIVITY TRACKER */
// Function to update Latest Activity section
function updateLatestActivity(action) {
    let activities = JSON.parse(localStorage.getItem("latestActivities")) || [];

    activities.unshift(action); // Add new activity at the top

    if (activities.length > 5) {
        activities.pop(); // Keep only the latest 5 activities
    }

    localStorage.setItem("latestActivities", JSON.stringify(activities)); // Save to local storage

    displayLatestActivity(); // Refresh activity list
}

// Function to display the latest activities on the index page
function displayLatestActivity() {
    // Retrieve the latest activities from local storage.
    // If no activities exist, initialize with an empty array.
    let activities = JSON.parse(localStorage.getItem("latestActivities")) || [];

    // Select the unordered list (<ul>) element where the latest activities will be displayed.
    let activityList = $("#latestActivity");

    // Clear any existing list items before updating the list.
    activityList.empty();

    // Check if there are no activities stored
    if (activities.length === 0) {
        // If no activities exist, add a default message to indicate no recent activity.
        activityList.append('<li class="list-group-item">No recent activity.</li>');
    } else {
        // Loop through each activity in the array and append it to the list.
        activities.forEach(activity => {
            // Create a new list item (`<li>`) for each activity and append it to the activity list.
            activityList.append(`<li class="list-group-item">${activity}</li>`);
        });
    }
}


// Load latest activity on page load
$(document).ready(function () {
    displayLatestActivity();
});

/*ABOUT PAGE - ANIMATED COUNTERS */
$(document).ready(function () {
    $(".counter").each(function () {
        let $this = $(this);
        let target = parseInt($this.attr("data-target"));

        $({ count: 0 }).animate({ count: target }, {
            duration: 2000, // Animation duration (2 seconds)
            easing: "swing",
            step: function () {
                $this.text(Math.floor(this.count)); // Update counter dynamically
            },
            complete: function () {
                $this.text(target); // Ensure final value is correct
            }
        });
    });
});


/* CONTACT FORM SUBMISSION */
$(document).ready(function() {
    $("#contactForm").submit(function(e) { // Listens for form submission
        e.preventDefault(); // Prevents page refresh
        alert("Thank you, " + $("#name").val() + "! Your message has been sent."); // Displays confirmation message
        this.reset(); // Resets the form fields
    });
});

/* SHOW/HIDE LOGO ON SCROLL */
$(document).ready(function() {
    $(window).scroll(function() { // Detects window scroll event
        if ($(window).scrollTop() > 100) { // If scrolled more than 100 pixels
            $("#navLogo").removeClass("d-none"); // Show logo
        } else {
            $("#navLogo").addClass("d-none"); // Hide logo
        }
    });
});
