$(document).ready(function() {
  // Only run this code if we're not already on the SMS tab
  if (window.location.pathname.indexOf('/portal/sms') === -1) {
    // Add SMS button to main navigation if it doesn't exist
    if ($('#nav-sms').length === 0) {
      let smsNavButton = `
        <li id="nav-sms" class="nav-link">
          <a href="#" title="SMS">
            <div class="nav-button btn"></div>
            <div class="nav-bg-image" style="background-position: -40px 0;"></div>
            <span class="nav-text">SMS</span>
            <div class="nav-arrow"></div>
          </a>
        </li>`;
      $('#nav-buttons').append(smsNavButton);
      
      // Add CSS to fix arrow direction
      const smsNavStyles = `
        <style>
          #nav-sms.nav-link-current .nav-arrow {
            bottom: -8px !important;
            top: auto !important;
            border-top: 8px solid #396AB1 !important;
            border-bottom: 0 !important;
          }
        </style>`;
      $('head').append(smsNavStyles);
    }

    // Handle click on SMS nav button
    $(document).on('click', '#nav-sms a', function(e) {
      e.preventDefault();
      $("#nav-buttons li").removeClass("nav-link-current");
      $(this).parent().addClass("nav-link-current");
      $('.navigation-title').html("SMS");
      
      // Load SMS content
      loadSMSContent();
      
      return false;
    });
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
            <li role="presentation"><a href="#registrations" aria-controls="registrations" role="tab" data-toggle="tab">Registrations</a></li>
            <li role="presentation"><a href="#auto-responses" aria-controls="auto-responses" role="tab" data-toggle="tab">Auto-Responses</a></li>
            <li role="presentation"><a href="#integrations" aria-controls="integrations" role="tab" data-toggle="tab">Integrations</a></li>
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
                        <input type="text" class="form-control" value="02/26/2025 12:00 am — 02/27/2025 11:59 pm" />
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
                        <input type="text" class="form-control" value="02/26/2025 12:00 am — 02/27/2025 11:59 pm" />
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
          
          <!-- Registrations Tab -->
          <div role="tabpanel" class="tab-pane" id="registrations">
            <!-- Subtabs for Registrations -->
            <ul class="nav nav-tabs registration-tabs" role="tablist">
              <li role="presentation" class="active"><a href="#brands" aria-controls="brands" role="tab" data-toggle="tab">Brands</a></li>
              <li role="presentation"><a href="#campaigns" aria-controls="campaigns" role="tab" data-toggle="tab">Campaigns</a></li>
              <li role="presentation"><a href="#compliance" aria-controls="compliance" role="tab" data-toggle="tab">Compliance</a></li>
              <li role="presentation"><a href="#help" aria-controls="help" role="tab" data-toggle="tab">Help</a></li>
            </ul>
            
            <!-- Subtab content -->
            <div class="tab-content">
              <!-- Brands Subtab -->
              <div role="tabpanel" class="tab-pane active" id="brands">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <button class="btn btn-primary">Register Brand</button>
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
              
              <!-- Compliance Subtab -->
              <div role="tabpanel" class="tab-pane" id="compliance">
                <div class="panel panel-default">
                  <div class="panel-body">
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
                          <td><span style="color: green;">✓</span></td>
                          <td>2023-05-15</td>
                          <td><button class="btn btn-default btn-sm">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 845-8355</a></td>
                          <td><span style="color: red;">✕</span></td>
                          <td>2023-05-14</td>
                          <td><button class="btn btn-default btn-sm">Details</button></td>
                        </tr>
                        <tr>
                          <td><a href="#" style="color: #00b0f0;">(479) 845-8350</a></td>
                          <td><span style="color: green;">✓</span></td>
                          <td>2023-05-13</td>
                          <td><button class="btn btn-default btn-sm">Details</button></td>
                        </tr>
                      </tbody>
                    </table>
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
          
          <!-- Integrations Tab -->
          <div role="tabpanel" class="tab-pane" id="integrations">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="integrations-content" style="padding: 20px;">
                  <h4>Available Integrations</h4>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="integration-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                        <h5>Zapier</h5>
                        <p>Connect your SMS system with 3,000+ apps.</p>
                        <button class="btn btn-default">Configure</button>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="integration-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                        <h5>Microsoft Teams</h5>
                        <p>Get SMS notifications in your Teams channels.</p>
                        <button class="btn btn-default">Configure</button>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="integration-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                        <h5>Slack</h5>
                        <p>Receive SMS notifications in Slack channels.</p>
                        <button class="btn btn-default">Configure</button>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="integration-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                        <h5>Webhooks</h5>
                        <p>Send SMS events to your custom endpoints.</p>
                        <button class="btn btn-default">Configure</button>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="integration-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                        <h5>CRM Connector</h5>
                        <p>Connect with Salesforce, HubSpot, and more.</p>
                        <button class="btn btn-default">Configure</button>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="integration-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                        <h5>API Access</h5>
                        <p>Get API keys for custom integrations.</p>
                        <button class="btn btn-default">Configure</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer copyright -->
      <div class="sms-footer" style="text-align: center; margin-top: 30px; color: #777; font-size: 12px;">
        Copyright © 2008-2022 by APOLLO<br>
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
