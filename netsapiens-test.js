// Simple NetSapiens Test Button Integration
(function() {
    $(document).ready(function() {
        const existingButton = $('#nav-callhistory');
        
        if (existingButton) {
            const newButton = 
                '<li id="nav-test" class="">' +
                '<a href="#" class="nav-link">' +
                '<div class="nav-button btn"></div>' +
                '<div class="nav-bg-image"></div>' +
                '<span class="nav-text">Test</span>' +
                '<div class="nav-arrow"></div>' +
                '</a>' +
                '</li>';

            existingButton.after(newButton);

            // Added logging on click
            $('#nav-test').click(function() {
                console.log('User:', sub_user);
                console.log('Domain:', sub_domain);
                console.log('Email:', sub_email);
                console.log('Scope:', sub_scope);
                console.log('SMS Numbers:', groupMesNumbers);
                
                alert('Check the console (F12) for user information!');
            });
        }
    });
})();
