# TestGen Backend API Gaps

This document lists the backend work still needed for the TestGen frontend to work as a complete production-ready application.

The current API collection already covers the core happy path:

- Auth: sign up, sign in
- Projects: create, fetch one, fetch all, search, update, delete
- Requirements: create, fetch one, fetch all by project, update, delete
- Test cases: generate by requirement, fetch by requirement, fetch by project, delete all by requirement

The frontend contains additional screens and UI states that still need backend support. The items below explain what is missing, why it is needed, and suggested endpoint contracts.

## 1. Fix CORS For Browser Requests

### Problem

The backend currently works in Postman, but browser requests can fail with `Failed to fetch` because the API returns an invalid CORS header on POST responses:

```http
Access-Control-Allow-Origin: *, http://localhost:5173
```

Browsers reject this because `Access-Control-Allow-Origin` must contain exactly one allowed origin, not multiple values.

### Required Fix

Return one origin only, for example:

```http
Access-Control-Allow-Origin: http://localhost:5173
```

For local development, allow:

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- any other frontend dev port if needed

For production, allow only the deployed frontend domain.

Also ensure these headers work for all methods used by the frontend:

```http
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type,Authorization
```

## 2. Forgot Password Flow

### Why It Is Needed

The frontend has a `/forgot-password` page with an email input and a `Send Reset Link` button. Currently there is no API endpoint behind it.

### Required Endpoint

```http
POST /testcasegenerator/auth/api/auth/forgot-password
Content-Type: application/json
```

Request:

```json
{
  "email": "user@example.com"
}
```

Expected success response:

```json
{
  "statusCode": "200",
  "statusMsg": "Password reset instructions sent"
}
```

### Backend Behavior

- Validate that `email` is present and is a valid email.
- If the email exists, generate a secure reset token.
- Send a reset link by email.
- The link should point to the frontend reset password page, for example:

```text
http://localhost:5173/reset-password?token=RESET_TOKEN
```

### Important Security Note

For security, the API should return the same success message whether the email exists or not. Do not reveal if an account exists.

## 3. Reset Password Flow

### Why It Is Needed

The frontend has a `/reset-password` page with:

- New password
- Confirm new password
- Password strength rules

There is no backend endpoint for actually changing the password with a reset token.

### Required Endpoint

```http
POST /testcasegenerator/auth/api/auth/reset-password
Content-Type: application/json
```

Request:

```json
{
  "token": "RESET_TOKEN",
  "newPassword": "NewStrongPassword123!"
}
```

Expected success response:

```json
{
  "statusCode": "200",
  "statusMsg": "Password reset successfully"
}
```

### Backend Behavior

- Validate reset token.
- Check token is not expired.
- Validate password rules.
- Update password.
- Invalidate the reset token after use.

### Suggested Password Rules

- Minimum 8 characters.
- At least one uppercase letter.
- At least one number.
- At least one special character.

## 4. Change Password For Logged-In Users

### Why It Is Needed

This is different from reset password. A logged-in user should be able to change their password from settings in the future.

### Required Endpoint

```http
POST /testcasegenerator/auth/api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json
```

Request:

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

Expected success response:

```json
{
  "statusCode": "200",
  "statusMsg": "Password changed successfully"
}
```

## 5. Get Current User Profile

### Why It Is Needed

The Settings page currently displays mock user data:

- Name
- Role
- Email
- Joined date
- Avatar
- Bio
- Plan

The sidebar also shows mock user data.

### Required Endpoint

```http
GET /testcasegenerator/users/api/me
Authorization: Bearer <token>
```

Expected response:

```json
{
  "id": 1,
  "username": "Ayman Nasr",
  "email": "ayman@example.com",
  "role": "CUSTOMER",
  "avatarUrl": null,
  "bio": "QA Engineer focused on API testing and automation.",
  "joinedAt": "2026-05-26T10:00:00Z",
  "plan": "Pro Plan"
}
```

### Notes

