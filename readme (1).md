# UI2API CHALLENGE

## Challenge Title: Smart Ride Dispatch & Dynamic Pricing Platform

## Project Summary

The **Smart Ride Dispatch & Dynamic Pricing Platform** is a real-time
ride booking and dispatch system. The frontend has already been
developed across three HTML pages with a shared stylesheet. Your task is
to build a backend using **Node.js/Express, Django, FastAPI, Spring
Boot, Laravel, ASP.NET, or any backend framework of your choice** and
integrate it with the provided frontend using APIs.

The backend should process ride requests, calculate fares, manage driver
assignment, maintain ride status, update pricing, and populate the UI
with real-time data.

## Page-by-Page Breakdown: "What To Do"

### 1. Page 1: `index.html` (Live Tracking)

#### Ride Booking

Connect the ride booking form to the backend.

Validate and process:

-   Pickup Location
-   Drop Location
-   Vehicle Type
-   Ride Pooling Option

#### Fare Prediction

Calculate and display the predicted fare dynamically.

#### Ride Tracking

Implement ride lifecycle states:

-   Requested
-   Driver Assigned
-   Driver Arriving
-   Started
-   Completed
-   Cancelled

#### Live Tracking

Display live ride tracking updates using backend APIs or WebSockets.

------------------------------------------------------------------------

### 2. Page 2: `pricing-simulator.html` (Micro-Surge Engine)

#### Dynamic Pricing

Implement backend logic to calculate surge pricing.

Display dynamic data for:

-   Zone ID
-   Active Requests
-   Available Drivers
-   Surge Multiplier

#### Surge Analytics

Display live surge logs and allow administrators to reset surge
parameters.

------------------------------------------------------------------------

### 3. Page 3: `driver-dispatch.html` (Driver Telemetry)

#### Driver Discovery

Retrieve nearby drivers dynamically from the backend.

#### Driver Matching

Implement backend ride-to-driver assignment.

#### Notifications

Display real-time driver notifications and dispatch logs.

#### System Metrics

Display live ride count and demand factor.

## Submission Guidelines

Participants must submit their finalized solutions through the provided
Google Form.

Your submission must contain:

-   **GitHub Repository Link:** Full repository containing the backend
    integrated with the provided frontend.
-   **UI Screenshots with Real Backend Data:** High-resolution
    screenshots of all three pages populated with dynamic backend data.

> **⚠️ CRITICAL NOTE ON SPEED:** The Google Form automatically captures
> your exact submission timestamp. This timestamp is the final authority
> used to measure your completion speed.

## Evaluation Criteria (Strict Point-Wise System)

### 1. Completeness & Perfection (100% Core Functionality)

-   All forms across all three pages must communicate successfully with
    the backend.
-   All tables, cards, metrics, logs, analytics, and tracking components
    must display real backend data.
-   Ride booking, fare prediction, surge pricing, driver dispatch, and
    tracking should function correctly.

### 2. Dynamic Integration Accuracy

-   Preserve the provided HTML structure, CSS styling, and layout.
-   Frontend actions must map correctly to backend APIs.
-   Real-time updates should accurately reflect backend state.

### 3. Architectural Freedom

-   You may choose any backend technology.
-   Code should be clean, modular, maintainable, and free from
    processing crashes.

### 4. Speed of Submission (The Ultimate Tie-Breaker)

-   Complete all three pages within the **3-hour** time limit.
-   Submit your GitHub repository and screenshots through the provided
    Google Form.
-   Only fully working submissions will be evaluated.
-   Among flawless submissions, ranking is determined entirely by
    submission speed.
-   The **Top 10** fastest participants will qualify for **Round 2**.
-   Round 2 will contain a completely new UI2API challenge.
-   The **Top 3** participants from Round 2 will be declared winners.
