// Simple NetSapiens Test Button Integration
(function() {
    // Wait for page to load
    $(document).ready(function() {
        // Find Call History button since we know it exists
        const existingButton = $('#nav-callhistory');
        
        if (existingButton) {
            // Create new Test button with same styling
            const newButton = 
                '<li id="nav-test" class="">' +
                '<a href="#" class="nav-link">' +
                '<div class="nav-button btn"></div>' +
                '<div class="nav-bg-image"></div>' +
                '<span class="nav-text">Test</span>' +
                '<div class="nav-arrow"></div>' +
                '</a>' +
                '</li>';

            // Add after call history
            existingButton.after(newButton);

            // Add click handler
            $('#nav-test').click(function() {
                alert('Test button clicked!');
            });
        }
    });
})();
