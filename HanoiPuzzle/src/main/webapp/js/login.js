$(document).ready(function() {
    // Login Form Submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const username = $('#username').val();
        const password = $('#password').val();
        
        // Basic client-side validation
        if (!username || !password) {
            showAlert('Please enter both username and password', 'danger');
            return;
        }
        
        // AJAX login request
        $.ajax({
            url: '/login',
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                if (response.success) {
                    // Store user details in localStorage
                    localStorage.setItem('username', username);
                    localStorage.setItem('email', response.email);
                    
                    // Redirect to game page
                    window.location.href = 'game.html';
                } else {
                    showAlert('Invalid username or password', 'danger');
                }
            },
            error: function() {
                showAlert('Login failed. Please try again.', 'danger');
            }
        });
    });

    // Profile Picture Upload
    $('#profilePictureUpload').on('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            $('#profilePicture').attr('src', event.target.result);
            
            // Upload to server
            const formData = new FormData();
            formData.append('profilePicture', file);
            
            $.ajax({
                url: '/upload-profile-picture',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    showAlert('Profile picture uploaded successfully', 'success');
                },
                error: function() {
                    showAlert('Profile picture upload failed', 'danger');
                }
            });
        };
        
        reader.readAsDataURL(file);
    });

    // Alert utility function
    function showAlert(message, type = 'info') {
        const alertDiv = $('<div>', {
            class: `alert alert-${type} alert-dismissible fade show`,
            role: 'alert',
            html: message + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>'
        });
        
        $('#alertContainer').html(alertDiv);
    }
});