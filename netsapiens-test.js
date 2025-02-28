
$(document).ready(function() {
    // Create SMS button for the navigation
    function createSmsButton() {
        // Clone an existing button to maintain style consistency
        let existingButton = $('#nav-music');
        let smsButton = existingButton.clone();
        
        // Update button attributes for SMS
        smsButton.attr('id', 'nav-sms');
        smsButton.find('.nav-text').html("SMS");
        
        // Add the button to the navigation
        smsButton.appendTo($('#nav-buttons'));
        
        // Customize the button appearance
        // Set the background image to a chat/SMS icon
        smsButton.find('.nav-bg-image').attr("style", 
            "background-position: 0; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTIwIDJINGMtMS4xIDAtMiAuOS0yIDJ2MThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY0YzAtMS4xLS45LTItMi0yem0tOSAxM2gtMnYtMmgydjJ6bTAgNGgtMnYtMmgydjJ6bTQtNGgtMnYtMmgydjJ6bTAgNGgtMnYtMmgydjJ6TTkgOUg3VjdoMnYyem00IDBoLTJWN2gydjJ6bTQgMGgtMlY3aDJ2MnoiLz48L3N2Zz4='); background-size: 24px 24px;");
        
        // Set background color to a nice blue color (similar to your screenshot)
        smsButton.find('.nav-bg-image').css({
            'background-color': '#00a0e9'
        });
        
        // Add click handler
        smsButton.find('a').click(function(e) {
            e.preventDefault();
            
            // Remove current selection from all buttons
            $("#nav-buttons li").removeClass("nav-link-current");
            existingButton.removeClass("nav-link-current");
            
            // Mark this button as active
            smsButton.addClass("nav-link-current");
            
            // Update the title
            $('.navigation-title').html("SMS Management");
            
            // Load SMS interface in the content area
            loadSmsInterface();
            
            return false;
        });
    }
    
    // Load the SMS interface in the content area
    function loadSmsInterface() {
        // Clear existing content
        $('#content').empty();
        
        // Create a container for the SMS interface
        const smsContainer = $('<div id="sms-management-container"></div>').appendTo('#content');
        
        // Basic UI structure for SMS management
        smsContainer.html(`
            <style>
                #sms-management-container {
                    padding: 15px;
                    font-family: Arial, sans-serif;
                }
                .sms-tabs {
                    display: flex;
                    border-bottom: 1px solid #ddd;
                    margin-bottom: 20px;
                }
                .sms-tab {
                    padding: 10px 15px;
                    cursor: pointer;
                    background: #f5f5f5;
                    margin-right: 5px;
                    border: 1px solid #ddd;
                    border-bottom: none;
                }
                .sms-tab.active {
                    background: white;
                    border-bottom: 1px solid white;
                    margin-bottom: -1px;
                }
                .sms-tab-content {
                    display: none;
                }
                .sms-tab-content.active {
                    display: block;
                }
                .sms-message-form {
                    margin-top: 15px;
                }
                .sms-form-group {
                    margin-bottom: 15px;
                }
                .sms-form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                .sms-form-group input, .sms-form-group textarea, .sms-form-group select {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                .sms-btn {
                    padding: 8px 15px;
                    background: #00a0e9;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .sms-message-list {
                    border: 1px solid #ddd;
                    padding: 10px;
                    height: 400px;
                    overflow-y: auto;
                }
                .sms-message {
                    padding: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }
                .sms-message-meta {
                    font-size: 0.8em;
                    color: #777;
                }
            </style>
            
            <div class="sms-tabs">
                <div class="sms-tab active" data-tab="send">Send SMS</div>
                <div class="sms-tab" data-tab="history">Message History</div>
                <div class="sms-tab" data-tab="campaigns">Campaigns</div>
            </div>
            
            <div id="send-tab" class="sms-tab-content active">
                <h3>Send New Message</h3>
                <div class="sms-message-form">
                    <div class="sms-form-group">
                        <label for="from-number">From:</label>
                        <select id="from-number"></select>
                    </div>
                    <div class="sms-form-group">
                        <label for="to-number">To:</label>
                        <input type="text" id="to-number" placeholder="Enter recipient phone number">
                    </div>
                    <div class="sms-form-group">
                        <label for="message-content">Message:</label>
                        <textarea id="message-content" rows="4" placeholder="Type your message here"></textarea>
                    </div>
                    <button id="send-sms-btn" class="sms-btn">Send Message</button>
                </div>
            </div>
            
            <div id="history-tab" class="sms-tab-content">
                <h3>Message History</h3>
                <div class="sms-message-list" id="message-history"></div>
            </div>
            
            <div id="campaigns-tab" class="sms-tab-content">
                <h3>SMS Campaigns</h3>
                <p>Manage your SMS campaigns here.</p>
            </div>
        `);
        
        // Add tab switching functionality
        $('.sms-tab').on('click', function() {
            // Remove active class from all tabs
            $('.sms-tab').removeClass('active');
            $('.sms-tab-content').removeClass('active');
            
            // Add active class to clicked tab
            $(this).addClass('active');
            const tabId = $(this).data('tab') + '-tab';
            $('#' + tabId).addClass('active');
        });
        
        // Load SMS numbers for the sender dropdown
        loadSmsNumbers();
        
        // Add event listener for send button
        $('#send-sms-btn').on('click', sendSms);
    }
    
    // Function to load SMS numbers
    function loadSmsNumbers() {
        // This would normally make an API call to your backend
        // For now, we'll just simulate with placeholder data
        const fromSelect = $('#from-number');
        fromSelect.empty();
        
        // Add loading option
        fromSelect.append('<option value="">Loading SMS numbers...</option>');
        
        // Fetch SMS numbers from your backend API
        fetch('/api/sms/numbers')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch SMS numbers');
                }
                return response.json();
            })
            .then(data => {
                fromSelect.empty();
                
                if (data.length === 0) {
                    fromSelect.append('<option value="">No SMS numbers available</option>');
                    return;
                }
                
                data.forEach(num => {
                    fromSelect.append(`<option value="${num.number}">${num.number} ${num.description ? '(' + num.description + ')' : ''}</option>`);
                });
            })
            .catch(error => {
                console.error('Error fetching SMS numbers:', error);
                fromSelect.empty();
                fromSelect.append('<option value="">Error loading SMS numbers</option>');
            });
    }
    
    // Function to send SMS
    function sendSms() {
        const fromNumber = $('#from-number').val();
        const toNumber = $('#to-number').val();
        const messageContent = $('#message-content').val();
        
        if (!fromNumber || !toNumber || !messageContent) {
            alert('Please fill in all fields');
            return;
        }
        
        // Disable the send button during the request
        const sendButton = $('#send-sms-btn');
        const originalText = sendButton.text();
        sendButton.text('Sending...').prop('disabled', true);
        
        // Send the message via your backend API
        fetch('/api/sms/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: fromNumber,
                to: toNumber,
                message: messageContent
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send SMS');
            }
            return response.json();
        })
        .then(data => {
            // Clear the form
            $('#to-number').val('');
            $('#message-content').val('');
            
            // Show success message
            alert('Message sent successfully!');
        })
        .catch(error => {
            console.error('Error sending SMS:', error);
            alert('Failed to send message. Please try again.');
        })
        .finally(() => {
            // Re-enable the send button
            sendButton.text(originalText).prop('disabled', false);
        });
    }
    
    // Initialize by adding the SMS button
    // Wait a short time to ensure all NetSapiens UI elements are loaded
    setTimeout(createSmsButton, 500);
});
