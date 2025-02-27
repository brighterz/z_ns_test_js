
// NetSapiens Portal Custom Integration
// This script will be loaded in the portal via the PORTAL_JS_EXTRA config
$(document).ready(function() {
  console.log("NetSapiens Custom Script Loaded");
  
  // Store our JWT token
  const JWT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJucyIsImV4cCI6MTc0MDc4NDkwOCwiaWF0IjoxNzQwNjk4NTA4LCJpc3MiOiJ2b2lwLmJyaWdodGVyLnRlbCIsImp0aSI6IjY0OTIzYWM2MjZlZmRlNjUwZDFmMTUxZTEzYWNiNGJjYjI4YzE3ODIiLCJzdWIiOiI5OTlAYnJpZ2h0ZXJ0ZWwiLCJ0aW1lX291dCI6ODY0MDAwMDAsImRvbWFpbiI6ImJyaWdodGVydGVsIiwidGVycml0b3J5IjoiYnJpZ2h0ZXJ0ZWwiLCJ1c2VyIjoiOTk5IiwidXNlcl9lbWFpbCI6InphY2tAYnJpZ2h0ZXIudGVsIiwidXNlcl9zY29wZSI6IlJlc2VsbGVyIiwiZGlzcGxheU5hbWUiOiJBUEkgVXNlciIsIm1hc2tfY2hhaW4iOm51bGwsImRlcGFydG1lbnQiOiIiLCJsb2dpbiI6Ijk5OUBicmlnaHRlcnRlbCJ9.65Y721fx0r8osBDvW1GHBXAs-4A81TgeX5rRQuDLsxo"
  
  // Parse JWT and extract payload
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  }
  
  // Create UI container for our tools
  function createCustomUI() {
    // Check if our container already exists
    if ($('#synapsiens-container').length > 0) {
      return;
    }
    
    // Create a styled container for our tools
    const container = `
      <div id="synapsiens-container" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #4285f4;
        border-radius: 50%;
        color: white;
        text-align: center;
        line-height: 50px;
        font-size: 24px;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      ">+</div>
      
      <div id="synapsiens-panel" style="
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 350px;
        max-height: 600px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        display: none;
        overflow: auto;
        padding: 15px;
      ">
        <h3 style="margin-top: 0; color: #4285f4;">Synapsiens Tools</h3>
        
        <div id="jwt-info-section">
          <h4>JWT Token Info</h4>
          <div id="jwt-info" style="
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            overflow: auto;
            max-height: 150px;
          "></div>
        </div>
        
        <div id="api-test-section" style="margin-top: 15px;">
          <h4>API Tests</h4>
          <button id="test-domains-btn" class="api-btn" style="
            background-color: #4285f4;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            margin-right: 5px;
            cursor: pointer;
          ">Test Domains</button>
          
          <button id="test-users-btn" class="api-btn" style="
            background-color: #4285f4;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            margin-right: 5px;
            cursor: pointer;
          ">Test Users</button>
          
          <button id="test-sms-btn" class="api-btn" style="
            background-color: #4285f4;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
          ">Test SMS</button>
          
          <div id="api-results" style="
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
            font-family: monospace;
            font-size: 12px;
            overflow: auto;
            max-height: 150px;
          "></div>
        </div>
        
        <div id="globals-section" style="margin-top: 15px;">
          <h4>Portal Globals</h4>
          <button id="explore-globals-btn" style="
            background-color: #4285f4;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
          ">Explore Globals</button>
          <div id="globals-results" style="
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
            font-family: monospace;
            font-size: 12px;
            overflow: auto;
            max-height: 150px;
          "></div>
        </div>
      </div>
    `;
    
    // Add to body
    $('body').append(container);
    
    // Toggle panel visibility
    $('#synapsiens-container').on('click', function() {
      $('#synapsiens-panel').toggle();
      $(this).text($(this).text() === '+' ? '×' : '+');
    });
    
    // Display JWT info automatically
    displayJwtInfo();
    
    // Add button event listeners
    $('#test-domains-btn').on('click', function() {
      testApiEndpoint('/domains', 'Domains API');
    });
    
    $('#test-users-btn').on('click', function() {
      testApiEndpoint('/users', 'Users API');
    });
    
    $('#test-sms-btn').on('click', function() {
      testApiEndpoint('/sms/outbound', 'SMS API');
    });
    
    $('#explore-globals-btn').on('click', function() {
      exploreGlobals();
    });
  }
  
  // Display the decoded JWT information
  function displayJwtInfo() {
    const jwtPayload = parseJwt(JWT_TOKEN);
    if (jwtPayload) {
      $('#jwt-info').html(prettyPrintJson(jwtPayload));
    } else {
      $('#jwt-info').html('Invalid JWT token');
    }
  }
  
  // Test an API endpoint with the JWT token
  function testApiEndpoint(endpoint, name) {
    const apiUrl = `https://voip.brighter.tel/ns-api/v2${endpoint}`;
    $('#api-results').html(`Testing ${name} (${apiUrl})...`);
    
    $.ajax({
      url: apiUrl,
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      success: function(data) {
        $('#api-results').html(`<div>${name} Success:</div>${prettyPrintJson(data)}`);
      },
      error: function(xhr, status, error) {
        let errorMessage = `${name} Error (${xhr.status}): ${error}`;
        
        try {
          if (xhr.responseText) {
            const errorResponse = JSON.parse(xhr.responseText);
            errorMessage += '<br>' + prettyPrintJson(errorResponse);
          }
        } catch (e) {
          errorMessage += '<br>Response: ' + xhr.responseText;
        }
        
        $('#api-results').html(errorMessage);
      }
    });
  }
  
  // Format JSON for display
  function prettyPrintJson(obj) {
    return JSON.stringify(obj, null, 2)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key';
            match = '<span style="color:#0062cc;">' + match + '</span>';
          } else {
            cls = 'json-string';
            match = '<span style="color:#008000;">' + match + '</span>';
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
          match = '<span style="color:#0000ff;">' + match + '</span>';
        } else if (/null/.test(match)) {
          cls = 'json-null';
          match = '<span style="color:#a6a6a6;">' + match + '</span>';
        } else {
          match = '<span style="color:#ff4500;">' + match + '</span>';
        }
        return match;
      })
      .replace(/\n/g, '<br>')
      .replace(/\s{2}/g, '&nbsp;&nbsp;');
  }
  
  // Explore global variables in the portal
  function exploreGlobals() {
    const result = {
      window: {
        'NS': typeof window.NS !== 'undefined' ? 'Available' : 'Not available',
        '$': typeof window.$ !== 'undefined' ? 'jQuery available' : 'jQuery not available',
        'jQuery': typeof window.jQuery !== 'undefined' ? 'jQuery available' : 'jQuery not available',
        'angular': typeof window.angular !== 'undefined' ? 'Angular available' : 'Angular not available',
        'React': typeof window.React !== 'undefined' ? 'React available' : 'React not available',
        'Vue': typeof window.Vue !== 'undefined' ? 'Vue available' : 'Vue not available',
        'apiEndpoints': typeof window.apiEndpoints !== 'undefined' ? 'Available' : 'Not available',
        'user': typeof window.user !== 'undefined' ? window.user : 'Not available',
        'domain': typeof window.domain !== 'undefined' ? window.domain : 'Not available',
        'config': typeof window.config !== 'undefined' ? 'Available' : 'Not available',
        'portalVersion': typeof window.portalVersion !== 'undefined' ? window.portalVersion : 'Not available'
      },
      location: {
        href: window.location.href,
        host: window.location.host,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      }
    };
    
    // Check for any NS global object deeply
    if (typeof window.NS !== 'undefined') {
      result.NS_details = {};
      try {
        for (const key in window.NS) {
          if (typeof window.NS[key] === 'function') {
            result.NS_details[key] = 'Function';
          } else if (typeof window.NS[key] === 'object' && window.NS[key] !== null) {
            result.NS_details[key] = 'Object';
          } else {
            result.NS_details[key] = typeof window.NS[key];
          }
        }
      } catch (e) {
        result.NS_details.error = e.message;
      }
    }
    
    // Check for authorization/token in localStorage and sessionStorage
    result.auth = {
      localStorage: {},
      sessionStorage: {}
    };
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.toLowerCase().includes('token') || key.toLowerCase().includes('auth')) {
          result.auth.localStorage[key] = '[STORED VALUE]';
        }
      }
      
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key.toLowerCase().includes('token') || key.toLowerCase().includes('auth')) {
          result.auth.sessionStorage[key] = '[STORED VALUE]';
        }
      }
    } catch (e) {
      result.auth.error = e.message;
    }
    
    // If jQuery is available, check for hidden inputs
    if (typeof $ !== 'undefined') {
      result.hiddenInputs = {};
      $('input[type="hidden"]').each(function() {
        const id = $(this).attr('id') || 'unnamed';
        const name = $(this).attr('name') || 'unnamed';
        result.hiddenInputs[`${id}_${name}`] = $(this).val();
      });
    }
    
    $('#globals-results').html(prettyPrintJson(result));
    console.log('=== EXPLORING NETSAPIENS GLOBALS ===');
    console.log('Global Environment Exploration Results:', result);
  }
  
  // Try to find active token in the application
  function findExistingToken() {
    let token = null;
    
    // Check localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.toLowerCase().includes('token') || key.toLowerCase().includes('auth')) {
        try {
          const value = localStorage.getItem(key);
          if (value && value.includes('.') && value.split('.').length === 3) {
            token = value;
            console.log('Found token in localStorage:', key);
            break;
          }
        } catch (e) {}
      }
    }
    
    // Check sessionStorage if not found in localStorage
    if (!token) {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key.toLowerCase().includes('token') || key.toLowerCase().includes('auth')) {
          try {
            const value = sessionStorage.getItem(key);
            if (value && value.includes('.') && value.split('.').length === 3) {
              token = value;
              console.log('Found token in sessionStorage:', key);
              break;
            }
          } catch (e) {}
        }
      }
    }
    
    return token;
  }
  
  // Add a custom tab to the portal navigation
  function addSynapsiensTab() {
    // Find an existing tab to clone
    const existingTab = $('#nav-music');
    if (existingTab.length === 0) {
      console.log('Could not find existing tab to clone');
      return;
    }
    
    // Clone the tab and modify it
    const newTab = existingTab.clone();
    newTab.attr('id', 'nav-synapsiens');
    newTab.find('.nav-text').html("Synapsiens");
    newTab.find('.nav-bg-image').attr("style", "background-position: 0;background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzQyODVmNCIgZD0iTTIwLDhIMTdWNWEzLDMgMCAwLDAtMy0zSDRhMywzIDAgMCwwLTMsM3YxNGEzLDMgMCAwLDAsMywzaDEzYTMsMyAwIDAgMCwzLTN2LTNoM2ExLDEgMCAwLDAsMS0xVjlhMSwxIDAgMCwwLTEtMVptLTIsMTBhMSwxIDAgMCwxLTEsMUg0YTEsMSAwIDAsMS0xLTFWNWExLDEgMCAwLDEsMS0xSDEzYTEsMSAwIDAsMS0xLDFoMnYyaC0zYTEsMSAwIDAsMS0xLTFIN0ExLDEgMCAwLDEsNyw2aDNhMywzIDAgMCwwLDMsM2gydjJINWExLDEgMCAwLDAsMCwyaHVMMTgsMTNabTIsMVYxMGguMWwtLjEtLjF2LS45SDIwdjguOVpNMTEsMWwwLjcxLDJoMi41OGwwLjcxLDJIMTF2MTBhMSwxIDAgMCwxLTEsMUgzYTEsMSAwIDAsMS0xLTFWM2ExLDEgMCAwLDEsMS0xaDF2NGExLDEgMCAwLDAsMSwxaDF2LTRhMSwxIDAgMCwwLTEtMWgxWiIvPjwvc3ZnPg==')");
    
    // Add the tab to the navigation
    newTab.appendTo($('#nav-buttons'));
    
    // Add click handler for the tab
    newTab.find('a').click(function(e) {
      e.preventDefault();
      $("#nav-buttons li").removeClass("nav-link-current");
      newTab.addClass("nav-link-current");
      $('.navigation-title').html("Synapsiens SMS");
      
      // Create the tab content
      const content = `
        <div style="padding: 20px;">
          <h2>Synapsiens SMS Management</h2>
          <p>Welcome to the Synapsiens SMS Management console. This custom tab demonstrates integration with the NetSapiens portal.</p>
          
          <div style="display: flex; margin-top: 20px;">
            <div style="flex: 1; background: #f5f5f5; padding: 15px; border-radius: 8px; margin-right: 10px;">
              <h3>JWT Token Information</h3>
              <div id="tab-jwt-info" style="font-family: monospace; font-size: 12px; margin-top: 10px; overflow: auto; max-height: 200px;"></div>
            </div>
            
            <div style="flex: 1; background: #f5f5f5; padding: 15px; border-radius: 8px;">
              <h3>API Testing</h3>
              <div style="margin: 10px 0;">
                <button id="tab-test-domains" class="btn btn-primary">Test Domains API</button>
                <button id="tab-test-users" class="btn btn-primary" style="margin-left: 10px;">Test Users API</button>
                <button id="tab-test-sms" class="btn btn-primary" style="margin-left: 10px;">Test SMS API</button>
              </div>
              <div id="tab-api-results" style="font-family: monospace; font-size: 12px; margin-top: 10px; overflow: auto; max-height: 200px;"></div>
            </div>
          </div>
          
          <div style="margin-top: 20px; background: #f5f5f5; padding: 15px; border-radius: 8px;">
            <h3>Portal Environment</h3>
            <button id="tab-explore-globals" class="btn btn-primary">Explore Portal Environment</button>
            <div id="tab-globals-results" style="font-family: monospace; font-size: 12px; margin-top: 10px; overflow: auto; max-height: 200px;"></div>
          </div>
        </div>
      `;
      
      // Set the content
      $('#content').html(content);
      
      // Initialize the tab content
      $('#tab-jwt-info').html(prettyPrintJson(parseJwt(JWT_TOKEN)));
      
      // Add event listeners
      $('#tab-test-domains').on('click', function() {
        testApiEndpoint('/domains', 'Domains API');
        $('#tab-api-results').html($('#api-results').html());
      });
      
      $('#tab-test-users').on('click', function() {
        testApiEndpoint('/users', 'Users API');
        $('#tab-api-results').html($('#api-results').html());
      });
      
      $('#tab-test-sms').on('click', function() {
        testApiEndpoint('/sms/outbound', 'SMS API');
        $('#tab-api-results').html($('#api-results').html());
      });
      
      $('#tab-explore-globals').on('click', function() {
        exploreGlobals();
        $('#tab-globals-results').html($('#globals-results').html());
      });
      
      return false;
    });
  }
  
  // Initialize our custom UI
  setTimeout(function() {
    createCustomUI();
    addSynapsiensTab();
    
    // Try an API call when loaded
    console.log('=== TESTING API ACCESS WITH JWT TOKEN ===');
    $.ajax({
      url: 'https://voip.brighter.tel/ns-api/v2/domains',
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      success: function(data) {
        console.log('API Response Success:', data);
      },
      error: function(xhr, status, error) {
        console.log('API Response Status:', xhr.status);
        try {
          console.log('API Response Data:', JSON.parse(xhr.responseText));
        } catch (e) {
          console.log('API Response Text:', xhr.responseText);
        }
      }
    });
  }, 1500);
});