- `username`, `email`, and `role` already exist partially in the sign-in response.
- The frontend needs a dedicated endpoint to reload the current user after refresh.

## 6. Update Current User Profile

### Why It Is Needed

The Settings page should eventually allow editing user profile information.

### Required Endpoint

```http
PUT /testcasegenerator/users/api/me
Authorization: Bearer <token>
Content-Type: application/json
```

Request:

```json
{
  "username": "Ayman Nasr",
  "bio": "QA Engineer focused on API testing.",
  "avatarUrl": "https://example.com/avatar.png"
}
```

Expected response:

```json
{
  "id": 1,
  "username": "Ayman Nasr",
  "email": "ayman@example.com",
  "role": "CUSTOMER",
  "avatarUrl": "https://example.com/avatar.png",
  "bio": "QA Engineer focused on API testing.",
  "joinedAt": "2026-05-26T10:00:00Z",
  "plan": "Pro Plan"
}
```

## 7. Logout / Token Invalidation

### Why It Is Needed

The frontend can remove the token from local storage, but production apps usually need a backend logout endpoint if refresh tokens or token blocklists are used.

### Required Endpoint

```http
POST /testcasegenerator/auth/api/auth/logout
Authorization: Bearer <token>
```

Expected response:

```json
{
  "statusCode": "200",
  "statusMsg": "Logged out successfully"
}
```

### Backend Behavior

- If using refresh tokens, invalidate the current refresh token.
- If using stateless JWT only, this endpoint can be optional, but the frontend should know that logout is local-only.

## 8. Refresh Token

### Why It Is Needed

Currently the frontend stores one JWT. When it expires, all protected requests fail. For better UX, the backend should support token refresh.

### Required Endpoint

```http
POST /testcasegenerator/auth/api/auth/refresh-token
Content-Type: application/json
```

Request:

```json
{
  "refreshToken": "REFRESH_TOKEN"
}
```

Expected response:

```json
{
  "token": "NEW_ACCESS_TOKEN",
  "refreshToken": "NEW_REFRESH_TOKEN",
  "expiresIn": 3600
}
```

## 9. Requirement File Import

### Why It Is Needed

The upload requirements screen has buttons for:

- Upload PDF
- Upload Word
- Upload Excel

Currently these buttons only open the file picker. There is no backend API to upload files or extract requirements from them.

### Required Endpoint

```http
POST /testcasegenerator/requirements/api/import
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

Form fields:

```text
projectId: number
file: PDF | DOCX | XLSX
```

Expected response:

```json
{
  "requirements": [
    {
      "id": 10,
      "title": "User login",
      "userStory": "As a user, I want to log in using email and password so that I can access my account securely.",
      "projectId": 1,
      "createdAt": "2026-05-26T10:00:00Z",
      "lastModifiedAt": null
    }
  ]
}
```

### Backend Behavior

- Accept PDF, DOCX, and XLSX.
- Extract readable text.
- Use AI or parsing logic to convert the document into requirement records.
- Save extracted requirements under the selected project.
- Return the created requirements.

### Alternative Async Design

If file parsing takes too long, use an async job:

```http
POST /testcasegenerator/imports/api/create
GET /testcasegenerator/imports/api/{jobId}
```

Create import response:

```json
{
  "jobId": 123,
  "status": "PROCESSING"
}
```

Fetch import status response:

```json
{
  "jobId": 123,
  "status": "COMPLETED",
  "requirements": []
}
```

## 10. Export Test Cases To Excel

### Why It Is Needed

The Export page has a `Generate XLSX` button. There is no endpoint for generating or downloading an Excel file.

### Required Endpoint

```http
POST /testcasegenerator/exports/api/create
Authorization: Bearer <token>
Content-Type: application/json
```

Request:

```json
{
  "projectId": 1,
  "format": "xlsx",
  "scope": "project",
  "requirementId": null
}
```

Expected response:

```json
{
  "exportId": 100,
  "format": "xlsx",
  "status": "COMPLETED",
  "downloadUrl": "/testcasegenerator/exports/api/100/download",
  "createdAt": "2026-05-26T10:00:00Z"
}
```

Download endpoint:

```http
GET /testcasegenerator/exports/api/{exportId}/download
Authorization: Bearer <token>
```

Response should be a binary `.xlsx` file.

Suggested headers:

```http
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="testgen-export.xlsx"
```

## 11. Export Test Cases To PDF

### Why It Is Needed

The Export page has a `Generate PDF` button for executive summary reports.

### Required Endpoint

Use the same export creation endpoint with `format: "pdf"`.

Request:

```json
{
  "projectId": 1,
  "format": "pdf",
  "scope": "project",
  "requirementId": null
}
```

Download should return a binary PDF file.

Suggested headers:

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="testgen-report.pdf"
```

