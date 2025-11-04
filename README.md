# 🌐 VPC — Remote Application (Networking)

The **VPC** microfrontend is part of the **Networking** application group.  
It is built with [React](https://react.dev/) and [Rsbuild](https://modernjs.dev/rsbuild) using [Module Federation](https://module-federation.io/).

This module integrates into the **Chrome Host application** and provides UI and functionality for managing Virtual Private Cloud (VPC) networks, routes, and VM network interfaces.

---

## 🚀 Overview

The **VPC App** provides user-facing functionality for managing VPC networks, routing configuration, and VM network interface assignments.  
It consumes shared components, hooks, and utilities exposed by the **Chrome Host Application**.

### 🔧 Features
- 🌐 **VPC Network Management** — create, view, edit, and delete VPC networks
- 📡 **Subnet Configuration** — configure CIDR blocks, DNS servers, gateways, and IP version for networks
- 🛣️ **Route Management** — create, edit, and delete routing rules with destination and next-hop configuration
- 🔌 **VM Network Interface Management** — assign and remove VM network interfaces (NICs) to/from networks
- 📊 **Network Details** — view comprehensive network information including assigned VMs, subnets, and configuration
- 🔍 **Search & Filtering** — search networks and routes by keyword
- 🔗 **Shared UI and logic** imported from the Host app
- 🧩 **Microfrontend integration** using Module Federation

---

## 🧱 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [React 18+](https://react.dev/) |
| Bundler | [Rsbuild](https://modernjs.dev/rsbuild) |
| Microfrontends | [Module Federation](https://module-federation.io/) |
| UI Library | [shadcn/ui](https://ui.shadcn.com/) *(imported from Host)* |
| Forms | [react-hook-form](https://react-hook-form.com/) *(via Host hooks)* |
| Validation | [Zod](https://zod.dev/) *(via Host hooks)* |
| Data Fetching | [TanStack Query](https://tanstack.com/query/latest) *(via Host hooks)* |
| Global State | [Redux](https://redux.js.org/) *(via Host store)* |

---

## ⚠️ Important Note

> **This remote application cannot run independently.**  
> It must always be loaded and executed within the **Chrome Host application** context.  
> The Host provides authentication, global routing, shared UI components, and state management — all of which are required for VPC to function properly.

---

## ⚙️ Installation & Local Development

### 1. Clone the repository

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Before starting the app, you need to create a local environment file.
Copy the example file:

```bash
cp .env.example .env.local
```
Open .env.local and provide valid values for all keys (API endpoints, etc.).

### 4. Start the development server
```bash
npm run dev
```

The app will be available at:
http://localhost:8020
