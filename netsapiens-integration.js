// Add this to a file named 'netsapiens-integration.js'
(function() {
    // Create and add the new tab
    function addIntegrationsTab() {
        let newTab = $("<li>");
        let link = $("<a>");
        link.attr("href", "#integrations");
        link.html("Integrations");
        newTab.append(link);
        
        // Add the tab to the main menu
        $("ul.nav-tabs").append(newTab);

        // Create content container
        let content = $("<div>");
        content.attr("id", "integrations");
        content.addClass("tab-pane");
        content.css({
            'padding': '20px',
            'display': 'none'
        });

        // Add platform boxes
        const platforms = [
            { name: 'Zapier', color: '#FF4A00' },
            { name: 'n8n', color: '#2AB7CA' },
            { name: 'Make.com', color: '#34495E' }
        ];

        let boxContainer = $("<div>").css({
            'display': 'grid',
            'grid-template-columns': 'repeat(auto-fill, minmax(200px, 1fr))',
            'gap': '20px',
            'padding': '20px'
        });

        platforms.forEach(platform => {
            let box = $("<div>").css({
                'background-color': platform.color,
                'color': 'white',
                'padding': '20px',
                'text-align': 'center',
                'border-radius': '8px',
                'cursor': 'pointer'
            }).html(platform.name);

            box.on('click', function() {
                alert(`Clicked ${platform.name} integration`);
            });

            boxContainer.append(box);
        });

        content.append(boxContainer);
        $(".tab-content").append(content);

        // Add click handler for the tab
        link.on('click', function(e) {
            e.preventDefault();
            $('.tab-pane').hide();
            $('#integrations').show();
            $('ul.nav-tabs li').removeClass('active');
            newTab.addClass('active');
        });
    }

    // Wait for page load
    $(document).ready(function() {
        addIntegrationsTab();
    });
})();