## 12. Export History

### Why It Is Needed

The Export page has a Recent Activity table with:

- Format
- Context
- Requested by
- Date
- Status
- Download again
- Retry
- Clear history

Currently this is mock data.

### Required Endpoints

```http
GET /testcasegenerator/exports/api/history
Authorization: Bearer <token>
```

Expected response:

```json
[
  {
    "id": 100,
    "format": "Excel",
    "context": "Full Suite",
    "requestedBy": "Ayman Nasr",
    "date": "2026-05-26T10:00:00Z",
    "status": "Completed",
    "downloadUrl": "/testcasegenerator/exports/api/100/download"
  }
]
```

Retry failed export:

```http
POST /testcasegenerator/exports/api/{exportId}/retry
Authorization: Bearer <token>
```

Clear history:

```http
DELETE /testcasegenerator/exports/api/history
Authorization: Bearer <token>
```

## 13. Dashboard Analytics Summary

### Why It Is Needed

The dashboard UI was designed to show analytics such as:

- Total test cases
- Automation saved hours
- AI confidence score
- Test coverage
- Test case type distribution
- Test cases per feature/module
- Recent generations

The current backend has no analytics endpoints.

### Required Endpoint

```http
GET /testcasegenerator/analytics/api/summary
Authorization: Bearer <token>
```

Expected response:

```json
{
  "totalTestCases": 12450,
  "automationSavedHours": 850,
  "aiConfidenceScore": 98.5,
  "testCoverage": 85,
  "typeDistribution": {
    "positive": 45,
    "negative": 30,
    "boundary": 25
  }
}
```

## 14. Recent Generations

### Why It Is Needed

The dashboard and settings pages both show recent generation/activity rows. Currently they are mock data.

### Required Endpoint

```http
GET /testcasegenerator/analytics/api/recent-generations
Authorization: Bearer <token>
```

Expected response:

```json
[
  {
    "id": 1,
    "status": "Generated",
    "module": "Authentication",
    "type": "Boundary",
    "coverage": "92%",
    "date": "2026-05-26T10:00:00Z",
    "projectId": 1,
    "requirementId": 10
  }
]
```

## 15. Test Cases Per Feature / Module

### Why It Is Needed

The dashboard has chart UI for test cases per feature/module. The backend should provide the data.

### Required Endpoint

```http
GET /testcasegenerator/analytics/api/testcases-per-feature
Authorization: Bearer <token>
```

Expected response:

```json
[
  {
    "feature": "Auth",
    "count": 120
  },
  {
    "feature": "Search",
    "count": 80
  }
]
```

## 16. Single Test Case Management

### Why It Is Needed

The current API can fetch test cases and delete all test cases for a requirement. It cannot update or delete a single test case.

For a production test management UI, users need to edit individual generated cases.

### Required Endpoints

Fetch one:

```http
GET /testcasegenerator/testcases/api/fetch/{testCaseId}
Authorization: Bearer <token>
```

Update one:

```http
PUT /testcasegenerator/testcases/api/update/{testCaseId}
Authorization: Bearer <token>
Content-Type: application/json
```

Request:

```json
{
  "title": "Valid login with email and password",
  "type": "positive",
  "steps": [
    "Open the login page",
    "Enter a valid email",
    "Enter a valid password",
    "Click Sign In"
  ],
  "expected_result": "The user is redirected to the dashboard",
  "status": "approved",
  "priority": "high"
}
```

