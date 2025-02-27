
/**
 * NetSapiens Portal Integration Test
 * This script can be loaded via the PORTAL_JS_EXTRA configuration
 */
$(document).ready(function() {
    // Create a container for our test UI
    let testContainer = $('<div id="synapsiens-sms-test" style="padding: 15px; margin: 10px; border: 1px solid #ccc; background: #f5f5f5;"></div>');
    
    // Add heading
    testContainer.append('<h3>Synapsiens SMS Integration Test</h3>');
    
    // Try to get user information from the portal
    let userInfo = $('<div class="user-info"></div>');
    
    // Check if we can access user information
    try {
        // Add information about the current page
        userInfo.append(`<p><strong>Current page:</strong> ${window.location.href}</p>`);
        
        // Try to find user information in the DOM
        let username = $('.username').text() || 'Not found';
        userInfo.append(`<p><strong>Username from DOM:</strong> ${username}</p>`);
        
        // List any global variables that might be relevant
        let globalVars = [];
        for (let key in window) {
            if (key.toLowerCase().includes('user') || key.toLowerCase().includes('auth') || key.toLowerCase().includes('api')) {
                globalVars.push(key);
            }
        }
        
        if (globalVars.length > 0) {
            userInfo.append(`<p><strong>Potentially useful global variables:</strong> ${globalVars.join(', ')}</p>`);
        } else {
            userInfo.append('<p><strong>No relevant global variables found</strong></p>');
        }
    } catch (error) {
        userInfo.append(`<p><strong>Error accessing portal information:</strong> ${error.message}</p>`);
    }
    
    testContainer.append(userInfo);
    
    // Add a test button that would integrate with our SMS functionality
    let testButton = $('<button class="btn btn-primary">Test SMS Integration</button>');
    testButton.on('click', function() {
        userInfo.append('<p><strong>Button clicked!</strong> This would connect to our SMS backend API.</p>');
        
        // This is where we'd make an API call to our backend
        testContainer.append('<div style="margin-top: 15px; padding: 10px; background: #e0f7fa;">API call would go here to: http://0.0.0.0:3001/api/sms/numbers</div>');
    });
    
    testContainer.append(testButton);
    
    // Try to add our test container to the page
    // This is a common location in portals, but might need adjustment
    $('.main-content').append(testContainer);
    
    // If that fails, try to add it to the body
    if ($('#synapsiens-sms-test').length === 0) {
        $('body').append(testContainer);
    }
    
    console.log('Synapsiens SMS integration test loaded');
});
