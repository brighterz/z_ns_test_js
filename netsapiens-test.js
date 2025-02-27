
// NetSapiens Portal Inspector
(function() {
  console.log("NetSapiens Portal Inspector loaded");
  
  // Basic user info we already know about
  const userInfo = {
    user: document.querySelector('#user-id') ? document.querySelector('#user-id').textContent.trim() : '',
    domain: document.querySelector('.domain') ? document.querySelector('.domain').textContent.trim() : '',
    email: document.querySelector('.email') ? document.querySelector('.email').textContent.trim() : '',
    scope: document.querySelector('.scope') ? document.querySelector('.scope').textContent.trim() : ''
  };
  
  console.log("Current User Information:", userInfo);
  
  // Helper to safely inspect objects
  function safeInspect(obj, name) {
    try {
      if (!obj) return `${name}: Not available`;
      
      const props = Object.getOwnPropertyNames(obj)
        .filter(prop => typeof obj[prop] !== 'function')
        .reduce((acc, prop) => {
          try {
            acc[prop] = obj[prop];
          } catch (e) {
            acc[prop] = "Error accessing property";
          }
          return acc;
        }, {});
      
      console.log(`Inspecting ${name}:`, props);
      return props;
    } catch (e) {
      console.error(`Error inspecting ${name}:`, e);
      return `Error inspecting ${name}`;
    }
  }
  
  // Create a UI element to show inspection results
  function createInspectorUI() {
    const inspectorDiv = document.createElement('div');
    inspectorDiv.id = 'ns-inspector';
    inspectorDiv.style.position = 'fixed';
    inspectorDiv.style.bottom = '10px';
    inspectorDiv.style.right = '10px';
    inspectorDiv.style.backgroundColor = '#fff';
    inspectorDiv.style.border = '1px solid #ccc';
    inspectorDiv.style.padding = '10px';
    inspectorDiv.style.zIndex = '9999';
    inspectorDiv.style.maxHeight = '300px';
    inspectorDiv.style.maxWidth = '400px';
    inspectorDiv.style.overflow = 'auto';
    inspectorDiv.innerHTML = `
      <h3 style="margin-top: 0;">NetSapiens Inspector</h3>
      <div>
        <button id="inspect-global">Inspect Globals</button>
        <button id="inspect-api">Inspect API</button>
        <button id="inspect-ui">Inspect UI</button>
        <button id="inspect-tabs">Available Tabs</button>
      </div>
      <div id="inspector-results" style="margin-top: 10px; font-size: 12px;"></div>
    `;
    document.body.appendChild(inspectorDiv);
    
    // Add event listeners
    document.getElementById('inspect-global').addEventListener('click', inspectGlobals);
    document.getElementById('inspect-api').addEventListener('click', inspectAPI);
    document.getElementById('inspect-ui').addEventListener('click', inspectUI);
    document.getElementById('inspect-tabs').addEventListener('click', inspectTabs);
  }
  
  // Inspect global objects
  function inspectGlobals() {
    const results = document.getElementById('inspector-results');
    results.innerHTML = '<h4>Inspecting Global Objects...</h4>';
    
    // Look for NetSapiens global objects
    const nsObjects = {};
    for (const key in window) {
      if (key.includes('ns') || key.includes('NS') || key.includes('Net') || key.includes('portal')) {
        nsObjects[key] = safeInspect(window[key], key);
      }
    }
    
    results.innerHTML += `<pre>${JSON.stringify(nsObjects, null, 2)}</pre>`;
  }
  
  // Inspect API endpoints
  function inspectAPI() {
    const results = document.getElementById('inspector-results');
    results.innerHTML = '<h4>Inspecting API Endpoints...</h4>';
    
    // Check for API objects or namespaces
    const apiObjects = {};
    
    // Common API patterns to check
    ['api', 'API', 'nsAPI', 'nsapi', 'ns-api', 'portal.api', 'NS.api'].forEach(apiName => {
      const parts = apiName.split('.');
      let obj = window;
      let found = true;
      
      for (const part of parts) {
        if (obj && obj[part]) {
          obj = obj[part];
        } else {
          found = false;
          break;
        }
      }
      
      if (found) {
        apiObjects[apiName] = safeInspect(obj, apiName);
      }
    });
    
    // Look for XHR requests in Network tab
    results.innerHTML += `<p>API objects found: ${Object.keys(apiObjects).length}</p>`;
    results.innerHTML += `<pre>${JSON.stringify(apiObjects, null, 2)}</pre>`;
    results.innerHTML += `<p>Note: Check browser Network tab for actual API calls</p>`;
  }
  
  // Inspect UI components
  function inspectUI() {
    const results = document.getElementById('inspector-results');
    results.innerHTML = '<h4>Inspecting UI Components...</h4>';
    
    // Check for common UI elements
    const navItems = document.querySelectorAll('.nav-item, .nav-link, .menu-item');
    const uiComponents = {
      navItems: Array.from(navItems).map(el => ({
        text: el.textContent.trim(),
        id: el.id,
        classes: el.className,
        href: el.href || ''
      }))
    };
    
    results.innerHTML += `<pre>${JSON.stringify(uiComponents, null, 2)}</pre>`;
  }
  
  // Inspect available tabs
  function inspectTabs() {
    const results = document.getElementById('inspector-results');
    results.innerHTML = '<h4>Inspecting Available Tabs...</h4>';
    
    // Look for tab elements
    const tabElements = document.querySelectorAll('.tab, .nav-item, [role="tab"], .tab-button');
    const tabs = Array.from(tabElements).map(el => ({
      text: el.textContent.trim(),
      id: el.id,
      classes: el.className
    }));
    
    // Also check if there's a global tabs object
    let globalTabs = null;
    ['tabs', 'Tabs', 'nsTabs', 'portal.tabs'].forEach(tabName => {
      const parts = tabName.split('.');
      let obj = window;
      let found = true;
      
      for (const part of parts) {
        if (obj && obj[part]) {
          obj = obj[part];
          found = true;
        } else {
          found = false;
          break;
        }
      }
      
      if (found) {
        globalTabs = safeInspect(obj, tabName);
      }
    });
    
    results.innerHTML += `<h5>Tab Elements:</h5><pre>${JSON.stringify(tabs, null, 2)}</pre>`;
    if (globalTabs) {
      results.innerHTML += `<h5>Global Tabs Object:</h5><pre>${JSON.stringify(globalTabs, null, 2)}</pre>`;
    }
  }
  
  // Add a function to explore available APIs
  function exploreAPIs() {
    // Looking at the structure from your screenshots
    const apiPaths = [
      'ns-api.authenticate',
      'ns-api.getDialPlan',
      'ns-api.getDialRule',
      'ns-api.getTranscriptionIntelligence',
      'ns-api.getTranscriptions',
      'ns-api.postAnswerRule',
      'ns-api.postDialRule',
      'ns-api.saveAudio',
      'voice-api.getLanguages',
      'voice-api.getVoices',
      'voice-api.synthesize'
    ];
    
    console.log("Exploring API endpoints...");
    const apiResults = {};
    
    apiPaths.forEach(path => {
      const parts = path.split('.');
      let obj = window;
      let found = true;
      
      for (const part of parts) {
        if (obj && obj[part]) {
          obj = obj[part];
        } else {
          found = false;
          break;
        }
      }
      
      if (found) {
        apiResults[path] = typeof obj;
        console.log(`Found API: ${path} (${typeof obj})`);
      }
    });
    
    console.log("API exploration results:", apiResults);
  }
  
  // Run initial exploration after a delay to let page fully load
  setTimeout(() => {
    console.log("Running initial exploration...");
    exploreAPIs();
    createInspectorUI();
    
    // Add a test button to the page
    const testButton = document.createElement('button');
    testButton.textContent = 'Inspect NetSapiens';
    testButton.style.position = 'fixed';
    testButton.style.top = '10px';
    testButton.style.right = '10px';
    testButton.style.zIndex = '9999';
    testButton.addEventListener('click', () => {
      document.getElementById('ns-inspector').style.display = 
        document.getElementById('ns-inspector').style.display === 'none' ? 'block' : 'none';
    });
    document.body.appendChild(testButton);
  }, 2000);
})();
