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

templates.orderTemplate = function (
  companyName,
  building,
  itemName,
  quantity,
  unitPrice,
  total,
) {
  return `
    <h4>[[Name]] Purchase Report</h4>
            <p>purchased from [[Name]] Communities</p>

            <p>Company Name : ${companyName}</p>
            <p>Building : ${building.name}</p>
            <p>Item Name : ${itemName}</p>
            <p>Item Quantity : ${quantity}</p>
            <p>Item Unit Price : $${unitPrice}</p>
            <p>Item Total : $${total}</p>

            <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
          `;
};

templates.notificationOrderTemplate = function (
  companyName,
  buildingNames,
  itemName,
  quantity,
  unitPrice,
  total,
  customerName,
  customerEmail,
) {
  return `
    <h4>Customer</h4>
        <p>Name: ${customerName}</p>
        <p>Email: ${customerEmail}</p>
        <br/>
    <h4>[[Name]] Purchase Report</h4>
            <p>purchased from [[Name]] Communities</p>

            <p>Company Name : ${companyName}</p>
            <p>Buildings : ${buildingNames}</p>
            <p>Item Name : ${itemName}</p>
            <p>Item Quantity : ${quantity}</p>
            <p>Item Unit Price : ${unitPrice}</p>
            <p>Item Total : ${total}</p>

            <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
          `;
};

templates.notificationPaymentTemplate = function (
  paymentDate,
  amount,
  paymentMethod,
  customerName,
  customerEmail,
) {
  return `
    <h4>Customer</h4>
        <p>Name: ${customerName}</p>
        <p>Email: ${customerEmail}</p>
        <br/>
    <h4>[[Name]] Payment Details</h4>
            <p>Payment Date : ${paymentDate}</p>
            <p>Amount: $${amount}</p>
            <p>Payment method : ${paymentMethod}</p>

            <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
          `;
};

templates.notificationVacateTemplate = function (
  vacateDate,
  building,
  roomNumber,
  customerName,
  customerEmail,
  earlyVacate,
) {
  return `
    <h4>Customer</h4>
        <p>Name: ${customerName}</p>
        <p>Email: ${customerEmail}</p>
        <br/>
    <h4>Vacate Details</h4>
            ${
  earlyVacate
    ? "<p>Suite has been <b><i>early vacated.</i></b></p>"
    : "<p></p>"
} 

            <p>Vacate Date : ${vacateDate}</p>
            <p>Building: ${building}</p>
            <p>Suite#: ${roomNumber}</p>

            <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
       `;
};

templates.monthlyLeaseReminder = function (dueDate, outstandingAmount) {
  return `
    <h4>[[Name]] Lease Payment Reminder</h4>
    <p>This is a friendly reminder that your monthly rent is due on the first of the month.  Thank you.</p>
    <p>Lease full amount : ${outstandingAmount}
    <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
          `;
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

templates.monthlyYMembershipLeaseReminder = function (
  dueDate,
  outstandingAmount,
) {
  return `
    <h4>[[Name]] Y-Membership Lease Payment Reminder</h4>
    <p>This is a friendly reminder that your monthly rent is due on the first of the month.  Thank you.</p>
    <p>Y-Membership lease full amount : ${outstandingAmount}
    <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
         `;
};

templates.sendMonthlyOutstandingWithFine = function (fine, outstandingAmount) {
  return `
    <h4>[[Name]] lease Creation</h4>
    <p>You have not paid the monthly lease. Therefore additional fee added to your lease </p>
    <p>Additional Value : ${fine}</p>
    <p>Lease full amount : ${outstandingAmount + fine}
    <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
         `;
};

templates.monthlyLeaseDue = function (fine, outstanding) {
  return `
    <h4>[[Name]] lease Creation</h4>

    <p>Please pay the monthly payment for the lease today. If not  ${fine} amount will be added as a fine</p>
    <p>Lease full amount : ${outstanding}
    <p>Total : ${fine + outstanding}</p>
    
    <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
          `;
};

templates.monthlyYMembershipLeaseDue = function (fine, outstanding) {
  return `
    <h4>[[Name]] Y-Membership Lease Due</h4>

    <p>Please pay the monthly payment for the lease today. If not  ${fine} amount will be added as a fine</p>
    <p>Lease full amount : ${outstanding}
    <p>Total : ${fine + outstanding}</p>
    
    <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
         `;
};

templates.invoiceAttachement = function () {
  return `
    <h4>[[Name]] Invoice Report</h4>
			<p>Please find the attached invoice <br> Thank You</p>
            
            `;
};

templates.linkToInvoice = function (url) {
  return `
    <h4>[[Name]] Invoice</h4>
		<p>Thank you for being a tenant. The attached invoice is for the upcoming month.</p>
			
		<a href="${url}">Click here to pay</a> 
		<p> Thank You </p>
        `;
};

templates.monthlyProductsReminder = function (
  itemName,
  quantity,
  unitPrice,
  total,
  date,
) {
  return `
    <h4>[[Name]] Purchase Report</h4>
            <p>purchased from [[Name]] Communities</p>

            <p>please pay the monthly payment for the following item before ${date}</p>

            <p>Item Name : ${itemName}</p>
            <p>Item Quantity : ${quantity}</p>
            <p>Item Unit Price : ${unitPrice}</p>
            <p>Item Total : ${total}</p>

            <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
        `;
};

templates.monthlyProductsDue = function (
  itemName,
  quantity,
  unitPrice,
  total,
  fine,
) {
  return `
    <h4>[[Name]] Purchase Report</h4>
            <p>purchased from [[Name]] Communities</p>

            <p>please pay the monthly payment for the following item today if not  ${fine} amount will be added as a fine</p>
            
            <p>Item Name : ${itemName}</p>
            <p>Item Quantity : ${quantity}</p>
            <p>Item Unit Price : ${unitPrice}</p>
            <p>Item Total : ${total}</p>

            <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
      `;
};

templates.lateNotice = function (invoice, message) {
  return `
    <h4>[[Name]] Invoice #${invoice.invoice_number} - Late Notice</h4>

    <p>${message}</p>
    
    <p><b>Please sign in to <a href="${webUrl}">${webUrl}</a> for further details.</b></p>
            `;
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
