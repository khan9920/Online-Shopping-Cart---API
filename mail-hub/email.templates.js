const templates = {};
const webUrl = process.env.DOMAIN;

templates.newAccountCreated = function (username) {
  return `
			<p>The username for the 
			    <a href="${webUrl}">${webUrl}</a>
			    is provided below. Please contact us if there is any issue. Thank you.
			</p>
			<p>
				<b>User Name:  ${username} </b>
			</p>`;
};

templates.updatePassword = function (username, password) {
  return `
    <h4>[[Name]] Account New Password</h4>
			<p>New Account Credentials</p>
			<p>
				<b>User Name :  ${username} </b>
			</p>
			<p>
				<b>Password : ${password} </b>
			</p>`;
};

templates.resetPassword = function (username, password) {
  return `
    <h3>Password reset successfully.</h3>
			<p>New Account Credentials</p>
			<p>
				<b>User Name :  ${username} </b>
			</p>
			<p>
				<b>Password : ${password} </b>
			</p>`;
};

templates.message = function (message) {
  return `
    <p>${message}</p>
    
    <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
        `;
};

templates.passwordUpdatedNotification = function () {
  return `
    <h4>[[Name]] Account Password Changed</h4>

    <p>You have successfully changed your password. </p>
    
    <p><b>If you did not change your password, please contact the administrator.</b></p>
            `;
};

module.exports = templates;
