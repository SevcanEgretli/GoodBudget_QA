# Exploratory Testing – GoodBudget Web App

## Testing Session Summary

- **Tester:** Sevcan Egretli  
- **Date:** 27 May 2025  
- **Duration:** 2 hours  
- **Device:** MacBook Pro, 13-inch  
- **Browser Used:** Chrome (v124)   
- **Environment:** Free-tier user account on [Good Budget](https://goodbudget.com)
- **Goal:** The goal is to explore and evaluate the functionality, user experience, and security of the GoodBudget web application. This includes verifying that core features like registration, envelopes, and transactions work as expected, ensuring smooth navigation, and identifying any usability or accessibility issues. Additionally, we aim to uncover potential bugs, performance issues, and security vulnerabilities through exploratory testing.

## 1. Testing Charters Based on the Priority

### High Priority
- Test the complete sign-up and login flow, including form validation, error messages, CAPTCHA verification, session handling, and the "Remember Me" feature. Monitor browser storage and backend requests to ensure correct authentication behavior.
- Investigate the Envelopes section. Test core actions (create, edit, delete) and additional tools such as filters, transaction import/export, and envelope filling flow. Monitor REST API requests via the browser’s DevTools, and assess system responses, UI feedback, and data consistency end-to-end.
- Investigate how users can create, edit, and delete the accounts section. Observe feedback, UI behavior, and data persistence.
- Explore the Add Transaction feature. Check how the form handles inputs for all transaction types, balance updates, and REST API behavior. Verify scheduled functions.
- Explore the Fill Envelopes flow with save and cancel functions. Check how the form handles inputs and tooltips. 
- Evaluate the Reports and Summary section. Focus on data accuracy, filters and loading performance.
- Perform a full exploratory test of the Household Settings area. Focus on updating account information, managing notifications, viewing billing data, and deleting the account. Confirm that each action triggers the correct API call and provides appropriate visual feedback.
- Investigate Logout process. Verify session clearing, correct directing, and UI confirmation.
- Explore upgrading to Goodbudget Premium account types.
- Try to log in with a user account that has been previously deleted. Observe the system’s behavior, error messages, and API responses to confirm that login is no longer possible and the account has been fully removed from the system.
- Explore the password update functionality. After changing the password, test login attempts using both the old and new passwords. Check if reusing a previous password is allowed. Monitor system behavior and API responses throughout these actions.
- Validate input fields across the application, checking that incorrect formats, empty fields, and edge cases trigger appropriate validation messages.
- Inspect cookies and localStorage through the browser’s Application tab. Validate what data is stored, whether it’s sensitive, if it persists after logout, and if proper security flags (e.g., HttpOnly, Secure) are used.

### Medium Priority
- Investigate all buttons and navigation links on the Goodbudget home page and other pages. Ensure that each link directs to the correct page, layout remains consistent, and runs properly without breaking the visual structure.
- Explore the “Need Help” assistant or help section. Test all available support flows, suggested articles, redirection links, and response behaviors.
- Check reports and budget summary view.
- Run a Lighthouse audit and analyze scores for performance, accessibility, best practices. Review any warnings or failures and note areas for improvement.
- Perform basic security and privacy checks, including whether passwords are visible in the DOM, autofill works correctly, and if sensitive user data is exposed in network traffic or local storage.

### Low Priority
- Test keyboard-only navigation using Tab, Enter, Space, and Esc keys. Verify that all interactive elements are reachable and usable via keyboard, and that focus is visible and logical.
- Test responsive design by resizing the browser to simulate responsive views. Focus on layout breaks and button visibility.
- Check cross-browser compatibility by testing key user flows in Firefox and Internet Explorer. Compare layout consistency, behavior of forms, buttons, and performance across browsers.

## 2. Charter Prioritization

- **High Priority:** These are essential functions that are crucial for users' budgeting experience, both on the front-end and back-end. This includes things like registration, envelopes, and transactions.
- **Medium Priority:** These affect user experience, security, and accessibility. While important, they are secondary to core functionalities but still need attention for overall quality.
- **Low Priority:** These include design-related issues, cross-browser compatibility, and keyboard accessibility. Although they are important for a smooth experience, they do not directly impact the core functionality or security of the system.

## 3. Findings

### What Worked Well:
- The sign-up, login, and logout process was smooth with clear error messages.
- Envelopes can be created, edited, and deleted successfully.
- Transactions are saved and reflected in the envelope balance.
- Warning errors are clear and directed right.
- Navigation between tabs is quick and consistent.
- Filters are working well.
- Cookies and localStorage are being used securely.

### Issues Found:
- No visual feedback after clicking "Save" on the "Add Transaction" modal. **LOW**
- Signup fails silently when the CAPTCHA is missing or invalid. No validation message is shown, and the user is not created. **HIGH**
- The "Get Goodbudget Premium" userpilot-slide cannot be closed, resulting in a poor user experience. **LOW**
- The limitation about creating envelopes with the same name is only handled on the frontend. I was able to create multiple envelopes with the same name by sending API requests directly. **HIGH**
- In the "Add Transaction" modal, there is an empty tab with id="selectTypeTab" next to "Debt Transaction". It doesn’t have any function and input field. **HIGH**
- When entering an invalid amount like 23.44004344, the warning message is misleading. It should specify the 2-digit limit after the decimal. **MEDIUM**
- When resizing the text areas in the "Add Transaction" modal, the new size persists even after closing and reopening the modal. **LOW**
- Tooltip text for chart icons is not accessible via keyboard navigation (Tab/Arrow keys). **LOW**

## 4. Risks to Mitigate for a Web Budgeting Application
A budgeting application like Goodbudget deals with sensitive personal and financial data. Therefore, it’s important to identify and mitigate several key risks:

### Security Risks
- **Unauthorized Access:** Weak login handling or missing session expiration could allow others to access a user’s account.
- **Data Exposure:** Storing passwords in localStorage or exposing personal information in network requests can lead to data leaks.
- **Lack of Rate Limiting:** Brute-force login attempts or mass transaction submissions could overload the system.

### Data Integrity Risks
- Transactions and envelopes must be saved and displayed accurately. Any loss or mismatch in data could lead to financial errors for the user.

### Validation Risks
- Improper input validation (e.g., invalid amounts, dates, or duplicate envelope names) can corrupt the data or break calculations.

### Session Management Risks
- If logout does not properly clear the session, or old passwords remain valid temporarily, it can cause session hijacking or confusion.

### Accessibility and Usability Risks
- Users with disabilities may face difficulties if the application is not keyboard accessible or doesn’t meet WCAG standards.

### Cross-Browser & Responsive Issues
- Key actions (like creating or deleting data) might fail or behave differently on unsupported browsers or mobile views.

## 5. Tools Used

- **Chrome DevTools:**
  - **Network tab:** Confirmed REST API calls.
  - **Application tab:** Inspected cookies, localStorage data for sessions and state.
- **Lighthouse:** Scored 86 for performance, 91 for accessibility.
- **aXe Chrome Extension:** Reported missing labels and low color contrast on some elements.
- **Proxyman:** Also checked REST API calls from this application. It helps to filter related requests from my end.
