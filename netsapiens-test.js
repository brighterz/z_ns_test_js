$(document).ready(function() {
  // Add Integrations button to header if it doesn't exist
  if ($('#integrations-toolbar').length === 0) {
    // Find the user toolbar to insert our integrations button
    const userToolbar = $('.user-toolbar');
    if (userToolbar.length) {
      // Create and insert the integrations toolbar button
      const integrationsButton = `
        <li id="integrations-toolbar">
          <i class="icon icon-th" style="margin-right: 4px;"></i>
          <a class="header-link" role="button" tabindex="-1" style="outline: none;">
            Integrations
          </a>
        </li>`;
      userToolbar.prepend(integrationsButton);
      
      // Add click handler for the integrations button
      $('#integrations-toolbar').click(function(e) {
        e.preventDefault();
        $('#integrationsModal').modal('show');
      });
      
      // Add the integrations modal HTML to the page (using the correct modal structure)
      $('body').append(`
        <div class="modal fade modal-iotum-status" id="integrationsModal" tabindex="-1" role="dialog" aria-labelledby="integrationsModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header-iotum-status">
                <h3 class="modal-title" id="integrationsModalLabel">
                  Available Integrations
                </h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body-iotum-status">
                <div class="row">
                  <div class="col-md-6">
                    <div class="integration-card-container" style="border: 1px solid #ddd; border-radius: 5px; margin-bottom: 20px; padding: 15px;">
                      <div class="integration-card-logo-container" style="text-align: center; margin-bottom: 15px;">
                        <img class="integration-card-logo" src="https://cdn.zapier.com/zapier/images/logos/zapier-logo.png" alt="Zapier" style="max-height: 50px;">
                      </div>
                      <div class="integration-card-title-container" style="text-align: center;">
                        <h4 class="integration-card-title">Zapier</h4>
                      </div>
                      <div class="integration-card-description" style="text-align: center; margin: 10px 0;">
                        <p>Connect your SMS platform with 5000+ apps without any code.</p>
                      </div>
                      <div class="integration-card-status" style="text-align: center; margin-top: 15px;">
                        <a href="https://zapier.com" target="_blank" class="btn btn-primary">Connect</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="integration-card-container" style="border: 1px solid #ddd; border-radius: 5px; margin-bottom: 20px; padding: 15px;">
                      <div class="integration-card-logo-container" style="text-align: center; margin-bottom: 15px;">
                        <img class="integration-card-logo" src="https://www.make.com/_nuxt/img/make-logo.c28a906.svg" alt="Make.com" style="max-height: 50px;">
                      </div>
                      <div class="integration-card-title-container" style="text-align: center;">
                        <h4 class="integration-card-title">Make.com</h4>
                      </div>
                      <div class="integration-card-description" style="text-align: center; margin: 10px 0;">
                        <p>Build automated workflows with your SMS messaging system.</p>
                      </div>
                      <div class="integration-card-status" style="text-align: center; margin-top: 15px;">
                        <a href="https://make.com" target="_blank" class="btn btn-primary">Connect</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer-iotum-status">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `);
      
      // Add modal for Opt-In details
      $('body').append(`
        <div class="modal fade modal-iotum-status" id="optInDetailsModal" tabindex="-1" role="dialog" aria-labelledby="optInDetailsModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header-iotum-status">
                <h3 class="modal-title" id="optInDetailsModalLabel">
                  Opt-In Details
                </h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body-iotum-status">
                <div id="optInDetailsContent"></div>
              </div>
              <div class="modal-footer-iotum-status">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `);
      
      // Add Register Brand modal
      $('body').append(`
        <div class="modal fade modal-iotum-status" id="registerBrandModal" tabindex="-1" role="dialog" aria-labelledby="registerBrandModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header-iotum-status">
                <h3 class="modal-title" id="registerBrandModalLabel">
                  Register Brand
                </h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body-iotum-status">
                <!-- Step 1 Form -->
                <div id="registerBrandStep1">
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="legalFormType">Type of Legal Form *</label>
                      <select id="legalFormType" class="form-control">
                        <option>-- select an option --</option>
                        <option>Private Company</option>
                        <option>Publicly Traded Company</option>
                        <option>Non-Profit Organization</option>
                        <option>Government</option>
                        <option>Sole Proprietor</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="countryOfRegistration">Country of Registration *</label>
                      <select id="countryOfRegistration" class="form-control">
                        <option>-- select an option --</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Puerto Rico</option>
                      </select>
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="legalCompanyName">Legal Company Name *</label>
                      <input type="text" id="legalCompanyName" class="form-control">
                    </div>
                    <div class="col-md-6">
                      <label for="dbaBrandName">DBA or Brand Name (if different from Legal Name)</label>
                      <input type="text" id="dbaBrandName" class="form-control">
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="taxNumberIdCountry">Tax Number/ID/EIN Issuing Country</label>
                      <select id="taxNumberIdCountry" class="form-control">
                        <option>-- select an option --</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Puerto Rico</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="taxNumberEIN">Tax Number/ID/EIN *</label>
                      <input type="text" id="taxNumberEIN" class="form-control" placeholder="XX-XXXXXXX">
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="alternativeBusinessIdentifier">Alternative Business Identifier Type</label>
                      <select id="alternativeBusinessIdentifier" class="form-control">
                        <option>-- select an option --</option>
                        <option>DUNS</option>
                        <option>GIIN</option>
                        <option>LEI</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="alternativeBusinessNumber">DUNS or GIIN or LEI Number</label>
                      <input type="text" id="alternativeBusinessNumber" class="form-control">
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="verticalType">Vertical Type *</label>
                      <select id="verticalType" class="form-control">
                        <option>-- select an option --</option>
                        <option>Agriculture</option>
                        <option>Construction, Materials, and Trade Services</option>
                        <option>Education</option>
                        <option>Energy and Utilities</option>
                        <option>Entertainment</option>
                        <option>Financial Services</option>
                        <option>Gambling and Lottery</option>
                        <option>Government Services and Agencies</option>
                        <option>Healthcare and Life Sciences</option>
                        <option>Hospitality and Travel</option>
                        <option>HR, Staffing, and Recruitment</option>
                        <option>Information Technology Services</option>
                        <option>Insurance</option>
                        <option>Legal</option>
                        <option>Manufacturing</option>
                        <option>Media and Communications</option>
                        <option>Non-Profit Organization</option>
                        <option>Political</option>
                        <option>Postal and Delivery</option>
                        <option>Professional Services</option>
                        <option>Real Estate</option>
                        <option>Retail and Consumer Products</option>
                        <option>Transportation and Logistics</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="referenceId">Reference ID</label>
                      <input type="text" id="referenceId" class="form-control">
                    </div>
                  </div>
                </div>
                
                <!-- Step 2 Form -->
                <div id="registerBrandStep2" style="display: none;">
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="firstName">First Name *</label>
                      <input type="text" id="firstName" class="form-control">
                    </div>
                    <div class="col-md-6">
                      <label for="lastName">Last Name *</label>
                      <input type="text" id="lastName" class="form-control">
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="email">Email *</label>
                      <input type="email" id="email" class="form-control">
                    </div>
                    <div class="col-md-6">
                      <label for="phoneNumber">Phone Number *</label>
                      <input type="text" id="phoneNumber" class="form-control" placeholder="+00000000000">
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="address">Address / Street *</label>
                      <input type="text" id="address" class="form-control">
                    </div>
                    <div class="col-md-6">
                      <label for="city">City *</label>
                      <input type="text" id="city" class="form-control">
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="state">State / Region *</label>
                      <input type="text" id="state" class="form-control">
                    </div>
                    <div class="col-md-6">
                      <label for="postalCode">Postal Code/ZIP Code *</label>
                      <input type="text" id="postalCode" class="form-control" placeholder="00000-0000">
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="website">Website *</label>
                      <input type="url" id="website" class="form-control">
                    </div>
                    <div class="col-md-6">
                      <label for="domain">Domain *</label>
                      <input type="text" id="domain" class="form-control" placeholder="Enter a domain name">
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 15px;">
                    <div class="col-md-6">
                      <label for="stockExchange">Stock Exchange</label>
                      <select id="stockExchange" class="form-control">
                        <option>-- select an option --</option>
                        <option>NYSE</option>
                        <option>NASDAQ</option>
                        <option>TSX</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="stockSymbol">Stock Symbol</label>
                      <input type="text" id="stockSymbol" class="form-control">
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer-iotum-status">
                <div id="registerBrandStep1Buttons">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-primary" id="registerBrandNextBtn">Next</button>
                </div>
                <div id="registerBrandStep2Buttons" style="display: none;">
                  <button type="button" class="btn btn-default" id="registerBrandPrevBtn">Previous</button>
                  <button type="button" class="btn btn-primary" id="registerBrandSubmitBtn">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
    }
  }

  // Only run SMS tab code if we're not already on the SMS tab
  if (window.location.pathname.indexOf('/portal/sms') === -1) {
    // Add SMS button to main navigation if it doesn't exist
    if ($('#nav-sms').length === 0) {
      let smsNavButton = `
        <li id="nav-sms" class="">
          <a href="#" class="nav-link" id="LinkSMSIndex">
            <div class="nav-button btn"></div>
            <div class="nav-bg-image" style="background-position: -75px 0;"></div>
            <span class="nav-text">SMS</span>
            <div class="nav-arrow"></div>
          </a>
        </li>`;
      $('#nav-buttons').append(smsNavButton);
    }

    // Handle click on SMS nav button
    $(document).on('click', '#nav-sms a', function(e) {
      e.preventDefault();
      
      // Remove current class from all nav buttons and add to SMS
      $("#nav-buttons li").removeClass("nav-link-current");
      $(this).parent().addClass("nav-link-current");
      
      // Update the navigation title
      $('.navigation-title').html("SMS");
      
      // Load SMS content
      loadSMSContent();
      
      return false;
    });
  }

  // Show opt-in details when a details button is clicked
  $(document).on('click', '.show-details-btn', function() {
    const detailsContent = $(this).data('details');
    $('#optInDetailsContent').html(detailsContent);
    $('#optInDetailsModal').modal('show');
  });
  
  // Handle Register Brand button click
  $(document).on('click', '#registerBrandBtn', function() {
    $('#registerBrandModal').modal('show');
    currentRegisterStep = 1;
    showRegisterBrandStep(1);
    
    // Add custom styles for the brand registration modal if not already added
    if (!$('#brandRegistrationStyles').length) {
      $('head').append(`
        <style id="brandRegistrationStyles">
          #registerBrandModal .modal-dialog {
            max-width: 90%;
            width: auto;
            margin: 30px auto;
          }
          #registerBrandModal .modal-content {
            border-radius: 5px;
          }
          #registerBrandModal .modal-body-iotum-status {
            padding: 20px;
            max-height: calc(100vh - 200px);
            overflow-y: auto;
          }
          #registerBrandModal label {
            font-weight: 500;
          }
          #registerBrandModal .form-control {
            border-radius: 3px;
          }
          #registerBrandModal .row {
            margin-left: -10px;
            margin-right: -10px;
          }
          #registerBrandModal .col-md-6 {
            padding-left: 10px;
            padding-right: 10px;
          }
          @media (max-width: 768px) {
            #registerBrandModal .modal-dialog {
              max-width: 95%;
              margin: 10px auto;
            }
          }
        </style>
      `);
    }
  });
  
  // Handle form navigation
  $(document).on('click', '#registerBrandNextBtn', function() {
    if (validateRegisterBrandStep(1)) {
      showRegisterBrandStep(2);
    }
  });
  
  $(document).on('click', '#registerBrandPrevBtn', function() {
    showRegisterBrandStep(1);
  });
  
  $(document).on('click', '#registerBrandSubmitBtn', function() {
    if (validateRegisterBrandStep(2)) {
      // Here you would typically submit the data to your backend
      alert('Brand registration submitted successfully!');
      $('#registerBrandModal').modal('hide');
      // Optionally refresh the brands list
    }
  });
  
  // EIN validation
  $(document).on('input', '#taxNumberEIN', function() {
    let value = $(this).val().replace(/[^\d]/g, '');
    if (value.length > 9) {
      value = value.substring(0, 9);
    }
    if (value.length > 2) {
      value = value.substring(0, 2) + '-' + value.substring(2);
    }
    $(this).val(value);
    
    // Remove error styling on input
    $(this).parent().removeClass('has-error');
    $(this).next('.validation-error').remove();
  });
  
  // Remove validation errors when input changes
  $(document).on('change input', '#registerBrandModal input, #registerBrandModal select', function() {
    $(this).parent().removeClass('has-error');
    $(this).next('.validation-error').remove();
  });
  
  // Add form field styling
  $('head').append(`
    <style>
      .has-error .form-control {
        border-color: #a94442;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      }
      .has-error .form-control:focus {
        border-color: #843534;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 6px #ce8483;
      }
      .validation-error {
        display: block;
        margin-top: 5px;
        margin-bottom: 10px;
      }
      #registerBrandModal .form-control:focus {
        border-color: #00b0f0;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(0, 176, 240, .6);
      }
    </style>
  `);
  
  // Variables to track the current form step
  let currentRegisterStep = 1;
  
  function showRegisterBrandStep(step) {
    currentRegisterStep = step;
    
    // Clear validation errors when switching steps
    $('.validation-error').remove();
    $('.has-error').removeClass('has-error');
    
    if (step === 1) {
      $('#registerBrandStep2').fadeOut(200, function() {
        $('#registerBrandStep1').fadeIn(200);
        $('#registerBrandStep1Buttons').show();
        $('#registerBrandStep2Buttons').hide();
        
        // Update progress indicator if we add one later
        $('#registerBrandModal').scrollTop(0);
      });
    } else {
      $('#registerBrandStep1').fadeOut(200, function() {
        $('#registerBrandStep2').fadeIn(200);
        $('#registerBrandStep1Buttons').hide();
        $('#registerBrandStep2Buttons').show();
        
        // Update progress indicator if we add one later
        $('#registerBrandModal').scrollTop(0);
      });
    }
  }
  
  function validateRegisterBrandStep(step) {
    // Clear previous validation messages
    $('.validation-error').remove();
    $('.has-error').removeClass('has-error');
    
    if (step === 1) {
      // Validate required fields for step 1
      const legalFormType = $('#legalFormType').val();
      const countryOfRegistration = $('#countryOfRegistration').val();
      const legalCompanyName = $('#legalCompanyName').val().trim();
      const taxNumberEIN = $('#taxNumberEIN').val().trim();
      const verticalType = $('#verticalType').val();
      let isValid = true;
      
      if (!legalFormType || legalFormType === '-- select an option --') {
        $('#legalFormType').parent().addClass('has-error');
        $('#legalFormType').after('<span class="validation-error" style="color: red; font-size: 12px;">Please select a Type of Legal Form</span>');
        isValid = false;
      }
      
      if (!countryOfRegistration || countryOfRegistration === '-- select an option --') {
        $('#countryOfRegistration').parent().addClass('has-error');
        $('#countryOfRegistration').after('<span class="validation-error" style="color: red; font-size: 12px;">Please select a Country of Registration</span>');
        isValid = false;
      }
      
      if (!legalCompanyName) {
        $('#legalCompanyName').parent().addClass('has-error');
        $('#legalCompanyName').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a Legal Company Name</span>');
        isValid = false;
      }
      
      if (!taxNumberEIN || !taxNumberEIN.match(/^\d{2}-\d{7}$/)) {
        $('#taxNumberEIN').parent().addClass('has-error');
        $('#taxNumberEIN').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a valid Tax Number/ID/EIN (format: XX-XXXXXXX)</span>');
        isValid = false;
      }
      
      if (!verticalType || verticalType === '-- select an option --') {
        $('#verticalType').parent().addClass('has-error');
        $('#verticalType').after('<span class="validation-error" style="color: red; font-size: 12px;">Please select a Vertical Type</span>');
        isValid = false;
      }
      
      return isValid;
    } else if (step === 2) {
      // Validate required fields for step 2
      const firstName = $('#firstName').val().trim();
      const lastName = $('#lastName').val().trim();
      const email = $('#email').val().trim();
      const phoneNumber = $('#phoneNumber').val().trim();
      const address = $('#address').val().trim();
      const city = $('#city').val().trim();
      const state = $('#state').val().trim();
      const postalCode = $('#postalCode').val().trim();
      const website = $('#website').val().trim();
      const domain = $('#domain').val().trim();
      let isValid = true;
      
      if (!firstName) {
        $('#firstName').parent().addClass('has-error');
        $('#firstName').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a First Name</span>');
        isValid = false;
      }
      
      if (!lastName) {
        $('#lastName').parent().addClass('has-error');
        $('#lastName').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a Last Name</span>');
        isValid = false;
      }
      
      if (!email || !isValidEmail(email)) {
        $('#email').parent().addClass('has-error');
        $('#email').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a valid Email</span>');
        isValid = false;
      }
      
      if (!phoneNumber) {
        $('#phoneNumber').parent().addClass('has-error');
        $('#phoneNumber').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a Phone Number</span>');
        isValid = false;
      }
      
      if (!address) {
        $('#address').parent().addClass('has-error');
        $('#address').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter an Address</span>');
        isValid = false;
      }
      
      if (!city) {
        $('#city').parent().addClass('has-error');
        $('#city').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a City</span>');
        isValid = false;
      }
      
      if (!state) {
        $('#state').parent().addClass('has-error');
        $('#state').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a State/Region</span>');
        isValid = false;
      }
      
      if (!postalCode) {
        $('#postalCode').parent().addClass('has-error');
        $('#postalCode').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a Postal Code/ZIP Code</span>');
        isValid = false;
      }
      
      if (!website) {
        $('#website').parent().addClass('has-error');
        $('#website').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a Website</span>');
        isValid = false;
      }
      
      if (!domain) {
        $('#domain').parent().addClass('has-error');
        $('#domain').after('<span class="validation-error" style="color: red; font-size: 12px;">Please enter a Domain</span>');
        isValid = false;
      }
      
      return isValid;
    }
    
    return false;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Toggle Register Brand modal footer buttons based on step
  function toggleRegisterBrandFooterButtons() {
    if (currentRegisterStep === 1) {
      $('#registerBrandStep1Buttons').show();
      $('#registerBrandStep2Buttons').hide();
    } else {
      $('#registerBrandStep1Buttons').hide();
      $('#registerBrandStep2Buttons').show();
    }
  }
  
  // Function to load SMS interface content
  function loadSMSContent() {
    // Main SMS container
    let smsContent = `
      <div id="sms-content">
        <div class="sms-header">
          <h1 style="color: #00b0f0; font-size: 28px; margin-bottom: 20px;">SMS</h1>
        </div>
        
        <!-- Main navigation tabs -->
        <div class="sms-nav-tabs">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#inventory" aria-controls="inventory" role="tab" data-toggle="tab">Inventory</a></li>
            <li role="presentation"><a href="#conversations" aria-controls="conversations" role="tab" data-toggle="tab">Conversations</a></li>
            <li role="presentation"><a href="#history" aria-controls="history" role="tab" data-toggle="tab">History</a></li>
            <li role="presentation"><a href="#compliance" aria-controls="compliance" role="tab" data-toggle="tab">Compliance</a></li>
            <li role="presentation"><a href="#auto-responses" aria-controls="auto-responses" role="tab" data-toggle="tab">Auto-Responses</a></li>
          </ul>
        </div>
        
        <!-- Tab content -->
        <div class="tab-content">
          <!-- Inventory Tab -->
          <div role="tabpanel" class="tab-pane active" id="inventory">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="filters-section">
                  <h4>Filters</h4>
                  <div class="row">
                    <div class="col-md-8">
                      <!-- Filters could go here -->
                    </div>
                    <div class="col-md-4 text-right">
                      <button class="btn btn-default">Export</button>
                      <button class="btn btn-primary">Add SMS Number</button>
                    </div>
                  </div>
                </div>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>SMS Number</th>
                      <th>Treatment</th>
                      <th>Destination</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a href="#" style="color: #00b0f0;">(479) 845-8350</a></td>
                      <td>User</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td><a href="#" style="color: #00b0f0;">(479) 845-8355</a></td>
                      <td>User</td>
                      <td>100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- Conversations Tab -->
          <div role="tabpanel" class="tab-pane" id="conversations">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="filters-section">
                  <h4>Filters</h4>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="date-range-picker">
                        <input type="text" class="form-control" value="02/26/2025 12:00 am — 03/05/2025 11:59 pm" />
                      </div>
                    </div>
                    <div class="col-md-4 text-right">
                      <button class="btn btn-default">Export</button>
                    </div>
                  </div>
                </div>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Phone Number</th>
                      <th># of Messages</th>
                      <th>Most Recent Message</th>
                      <th>Date/Time</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a href="#" style="color: #00b0f0;">(479) 283-0327</a></td>
                      <td>12</td>
                      <td>Hey, just checking in about the meeting tomorrow...</td>
                      <td>Yesterday, 4:43 pm</td>
                      <td><i class="fa fa-comment-o" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                      <td><a href="#" style="color: #00b0f0;">(479) 845-8355</a></td>
                      <td>8</td>
                      <td>Thanks for the update. I'll review it and get back...</td>
                      <td>Yesterday, 2:32 pm</td>
                      <td><i class="fa fa-comment-o" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                      <td><a href="#" style="color: #00b0f0;">(479) 845-8350</a></td>
                      <td>5</td>
                      <td>Perfect, see you then!</td>
                      <td>Yesterday, 2:28 pm</td>
                      <td><i class="fa fa-comment-o" aria-hidden="true"></i></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- History Tab -->
          <div role="tabpanel" class="tab-pane" id="history">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="filters-section">
                  <h4>Filters</h4>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="date-range-picker">
                        <input type="text" class="form-control" value="02/26/2025 12:00 am — 03/05/2025 11:59 pm" />
                      </div>
                    </div>
                    <div class="col-md-4 text-right">
                      <button class="btn btn-default">Export</button>
                    </div>
                  </div>
                </div>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Date</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>100</td>
                      <td><a href="#" style="color: #00b0f0;">(479) 283-0327</a></td>
                      <td>Today, 10:03 AM</td>
                      <td>I'm on it</td>
                    </tr>
                    <tr>
                      <td><a href="#" style="color: #00b0f0;">(479) 283-0327</a></td>
                      <td>100</td>
                      <td>Today, 10:02 AM</td>
                      <td>I've got a problem</td>
                    </tr>
                    <tr>
                      <td>100</td>
                      <td><a href="#" style="color: #00b0f0;">(479) 845-8355</a></td>
                      <td>Today, 9:58 AM</td>
                      <td>Please review the latest changes</td>
                    </tr>
                    <tr>
                      <td><a href="#" style="color: #00b0f0;">(479) 845-8355</a></td>
                      <td>100</td>
                      <td>Today, 9:55 AM</td>
                      <td>Updates are ready for review</td>
                    </tr>
                    <tr>
                      <td>100</td>
                      <td><a href="#" style="color: #00b0f0;">(479) 845-8350</a></td>
                      <td>Today, 9:45 AM</td>
                      <td>Thanks for the confirmation</td>
                    </tr>
                    <tr>
                      <td><a href="#" style="color: #00b0f0;">(479) 845-8350</a></td>
                      <td>100</td>
                      <td>Today, 9:43 AM</td>
                      <td>Meeting confirmed for 2 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- Compliance Tab (formerly Registrations) -->
          <div role="tabpanel" class="tab-pane" id="compliance">
            <!-- Subtabs for Compliance -->
            <ul class="nav nav-tabs registration-tabs" role="tablist">
              <li role="presentation" class="active"><a href="#opt-ins" aria-controls="opt-ins" role="tab" data-toggle="tab">Opt-Ins</a></li>
              <li role="presentation"><a href="#brands" aria-controls="brands" role="tab" data-toggle="tab">Brands</a></li>
              <li role="presentation"><a href="#campaigns" aria-controls="campaigns" role="tab" data-toggle="tab">Campaigns</a></li>
              <li role="presentation"><a href="#help" aria-controls="help" role="tab" data-toggle="tab">Help</a></li>
            </ul>
            
            <!-- Subtab content -->
            <div class="tab-content">
              <!-- Opt-Ins Subtab (New) -->
              <div role="tabpanel" class="tab-pane active" id="opt-ins">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <div class="filters-section">
                      <h4>Filters</h4>
                      <div class="row">
                        <div class="col-md-8">
                          <div class="date-range-picker">
                            <input type="text" class="form-control" value="02/05/2025 12:00 am — 03/05/2025 11:59 pm" />
                          </div>
                        </div>
                        <div class="col-md-4 text-right">
                          <button class="btn btn-default">Export</button>
                        </div>
                      </div>
                    </div>
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Opt-In Status</th>
                          <th>Date</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 283-0327</a></td>
                          <td><span style="color: green;">✓</span> Yes</td>
                          <td>03/05/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-In received via web widget</strong></p><p>Customer accepted terms and conditions via the website opt-in form.</p>">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 845-8355</a></td>
                          <td><span style="color: green;">✓</span> Yes</td>
                          <td>03/04/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-In received by START message sent</strong></p><p>Customer sent START to 479-845-8355 at 2:34 PM.</p>">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 845-8350</a></td>
                          <td><span style="color: red;">✕</span> No</td>
                          <td>03/03/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-Out received by STOP message sent</strong></p><p>Customer sent STOP to 479-845-8350 at 11:22 AM.</p>">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 283-0328</a></td>
                          <td><span style="color: green;">✓</span> Yes</td>
                          <td>03/02/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-In received by customer service agent</strong></p><p>Verbal consent provided during support call #CS-3824.</p>">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 845-9355</a></td>
                          <td><span style="color: green;">✓</span> Yes</td>
                          <td>03/01/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-In received via web widget</strong></p><p>Customer accepted terms and conditions via the website opt-in form.</p>">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 845-9350</a></td>
                          <td><span style="color: green;">✓</span> Yes</td>
                          <td>02/28/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-In received by START message sent</strong></p><p>Customer sent START to 479-845-9350 at 9:15 AM.</p>">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 284-1327</a></td>
                          <td><span style="color: red;">✕</span> No</td>
                          <td>02/25/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-Out received by STOP message sent</strong></p><p>Customer sent STOP to 479-284-1327 at 3:47 PM.</p>">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 845-7355</a></td>
                          <td><span style="color: green;">✓</span> Yes</td>
                          <td>02/20/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-In received at point of sale</strong></p><p>Customer provided opt-in during account creation in-store.</p>">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 845-7350</a></td>
                          <td><span style="color: green;">✓</span> Yes</td>
                          <td>02/15/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-In received by START message sent</strong></p><p>Customer sent START to 479-845-7350 at 1:12 PM.</p>">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 284-2327</a></td>
                          <td><span style="color: red;">✕</span> No</td>
                          <td>02/10/2025</td>
                          <td><button class="btn btn-default btn-sm show-details-btn" data-details="<p><strong>Opt-Out received by STOP message sent</strong></p><p>Customer sent STOP to 479-284-2327 at 5:33 PM.</p>">Details</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <!-- Brands Subtab -->
              <div role="tabpanel" class="tab-pane" id="brands">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <button class="btn btn-primary" id="registerBrandBtn">Register Brand</button>
                    <div class="no-data-message" style="text-align: center; padding: 50px;">
                      <p>No brands registered yet. Click "Register Brand" to create your first brand.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Campaigns Subtab -->
              <div role="tabpanel" class="tab-pane" id="campaigns">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <button class="btn btn-primary">Register Campaign</button>
                    <div class="no-data-message" style="text-align: center; padding: 50px;">
                      <p>No campaigns registered yet. Click "Register Campaign" to create your first campaign.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Help Subtab -->
              <div role="tabpanel" class="tab-pane" id="help">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <div class="help-content" style="padding: 20px;">
                      <h4>TCR Registration Help</h4>
                      <p>This section provides guidance on registering your brands and campaigns with the Campaign Registry (TCR).</p>
                      
                      <h5>Brand Registration</h5>
                      <p>To register a brand, you'll need:</p>
                      <ul>
                        <li>Company name and contact information</li>
                        <li>Website URL</li>
                        <li>Business registration documents</li>
                        <li>Description of your SMS use cases</li>
                      </ul>
                      
                      <h5>Campaign Registration</h5>
                      <p>To register a campaign, you'll need:</p>
                      <ul>
                        <li>An approved brand</li>
                        <li>Campaign description and use case</li>
                        <li>Sample messages</li>
                        <li>Opt-in process documentation</li>
                      </ul>
                      
                      <p>For additional assistance, contact your account representative.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Auto-Responses Tab -->
          <div role="tabpanel" class="tab-pane" id="auto-responses">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row">
                  <div class="col-md-12 text-right">
                    <button class="btn btn-primary">Add Auto-Response</button>
                  </div>
                </div>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Keywords</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Subscriber Opt-Out</td>
                      <td>STOP, UNSUBSCRIBE</td>
                      <td>You have successfully unsubscribed from "[Brand Name]". You will no longer receive messages from us. For assistance, contact [support email or phone number]. Reply START to resubscribe.</td>
                    </tr>
                    <tr>
                      <td>Subscriber Opt-In</td>
                      <td>START</td>
                      <td>Thank you for opting in to receive messages from [Your Brand Name]. You will receive [message purpose, e.g. updates, appointment reminders, promotional offerings]. Message frequency varies. Standard message and data rates may apply. Reply HELP for help or STOP to unsubscribe.</td>
                    </tr>
                    <tr>
                      <td>Help</td>
                      <td>HELP</td>
                      <td>For assistance with [Your Brand Name], visit [Support Website Link], email [Support Email], or call [Support Phone Number]. Reply STOP to unsubscribe.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer copyright -->
      <div class="sms-footer" style="text-align: center; margin-top: 30px; color: #777; font-size: 12px;">
        Copyright © 2008-2025 by APOLLO<br>
        Manager Portal 45.2.2
      </div>
    `;
    
    // Inject the SMS content into the page
    $('#content').html(smsContent);
    
    // Apply some additional styles to match NetSapiens Portal
    let customStyles = `
      <style>
        #sms-content {
          font-family: Arial, sans-serif;
        }
        .sms-nav-tabs {
          margin-bottom: 20px;
        }
        .nav-tabs > li > a {
          color: #555;
        }
        .nav-tabs > li.active > a, 
        .nav-tabs > li.active > a:hover, 
        .nav-tabs > li.active > a:focus {
          color: #00b0f0;
          font-weight: 500;
        }
        .filters-section {
          margin-bottom: 20px;
          padding: 10px 0;
        }
        .btn-primary {
          background-color: #00b0f0;
          border-color: #0099d3;
        }
        .btn-primary:hover {
          background-color: #0099d3;
          border-color: #0083b7;
        }
        .registration-tabs {
          margin-top: 15px;
          margin-bottom: 20px;
        }
        .date-range-picker {
          max-width: 350px;
        }
        table.table thead th {
          background-color: #f9f9f9;
          border-bottom: 2px solid #ddd;
        }
      </style>
    `;
    $('head').append(customStyles);
    
    // Initialize Bootstrap tabs
    if ($.fn.tab) {
      $('.nav-tabs a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
      });
    }
  }
});
