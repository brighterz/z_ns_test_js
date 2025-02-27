
/**
 * NetSapiens Portal Integration Test
 * This script can be loaded via the PORTAL_JS_EXTRA configuration
 */
(function() {
    // Prevent multiple initializations
    if (window.synapsiensSmsTestInitialized) {
        console.log('Synapsiens SMS test script already initialized, skipping');
        return;
    }
    
    // Mark as initialized
    window.synapsiensSmsTestInitialized = true;
    
    // Wait for document to be fully loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScript);
    } else {
        initScript();
    }
    
    function initScript() {
        console.log('Synapsiens SMS test script loading...');
        
        // Remove any existing test containers first
        const existingContainer = document.getElementById('synapsiens-sms-test');
        if (existingContainer) {
            existingContainer.remove();
        }
        
        // Create test container with visible feedback
        let testContainer = document.createElement('div');
        testContainer.id = 'synapsiens-sms-test';
        testContainer.style.cssText = 'padding: 15px; margin: 10px; border: 1px solid #ccc; background: #f5f5f5; position: fixed; bottom: 20px; right: 20px; z-index: 9999; max-width: 400px;';
        
        // Add heading
        let heading = document.createElement('h3');
        heading.textContent = 'Synapsiens SMS Integration Test';
        testContainer.appendChild(heading);
        
        // Status display
        let statusDiv = document.createElement('div');
        statusDiv.textContent = 'Script loaded successfully';
        statusDiv.style.cssText = 'padding: 5px; background-color: #e8f5e9; margin: 5px 0;';
        testContainer.appendChild(statusDiv);
        
        // Add a test button with unique ID
        let testButton = document.createElement('button');
        testButton.id = 'synapsiens-test-button-' + Date.now(); // Add timestamp for uniqueness
        testButton.textContent = 'Test SMS Integration';
        testButton.style.cssText = 'padding: 8px 15px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;';
        
        testButton.addEventListener('click', function() {
            // Visual feedback
            let feedbackDiv = document.createElement('div');
            feedbackDiv.textContent = 'Button clicked! Testing connection...';
            feedbackDiv.style.cssText = 'margin-top: 10px; padding: 8px; background: #e3f2fd;';
            testContainer.appendChild(feedbackDiv);
            
            // Log to console for debugging
            console.log('SMS test button clicked');
            
            // Get user information if available
            try {
                const user = document.querySelector('.username')?.textContent || 'Unknown';
                const domain = window.location.hostname.split('.').slice(-2).join('.');
                
                console.log('User info:', { user, domain });
                feedbackDiv.textContent += `\nUser: ${user}, Domain: ${domain}`;
            } catch (error) {
                console.error('Error getting user info:', error);
            }
            
            // Simulate API call (in production this would be a real API call)
            setTimeout(function() {
                feedbackDiv.textContent = 'Test complete! Would connect to: http://0.0.0.0:3001/api/sms/numbers';
                feedbackDiv.style.backgroundColor = '#e8f5e9';
                
                // Try to get DOM information for debugging
                try {
                    const domInfo = {
                        hasMainContent: !!document.querySelector('.main-content'),
                        hasNavButtons: !!document.querySelector('#nav-buttons'),
                        hasUserToolbar: !!document.querySelector('.user-toolbar'),
                        bodyClasses: document.body.className
                    };
                    
                    console.log('Portal DOM structure:', domInfo);
                    
                    const infoText = document.createElement('pre');
                    infoText.textContent = JSON.stringify(domInfo, null, 2);
                    infoText.style.cssText = 'font-size: 12px; margin-top: 10px; white-space: pre-wrap;';
                    testContainer.appendChild(infoText);
                } catch (e) {
                    console.error('Error getting DOM info:', e);
                }
            }, 1000);
        });
        
        testContainer.appendChild(testButton);
        
        // Only append if body exists
        if (document.body) {
            document.body.appendChild(testContainer);
            console.log('Synapsiens SMS test container added to page');
        } else {
            console.error('Cannot find document.body to append test container');
        }
    }
})();
