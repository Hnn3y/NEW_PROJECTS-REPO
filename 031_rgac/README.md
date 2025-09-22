# ROYAL GEM AUTOCARE CUSTOMER REMINDER SYSTEM

## A lightweight customer reminder service built with Node.js (ESM) and Express. The service allows businesses to schedule and send reminders (e.g., appointment notifications, service updates, etc.) to customers.

--- 

## Features  
- Built with **ESM** (`"type": "module"`)  
- **Express.js** server for REST API endpoints  
- Reminder scheduling system  
- Modular notification channels (**SMS**, **Email**, **WhatsApp-ready**)  
- Easy integration with external APIs (Twilio, SendGrid, Nodemailer)  
- Extendable architecture for production 

### Tech Stack
- Node.js (ESM mode)
- Express.js
- Nodemailer / Twilio / SendGrid (depending on notification method)
- Cron Jobs / Node-Scheduler for scheduling

```mermaid
flowchart TD
    A["Company Google Sheet<br/>Master Data"] --> B["Scheduler\n(node-cron)"]
    B --> C["Reminder Logic\n(Node.js)"]

    C -->|Has Email + Phone| D["Send Email via Nodemailer"]
    C -->|Has Email + Phone| E["Send SMS via Twilio"]
    
    C -->|Only Email| D
    C -->|Only Phone| E
    C -->|No Contact| F["Log Error / Skip"]

    D --> G["Customer Receives Email"]
    E --> H["Customer Receives SMS"]

    G --> I["Delivery Logs"]
    H --> I
    F --> I


```