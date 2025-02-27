
// NetSapiens API Explorer
// This script helps to explore the NetSapiens portal environment and test APIs

(function() {
  // Your JWT token
  const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJucyIsImV4cCI6MTc0MDc4NDkwOCwiaWF0IjoxNzQwNjk4NTA4LCJpc3MiOiJ2b2lwLmJyaWdodGVyLnRlbCIsImp0aSI6IjY0OTIzYWM2MjZlZmRlNjUwZDFmMTUxZTEzYWNiNGJjYjI4YzE3ODIiLCJzdWIiOiI5OTlAYnJpZ2h0ZXJ0ZWwiLCJ0aW1lX291dCI6ODY0MDAwMDAsImRvbWFpbiI6ImJyaWdodGVydGVsIiwidGVycml0b3J5IjoiYnJpZ2h0ZXJ0ZWwiLCJ1c2VyIjoiOTk5IiwidXNlcl9lbWFpbCI6InphY2tAYnJpZ2h0ZXIudGVsIiwidXNlcl9zY29wZSI6IlJlc2VsbGVyIiwiZGlzcGxheU5hbWUiOiJBUEkgVXNlciIsIm1hc2tfY2hhaW4iOm51bGwsImRlcGFydG1lbnQiOiIiLCJsb2dpbiI6Ijk5OUBicmlnaHRlcnRlbCJ9.65Y721fx0r8osBDvW1GHBXAs-4A81TgeX5rRQuDLsxo"
  
  // Base URL for the NetSapiens API
  const baseApiUrl = "https://voip.brighter.tel/ns-api/v2";

  // Create UI container
  function createExplorerUI() {
    const container = document.createElement('div');
    container.id = 'ns-api-explorer';
    container.style.cssText = `
      position: fixed;
      top: 60px;
      right: 20px;
      width: 500px;
      max-height: 80vh;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      overflow: auto;
      padding: 15px;
      font-family: Arial, sans-serif;
    `;

    let html = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2 style="margin: 0; color: #333; font-size: 18px;">NetSapiens API Explorer</h2>
        <button id="ns-close-explorer" style="background: none; border: none; font-size: 20px; cursor: pointer;">×</button>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="margin: 10px 0; font-size: 16px; color: #444;">JWT Token Information</h3>
        <pre id="token-info" style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto; font-size: 12px; max-height: 150px;"></pre>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="margin: 10px 0; font-size: 16px; color: #444;">Portal Environment</h3>
        <pre id="portal-env" style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto; font-size: 12px; max-height: 150px;"></pre>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="margin: 10px 0; font-size: 16px; color: #444;">API Testing</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
          <button class="api-test-btn" data-endpoint="/domains" style="padding: 8px 12px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">Test Domains API</button>
          <button class="api-test-btn" data-endpoint="/subscribers" style="padding: 8px 12px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">Test Users API</button>
          <button class="api-test-btn" data-endpoint="/sms" style="padding: 8px 12px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">Test SMS API</button>
        </div>
        <div>
          <label style="display: block; margin-bottom: 5px;">Custom API Endpoint:</label>
          <div style="display: flex; gap: 10px;">
            <input id="custom-endpoint" type="text" placeholder="/endpoint" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <button id="test-custom-endpoint" style="padding: 8px 12px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">Test</button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 10px 0; font-size: 16px; color: #444;">API Response</h3>
        <div id="loading-indicator" style="display: none; text-align: center; padding: 10px;">
          <span style="display: inline-block; width: 20px; height: 20px; border: 3px solid rgba(0,0,0,0.1); border-radius: 50%; border-top-color: #4285f4; animation: spin 1s ease-in-out infinite;"></span>
        </div>
        <pre id="api-response" style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto; font-size: 12px; max-height: 300px;"></pre>
      </div>
    `;
    
    container.innerHTML = html;
    document.body.appendChild(container);
    
    // Add a style element for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    // Close button event
    document.getElementById('ns-close-explorer').addEventListener('click', function() {
      document.body.removeChild(container);
    });
    
    // Initialize JWT token info
    displayTokenInfo();
    
    // Initialize portal environment info
    explorePortalEnvironment();
    
    // API test buttons
    document.querySelectorAll('.api-test-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const endpoint = this.getAttribute('data-endpoint');
        testApiEndpoint(endpoint);
      });
    });
    
    // Custom endpoint test
    document.getElementById('test-custom-endpoint').addEventListener('click', function() {
      const endpoint = document.getElementById('custom-endpoint').value;
      if (endpoint) {
        testApiEndpoint(endpoint);
      } else {
        setApiResponse('Please enter an endpoint path');
      }
    });
  }
  
  // Display decoded JWT token info
  function displayTokenInfo() {
    try {
      const tokenInfo = parseJwt(jwtToken);
      document.getElementById('token-info').textContent = JSON.stringify(tokenInfo, null, 2);
    } catch (e) {
      document.getElementById('token-info').textContent = 'Error parsing JWT token: ' + e.message;
    }
  }
  
  // Parse JWT token
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  
  // Explore NetSapiens portal environment
  function explorePortalEnvironment() {
    const portalEnvElement = document.getElementById('portal-env');
    
    // Check for global objects and variables
    const environment = {
      window: {
        NS: typeof window.NS !== 'undefined' ? 'Available' : 'Not available',
        $: typeof window.$ !== 'undefined' ? 'jQuery available' : 'jQuery not available',
        jQuery: typeof window.jQuery !== 'undefined' ? 'jQuery available' : 'jQuery not available',
        angular: typeof window.angular !== 'undefined' ? 'Angular available' : 'Angular not available',
        React: typeof window.React !== 'undefined' ? 'React available' : 'React not available',
        Vue: typeof window.Vue !== 'undefined' ? 'Vue available' : 'Vue not available',
        apiEndpoints: typeof window.apiEndpoints !== 'undefined' ? window.apiEndpoints : 'Not available',
        user: typeof window.user !== 'undefined' ? window.user : 'Not available',
        domain: typeof window.domain !== 'undefined' ? window.domain : 'Not available',
        config: typeof window.config !== 'undefined' ? window.config : 'Not available',
        portalVersion: typeof window.portalVersion !== 'undefined' ? window.portalVersion : 'Not available'
      },
      document: {},
      navigator: {},
      location: {
        href: window.location.href,
        host: window.location.host,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      },
      localStorage: {},
      sessionStorage: {},
      custom: {}
    };
    
    // Check for form elements
    const hiddenInputs = {};
    document.querySelectorAll('input[type="hidden"]').forEach(input => {
      hiddenInputs[input.name] = input.value;
    });
    environment.hiddenInputs = hiddenInputs;
    
    // Display environment info
    portalEnvElement.textContent = JSON.stringify(environment, null, 2);
  }
  
  // Test API endpoint
  function testApiEndpoint(endpoint) {
    const apiResponseElement = document.getElementById('api-response');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    // Show loading indicator
    loadingIndicator.style.display = 'block';
    apiResponseElement.textContent = `Testing ${endpoint} (${baseApiUrl}${endpoint})...`;
    
    // Ensure endpoint starts with a slash
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    
    // Make API request
    fetch(`${baseApiUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Accept': 'application/json'
      }
    })
    .then(response => {
      loadingIndicator.style.display = 'none';
      
      const statusMessage = `Status: ${response.status} ${response.statusText}`;
      apiResponseElement.textContent = statusMessage + '\n\nLoading response...';
      
      // Try to parse as JSON
      return response.text().then(text => {
        try {
          // First try to parse as JSON
          const data = JSON.parse(text);
          return { statusMessage, data };
        } catch (e) {
          // If not JSON, return as text
          return { statusMessage, data: text };
        }
      });
    })
    .then(({ statusMessage, data }) => {
      if (typeof data === 'object') {
        apiResponseElement.textContent = statusMessage + '\n\n' + JSON.stringify(data, null, 2);
      } else {
        apiResponseElement.textContent = statusMessage + '\n\n' + data;
      }
    })
    .catch(error => {
      loadingIndicator.style.display = 'none';
      apiResponseElement.textContent = `Error: ${error.message}`;
    });
  }
  
  // Set API response text
  function setApiResponse(text) {
    document.getElementById('api-response').textContent = text;
  }

  // Initialize the explorer
  createExplorerUI();
})();

