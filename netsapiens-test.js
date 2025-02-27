
// NetSapiens Portal Integration Script
// This script can be injected into the NetSapiens portal to access additional functionality

(function() {
  console.log("Synapsiens SMS Integration Loading...");
  
  // Store the JWT token provided
  const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJucyIsImV4cCI6MTc0MDc4NDIzNSwiaWF0IjoxNzQwNjk3ODM1LCJpc3MiOiJ2b2lwLmJyaWdodGVyLnRlbCIsImp0aSI6IjUzMDgwMWUxN2M0Njk5YjRlNGRiMzJhNWRkMmRlNmE2OTQwOThlMTMiLCJzdWIiOiI5OThAYnJpZ2h0ZXJ0ZWwiLCJ0aW1lX291dCI6ODY0MDAwMDAsImRvbWFpbiI6ImJyaWdodGVydGVsIiwidGVycml0b3J5IjoiYnJpZ2h0ZXJ0ZWwiLCJ1c2VyIjoiOTk4IiwidXNlcl9lbWFpbCI6InphY2tAYnJpZ2h0ZXIudGVsIiwidXNlcl9zY29wZSI6Ik9mZmljZSBNYW5hZ2VyIiwiZGlzcGxheU5hbWUiOiJBUEkgVXNlcjIiLCJtYXNrX2NoYWluIjpudWxsLCJkZXBhcnRtZW50IjoiIiwibG9naW4iOiI5OThAYnJpZ2h0ZXJ0ZWwifQ.1YdbXr9GEokPnZFOtJwxEl6NNjEgBUcCh0fs84mPaFM";
  
  // Exploration functions
  function exploreGlobals() {
    console.log("=== EXPLORING NETSAPIENS GLOBALS ===");
    
    // Create a container for our results
    let results = {
      window: {},
      document: {},
      navigator: {},
      location: {},
      localStorage: {},
      sessionStorage: {},
      custom: {}
    };
    
    // Explore window properties
    try {
      results.window = {
        NS: window.NS ? Object.keys(window.NS) : 'Not available',
        $: window.$ ? 'jQuery available' : 'jQuery not available',
        jQuery: window.jQuery ? 'jQuery available' : 'jQuery not available',
        angular: window.angular ? 'Angular available' : 'Angular not available',
        React: window.React ? 'React available' : 'React not available',
        Vue: window.Vue ? 'Vue available' : 'Vue not available',
        apiEndpoints: window.apiEndpoints || 'Not available',
        user: window.user || 'Not available',
        domain: window.domain || 'Not available',
        config: window.config || 'Not available',
        portalVersion: window.portalVersion || 'Not available'
      };
      
      // NS specific object
      if (window.NS) {
        results.custom.NS = {
          user: window.NS.user || 'Not available',
          domain: window.NS.domain || 'Not available',
          config: window.NS.config || 'Not available',
          api: window.NS.api ? Object.keys(window.NS.api) : 'Not available',
          utils: window.NS.utils ? Object.keys(window.NS.utils) : 'Not available',
          endpoints: window.NS.endpoints || 'Not available'
        };
      }
    } catch (e) {
      results.window.error = e.message;
    }
    
    // Location information
    try {
      results.location = {
        href: window.location.href,
        host: window.location.host,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      };
    } catch (e) {
      results.location.error = e.message;
    }
    
    console.log("Global Environment Exploration Results:", results);
    return results;
  }
  
  function testApiAccess() {
    console.log("=== TESTING API ACCESS WITH JWT TOKEN ===");
    
    // Make a request to a NetSapiens API endpoint using the JWT token
    fetch('https://voip.brighter.tel/ns-api/v2/domains', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      }
    })
    .then(response => {
      console.log("API Response Status:", response.status);
      return response.json();
    })
    .then(data => {
      console.log("API Response Data:", data);
      
      // Display the first 3 domains if available
      if (Array.isArray(data) && data.length > 0) {
        const domains = data.slice(0, 3);
        console.log("First 3 domains:", domains);
      }
    })
    .catch(error => {
      console.error("API Request Error:", error);
    });
  }

  // Create UI elements to interact with our script
  function createUI() {
    console.log("=== CREATING SMS INTEGRATION UI ===");
    
    // Create a container for our SMS integration
    const container = document.createElement('div');
    container.id = 'synapsiens-sms-container';
    container.style.cssText = `
      position: fixed;
      top: 50px;
      right: 20px;
      width: 300px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 9999;
      font-family: Arial, sans-serif;
      padding: 10px;
      display: none;
    `;
    
    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      margin-bottom: 10px;
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'Synapsiens SMS';
    title.style.margin = '0';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-weight: bold;
    `;
    closeButton.onclick = () => {
      container.style.display = 'none';
    };
    
    header.appendChild(title);
    header.appendChild(closeButton);
    container.appendChild(header);
    
    // Create buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.gap = '10px';
    
    const exploreButton = document.createElement('button');
    exploreButton.textContent = 'Explore Globals';
    exploreButton.onclick = exploreGlobals;
    
    const testApiButton = document.createElement('button');
    testApiButton.textContent = 'Test API Access';
    testApiButton.onclick = testApiAccess;
    
    buttonContainer.appendChild(exploreButton);
    buttonContainer.appendChild(testApiButton);
    container.appendChild(buttonContainer);
    
    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'synapsiens-results';
    resultsContainer.style.cssText = `
      margin-top: 10px;
      padding: 10px;
      border-top: 1px solid #eee;
      max-height: 300px;
      overflow-y: auto;
      font-size: 12px;
    `;
    
    container.appendChild(resultsContainer);
    document.body.appendChild(container);
    
    // Create toggle button in the header
    const toggleButton = document.createElement('li');
    toggleButton.innerHTML = '<a href="#" class="header-link">SMS Tools</a>';
    toggleButton.onclick = function(e) {
      e.preventDefault();
      container.style.display = container.style.display === 'none' ? 'block' : 'none';
      return false;
    };
    
    // Add toggle button to user toolbar
    try {
      const userToolbar = document.querySelector('.user-toolbar');
      if (userToolbar) {
        userToolbar.prepend(toggleButton);
      } else {
        console.error("Could not find .user-toolbar to append button");
      }
    } catch (e) {
      console.error("Error adding toggle button:", e);
    }
    
    // Override console.log to also write to our results container
    const originalConsoleLog = console.log;
    console.log = function() {
      originalConsoleLog.apply(console, arguments);
      
      const args = Array.from(arguments);
      const resultsDiv = document.getElementById('synapsiens-results');
      if (resultsDiv) {
        const logLine = document.createElement('div');
        logLine.style.borderBottom = '1px solid #eee';
        logLine.style.paddingBottom = '5px';
        logLine.style.marginBottom = '5px';
        
        // Format arguments properly
        let content = '';
        args.forEach(arg => {
          if (typeof arg === 'object') {
            try {
              content += JSON.stringify(arg, null, 2) + ' ';
            } catch (e) {
              content += arg + ' ';
            }
          } else {
            content += arg + ' ';
          }
        });
        
        logLine.textContent = content;
        resultsDiv.appendChild(logLine);
        
        // Auto-scroll to bottom
        resultsDiv.scrollTop = resultsDiv.scrollHeight;
      }
    };
  }

  // Initialize everything once the document is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(createUI, 1000);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(createUI, 1000);
    });
  }

  // Also try with jQuery if available
  if (typeof $ !== 'undefined') {
    $(document).ready(() => {
      setTimeout(createUI, 1000);
    });
  }
  
  console.log("Synapsiens SMS Integration Loaded Successfully");
})();
