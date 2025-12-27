function showLoader(buttonId) {
    const button = document.getElementById(buttonId);
    const buttonText = button.querySelector('.zoom-api-button-text');
    const buttonLoader = button.querySelector('.zoom-api-button-loader');
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';
    button.disabled = true;
}

function hideLoader(buttonId) {
    const button = document.getElementById(buttonId);
    const buttonText = button.querySelector('.zoom-api-button-text');
    const buttonLoader = button.querySelector('.zoom-api-button-loader');
    buttonText.style.display = 'inline';
    buttonLoader.style.display = 'none';
    button.disabled = false;
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML = '<i class="bi bi-exclamation-triangle"></i>' + message;
    errorDiv.style.display = 'flex';
    setTimeout(function() {
        errorDiv.style.display = 'none';
    }, 5000);
}

function hideError() {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.style.display = 'none';
}

function getCredentials() {
    return {
        apiKey: 'configured',
        apiSecret: 'configured'
    };
}

// nagse-send ng request sa Zoom API gamit ang PHP proxy para iwasan ang CORS error
function makeZoomRequest(endpoint, method, body, credentials) {
    const url = 'proxy.php?endpoint=' + encodeURIComponent(endpoint);
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }
    
    return fetch(url, options).then(function(response) {
        return response.json().then(function(data) {
            if (!response.ok || data.error) {
                throw new Error(data.message || data.error || 'The API request could not be completed');
            }
            return data;
        });
    });
}

// kumukuha ng user profile data mula sa Zoom API
function fetchUserProfile() {
    const credentials = getCredentials();
    if (!credentials) return;
    
    showLoader('fetchProfileBtn');
    hideError();
    
    makeZoomRequest('/users/me', 'GET', null, credentials)
        .then(function(data) {
            hideLoader('fetchProfileBtn');
            displayProfile(data);
        })
        .catch(function(error) {
            hideLoader('fetchProfileBtn');
            showError('Failed to fetch user profile');
        });
}

function displayProfile(profileData) {
    const profileSection = document.getElementById('profileSection');
    const profileContent = document.getElementById('profileContent');
    
    let html = '';
    
    html += '<div class="zoom-api-profile-item">';
    html += '<div class="zoom-api-profile-label">ID</div>';
    html += '<div class="zoom-api-profile-value">' + (profileData.id || 'N/A') + '</div>';
    html += '</div>';
    
    html += '<div class="zoom-api-profile-item">';
    html += '<div class="zoom-api-profile-label">First Name</div>';
    html += '<div class="zoom-api-profile-value">' + (profileData.first_name || 'N/A') + '</div>';
    html += '</div>';
    
    html += '<div class="zoom-api-profile-item">';
    html += '<div class="zoom-api-profile-label">Last Name</div>';
    html += '<div class="zoom-api-profile-value">' + (profileData.last_name || 'N/A') + '</div>';
    html += '</div>';
    
    html += '<div class="zoom-api-profile-item">';
    html += '<div class="zoom-api-profile-label">Email</div>';
    html += '<div class="zoom-api-profile-value">' + (profileData.email || 'N/A') + '</div>';
    html += '</div>';
    
    html += '<div class="zoom-api-profile-item">';
    html += '<div class="zoom-api-profile-label">Account Type</div>';
    html += '<div class="zoom-api-profile-value">' + (profileData.type || 'N/A') + '</div>';
    html += '</div>';
    
    if (profileData.pmi) {
        html += '<div class="zoom-api-profile-item">';
        html += '<div class="zoom-api-profile-label">Personal Meeting ID</div>';
        html += '<div class="zoom-api-profile-value">' + profileData.pmi + '</div>';
        html += '</div>';
    }
    
    profileContent.innerHTML = html;
    profileSection.classList.remove('zoom-api-section-hidden');
}

// kumukuha ng listahan ng meetings mula sa Zoom API, limit lang ng 10
function fetchMeetings() {
    const credentials = getCredentials();
    if (!credentials) return;
    
    showLoader('fetchMeetingsBtn');
    hideError();
    
    makeZoomRequest('/users/me/meetings?page_size=10', 'GET', null, credentials)
        .then(function(data) {
            hideLoader('fetchMeetingsBtn');
            displayMeetings(data.meetings || []);
        })
        .catch(function(error) {
            hideLoader('fetchMeetingsBtn');
            showError('Failed to fetch meetings list');
        });
}