Delete one:

```http
DELETE /testcasegenerator/testcases/api/delete/{testCaseId}
Authorization: Bearer <token>
```

## 17. Bulk Save Generated Test Cases

### Why It Is Needed

The generate endpoint returns generated test cases. The API contract should clearly define whether those generated cases are automatically saved.

If they are automatically saved, the response should include IDs.

If they are not automatically saved, the frontend needs an endpoint to save selected generated cases.

### Option A: Generate And Save Automatically

```http
POST /testcasegenerator/requirements/api/{requirementId}/generate-testcases
```

Response:

```json
{
  "testCases": [
    {
      "id": 1,
      "title": "Valid login",
      "type": "positive",
      "steps": [],
      "expected_result": "User is logged in"
    }
  ]
}
```

### Option B: Generate Drafts, Then Save

```http
POST /testcasegenerator/testcases/api/bulk-save
Authorization: Bearer <token>
Content-Type: application/json
```

Request:

```json
{
  "requirementId": 10,
  "testCases": [
    {
      "title": "Valid login",
      "type": "positive",
      "steps": [],
      "expected_result": "User is logged in"
    }
  ]
}
```

Response:

```json
{
  "saved": 1,
  "testCases": []
}
```

## 18. Test Case Status And Review Workflow

### Why It Is Needed

Generated test cases usually need review before being exported or used.

Suggested statuses:

- `draft`
- `approved`
- `rejected`

### Required Endpoint

```http
PATCH /testcasegenerator/testcases/api/{testCaseId}/status
Authorization: Bearer <token>
Content-Type: application/json
```

Request:

```json
{
  "status": "approved"
}
```

## 19. Pagination, Sorting, And Filtering

### Why It Is Needed

Current list endpoints return raw arrays. This is okay for small data, but will not scale for real users.

### Recommended Updates

Projects:

```http
GET /testcasegenerator/projects/api/fetch-all?page=0&size=20&sort=createdAt,desc
```

Requirements:

```http
GET /testcasegenerator/requirements/api/fetch-all?projectId=1&page=0&size=20
```

Test cases:

```http
GET /testcasegenerator/requirements/api/project/1/testcases?type=positive&keyword=login&page=0&size=20
```

Recommended response format:

```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 100,
  "totalPages": 5
}
```

## 20. Notifications

### Why It Is Needed

The app header has a notification bell. There is no API to power notifications.

### Required Endpoints

```http
GET /testcasegenerator/notifications/api/fetch-all
Authorization: Bearer <token>
```

```http
PUT /testcasegenerator/notifications/api/{notificationId}/read
Authorization: Bearer <token>
```

```http
PUT /testcasegenerator/notifications/api/read-all
Authorization: Bearer <token>
```

Expected notification response:

```json
[
  {
    "id": 1,
    "title": "Test cases generated",
    "message": "12 test cases were generated for User login.",
    "read": false,
    "createdAt": "2026-05-26T10:00:00Z"
  }
]
```

## 21. AI Generation Settings

### Why It Is Needed

The Settings page displays:

- Preferred AI Model
- Test Coverage Level
- Auto-generation

Currently these values are hardcoded.

### Required Endpoints

```http
GET /testcasegenerator/settings/api/generation
Authorization: Bearer <token>
```

Expected response:

```json
{
  "preferredModel": "GPT-4",
  "coverageLevel": "comprehensive",
  "autoGeneration": true
}
```

Update:

```http
PUT /testcasegenerator/settings/api/generation
Authorization: Bearer <token>
Content-Type: application/json
```

Request:

```json
{
  "preferredModel": "GPT-4",
  "coverageLevel": "comprehensive",
  "autoGeneration": true
}
```

## 22. Project Ownership And Authorization

### Why It Is Needed

All protected resources should belong to the authenticated user. Users must not be able to fetch, update, delete, or generate test cases for projects they do not own.

