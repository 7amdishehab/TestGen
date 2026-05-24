# TestGen

TestGen is an AI-powered test case generation platform built with React, TypeScript, Vite, and Tailwind CSS. The product focuses on turning product requirements, user stories, and ticket-style inputs into structured test cases, then letting the team review, export, and sync the result into QA workflows.

The current codebase is front-end first. Most screens are wired with realistic UI states and mock content so the team can validate the flow, design, and route structure before connecting real backend services.

## What The Product Does

- Transforms requirements into comprehensive test cases.
- Supports multiple input styles such as PRDs, user stories, PDF, DOCX, plain text, and structured notes.
- Presents a landing experience that explains the workflow end to end.
- Provides an app area with dashboard analytics, export/integration tools, and user settings.
- Includes sign-in, sign-up, forgot password, and reset password flows.

## Main Features

### Landing Experience

- Hero section with a clear CTA to start generating test cases.
- Feature highlights for NLP-powered analysis, multi-format support.
- Step-by-step workflow explanation on the How It Works page.
- Marketing-style sections such as trusted companies, process overview, and CTA blocks.
- Motion-enhanced presentation using Framer Motion and a Lottie animation.

### Requirements To Test Cases Flow

- Upload requirements entry point from the landing page and app navigation.
- AI analysis story that explains how text is processed into test coverage.
- Rule extraction and scenario generation positioning.
- Output framing for steps, expected results, and pre-conditions.

### Dashboard Experience

- Analytics overview for total test cases, time saved, and AI confidence score.
- Coverage visualization for overall coverage and case-type distribution.
- Activity and recent generation tables.
- Responsive sidebar navigation for app sections.

### Export And Integrations

- Excel export path for detailed test case repositories.
- PDF export path for executive summary reports.

### Settings Area

- User profile summary and role presentation.
- Recent generation activity timeline.
- Test specialization tags.
- AI generation preferences and usage metrics.

### Authentication UI

- Sign in page with email, password, remember me, and social sign-in buttons.
- Sign up page for onboarding new users.
- Forgot password and reset password recovery screens.
- Shared auth layout and card-based form components.

## Tech Stack

### Core

- React 19
- TypeScript
- Vite
- React Router DOM

### Styling And UI

- Tailwind CSS v4
- Custom theme tokens in `src/index.css`
- Reusable UI primitives and feature-scoped components
- `react-icons` for a consistent icon set

### Motion And Media

- Framer Motion for page and section transitions
- `@lottiefiles/dotlottie-react` for the animated landing decoration

### Tooling

- ESLint
- Prettier
- TypeScript compiler checks
- Vite build and preview pipeline

## Development Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
npm run preview
```

## Local Development

1. Install dependencies with `npm install`.
2. Start the dev server with `npm run dev`.
3. Open the local Vite URL shown in the terminal.

The app does not currently require environment variables for the existing front-end flow.

## Routing Map

The application routing is defined in `src/router/AppRouter.tsx`.

### Public/Auth Routes

- `/sign-in`
- `/sign-up`
- `/forgot-password`
- `/reset-password`

### Public App And Marketing Routes

- `/`
- `/how-it-works`

### App Area Routes

- `/dashboard`
- `/upload-requirements`
- `/export`
- `/settings`

The app currently treats the main app routes as public during development. Auth enforcement is intended for specific actions and can be tightened later without changing the route map.

## Architecture Overview

The app is organized by feature rather than by generic shared folders only. This keeps landing, auth, and app screens isolated while still allowing shared primitives to be reused.

### Top-Level Flow

- `src/main.tsx` bootstraps React, wraps the app in `BrowserRouter`, and loads the global styles.
- `src/app/App.tsx` renders the application router.
- `src/router/AppRouter.tsx` composes layouts and route groups.

### Layout Composition

- `AuthLayout` wraps sign-in and sign-up related screens.
- `MainLayout` wraps the marketing pages.
- `AppLayout` and `DashboardLayout` provide the app shell and sidebar experience.

### Feature Areas

- `src/features/landing` contains the public product story, sections, and promotional components.
- `src/features/auth` contains the authentication forms and layout pieces.
- `src/features/app` contains dashboard, export, settings, and shared app shell components.

## Data And State Behavior

- Many screens currently use static or demo data so the UI can be validated without a backend.
- Authentication state is derived from localStorage through `src/hooks/useAuth.ts`.
- The auth token key is `testgen_auth_token`.
- In development only, auth can be bypassed with `?devAuth=1` in the URL or by storing `devAuth=1` in localStorage.
- HTTP requests are abstracted through `src/services/httpClient.ts`, which provides a small JSON request helper.
- Safe localStorage helpers live in `src/services/storage.ts`.

## Design System Notes

The visual language is intentionally dark, modern, and product-focused.

- Theme tokens live in `src/index.css`.
- The project uses separate token groups for auth and landing/app surfaces.
- Typography is driven by `Inter` for body text and `Poppins` for titles.
- The UI relies on card layouts, soft borders, and accent colors for clarity.
- Motion is used selectively to improve polish without overwhelming the interface.

## Key Pages And Screens

### Landing

- Hero
- Trusted Companies
- Features
- Process
- CTA
- How It Works

### Auth

- Sign In
- Sign Up
- Forgot Password
- Reset Password

### App

- Dashboard
- Upload Requirements
- Export & Integrations
- Settings

## Feature Details

### AI Test Generation Story

The product is positioned around natural-language understanding of requirements. The landing pages and How It Works page describe a pipeline that:

- ingests uploaded requirements,
- analyzes context and user flows,
- extracts rules and edge cases,
- generates test cases with expected outcomes and pre-conditions.

### Integrations Story

Export screens and cards describe support for:

- Excel exports for detailed repositories,
- PDF reports for stakeholders,

### QA Audience

The dashboard and settings copy are written for QA engineers, test automation specialists, and product teams that need structured test coverage and reporting.

## Project Structure

```text
src/
	app/
	assets/
	components/
	constants/
	features/
		app/
		auth/
		landing/
	hooks/
	layouts/
	pages/
	router/
	services/
	types/
	utils/
```

### Notable Files

- `src/constants/routes.ts` centralizes all route paths.
- `src/constants/storageKeys.ts` stores app storage keys.
- `src/utils/cn.ts` is the class name helper used across the UI.
- `src/features/app/shared/components/Sidebar` contains the sidebar shell and nav item logic.
- `src/features/landing/components` contains the public website building blocks.

## Libraries In Use

- `react`
- `react-dom`
- `react-router-dom`
- `framer-motion`
- `react-icons`
- `@lottiefiles/dotlottie-react`
- `tailwindcss`
- `@tailwindcss/vite`
- `typescript`
- `eslint`
- `prettier`

## Notes For The Team

- This repo is currently optimized for UI validation and product storytelling.
- Many tables, analytics cards, and integrations are mock data driven.
- The codebase is structured to make it easy to swap mock data for API-backed data later.
- If backend endpoints, auth providers, or environment variables are added later, document them here in the same README.

## Build And Quality Checks

- `npm run build` compiles the production bundle.
- `npm run lint` checks code quality.
- `npm run typecheck` validates the TypeScript project.
- `npm run preview` serves the production build locally.

## Quick Summary

TestGen is a polished AI QA product UI with a marketing site, auth screens, dashboard views, export/integration flows, and a shared app shell. It uses a modern React/Vite/Tailwind stack and is already organized so the team can extend it into a real production platform with minimal structural changes.