function displayMeetings(meetings) {
    const meetingsSection = document.getElementById('meetingsSection');
    const meetingsContent = document.getElementById('meetingsContent');
    
    if (!meetings || meetings.length === 0) {
        meetingsContent.innerHTML = '<div class="zoom-api-empty-state"><i class="bi bi-inbox"></i><div class="zoom-api-empty-state-text">No meetings found</div></div>';
        meetingsSection.classList.remove('zoom-api-section-hidden');
        return;
    }
    
    let html = '';
    
    meetings.forEach(function(meeting) {
        html += '<div class="zoom-api-meeting-card">';
        
        html += '<div class="zoom-api-meeting-header">';
        html += '<div>';
        html += '<div class="zoom-api-meeting-topic">' + escapeHtml(meeting.topic || 'Untitled Meeting') + '</div>';
        html += '<div class="zoom-api-meeting-id">';
        html += '<i class="bi bi-hash"></i>';
        html += 'ID: ' + (meeting.id || 'N/A');
        html += '</div>';
        html += '</div>';
        html += '</div>';
        
        html += '<div class="zoom-api-meeting-details">';
        
        if (meeting.start_time) {
            html += '<div class="zoom-api-meeting-detail">';
            html += '<i class="bi bi-calendar"></i>';
            html += '<span>Start: ' + formatDate(meeting.start_time) + '</span>';
            html += '</div>';
        }
        
        if (meeting.duration) {
            html += '<div class="zoom-api-meeting-detail">';
            html += '<i class="bi bi-clock"></i>';
            html += '<span>Duration: ' + meeting.duration + ' minutes</span>';
            html += '</div>';
        }
        
        html += '<div class="zoom-api-meeting-detail">';
        html += '<i class="bi bi-people"></i>';
        html += '<span>Type: ' + (meeting.type === 2 ? 'Scheduled' : meeting.type === 3 ? 'Recurring' : 'Instant') + '</span>';
        html += '</div>';
        
        html += '</div>';
        
        if (meeting.join_url) {
            html += '<div class="zoom-api-meeting-link">';
            html += '<a href="' + meeting.join_url + '" target="_blank">';
            html += '<i class="bi bi-box-arrow-up-right"></i>';
            html += 'Join Meeting';
            html += '</a>';
            html += '</div>';
        }
        
        html += '</div>';
    });
    
    meetingsContent.innerHTML = html;
    meetingsSection.classList.remove('zoom-api-section-hidden');
}

// gumagawa ng bagong meeting sa Zoom gamit ang topic, date, at duration na nilagay ng user
function createMeeting() {
    const credentials = getCredentials();
    if (!credentials) return;
    
    const topicInput = document.getElementById('meetingTopic');
    const dateInput = document.getElementById('meetingDate');
    const durationInput = document.getElementById('meetingDuration');
    
    const topic = topicInput.value.trim();
    const dateTime = dateInput.value;
    const duration = parseInt(durationInput.value);
    
    if (!topic) {
        showError('Please enter a meeting topic');
        return;
    }
    
    if (!dateTime) {
        showError('Please select a start date and time');
        return;
    }
    
    if (!duration || duration < 1 || duration > 240) {
        showError('Duration must be between 1 and 240 minutes');
        return;
    }
    
    showLoader('createMeetingBtn');
    hideError();
    
    const startTime = new Date(dateTime).toISOString();
    
    const meetingData = {
        topic: topic,
        type: 2,
        start_time: startTime,
        duration: duration,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        settings: {
            join_before_host: false,
            participant_video: true,
            host_video: true
        }
    };
    
    makeZoomRequest('/users/me/meetings', 'POST', meetingData, credentials)
        .then(function(data) {
            hideLoader('createMeetingBtn');
            topicInput.value = '';
            dateInput.value = '';
            durationInput.value = '';
            showError('Meeting created successfully');
            setTimeout(function() {
                hideError();
            }, 3000);
        })
        .catch(function(error) {
            hideLoader('createMeetingBtn');
            showError('Failed to create meeting');
        });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('fetchProfileBtn').addEventListener('click', fetchUserProfile);
document.getElementById('fetchMeetingsBtn').addEventListener('click', fetchMeetings);
document.getElementById('createMeetingBtn').addEventListener('click', createMeeting);