### Required Behavior

For all protected project, requirement, test case, export, and analytics routes:

- Read token from `Authorization: Bearer <token>`.
- Resolve current user.
- Only return data owned by that user.
- Return `403 Forbidden` if the user tries to access another user's data.

## 23. Better Create Responses

### Problem

Some create endpoints return only a status message.

Example:

```json
{
  "statusCode": "201",
  "statusMsg": "Project created successfully"
}
```

### Why This Is Limiting

The frontend often needs the created record ID immediately. If the API does not return it, the frontend must fetch all records again.

### Recommended Change

Return the created entity.

Project create response:

```json
{
  "id": 1,
  "name": "Ecommerce Project",
  "description": "Project description",
  "createdAt": "2026-05-26T10:00:00Z",
  "lastModifiedAt": null
}
```

Requirement create response:

```json
{
  "id": 10,
  "title": "User login",
  "userStory": "As a user, I want to log in...",
  "projectId": 1,
  "createdAt": "2026-05-26T10:00:00Z",
  "lastModifiedAt": null
}
```

## 24. Fix Requirement Typo

### Problem

The requirement API response uses:

```json
"lasModifiedAt": null
```

This appears to be a typo.

### Required Fix

Use:

```json
"lastModifiedAt": null
```

### Backward Compatibility

During migration, the backend can return both:

```json
{
  "lasModifiedAt": null,
  "lastModifiedAt": null
}
```

Then remove the typo later after the frontend is updated.

## 25. Standard Error Response

### Problem

Some endpoints return plain text errors, while others return JSON error objects.

This makes frontend error handling harder.

### Recommended Standard

All API errors should return JSON:

```json
{
  "apiPath": "/testcasegenerator/projects/api/fetch/999",
  "errorCode": "404 NOT_FOUND",
  "errorMessage": "Project with id 999 not found",
  "errorTime": "2026-05-26T10:00:00Z"
}
```

Validation errors can include field details:

```json
{
  "apiPath": "/testcasegenerator/auth/api/auth/signup",
  "errorCode": "400 VALIDATION_ERROR",
  "errorMessage": "Validation failed",
  "details": {
    "email": "Email is already registered",
    "password": "Password must be at least 8 characters"
  },
  "errorTime": "2026-05-26T10:00:00Z"
}
```

## 26. Standard Auth Error Codes

### Recommended Behavior

Missing or invalid token:

```http
401 Unauthorized
```

Valid token but user is not allowed to access the resource:

```http
403 Forbidden
```

Expired token:

```http
401 Unauthorized
```

Response:

```json
{
  "errorCode": "401 TOKEN_EXPIRED",
  "errorMessage": "Session expired. Please sign in again."
}
```

## Suggested Implementation Priority

### Priority 0: Required For Browser Stability

1. Fix CORS headers.

### Priority 1: Required For Existing Frontend Screens

1. Forgot password.
2. Reset password.
3. Get current user profile.
4. Requirement file import.
5. Excel/PDF export and download.
6. Export history.
7. Dashboard analytics summary.
8. Recent generations/activity.

### Priority 2: Required For Production Quality

1. Single test case update/delete.
2. Bulk save generated test cases or return saved IDs from generation.
3. Test case review statuses.
4. Pagination, sorting, filtering.
5. Notifications.
6. Generation settings.
7. Refresh token/logout.

### Priority 3: API Cleanup

1. Return created entities from create endpoints.
2. Fix `lasModifiedAt` typo.
3. Standardize all error responses.
4. Enforce ownership and authorization consistently.

## Minimum Backend Scope To Make The Frontend Feel Complete

If the backend team wants the smallest useful scope, implement these first:

1. CORS fix.
2. Forgot/reset password endpoints.
3. `GET /users/api/me`.
4. File import for PDF/DOCX/XLSX.
5. Export create/download/history.
6. Analytics summary and recent generations.
7. Single test case update/delete.

After those are done, almost every visible frontend button and screen can be wired to real data instead of mock data.
