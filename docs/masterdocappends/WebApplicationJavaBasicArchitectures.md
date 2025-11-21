# Web Application Java Basic Architectures

We're touching on one of the most important **architectural decision points** in modern Spring Boot applications: how to design a web applications with all the different apporaches, tools and framewords from the Java ecosystem.  

> All the relevant annotations, framewors and approaches  (@RestController, Thymeleaf, Vaadin + @BrowserCallable, Hilla @Endpoint, SSE with SseEmitter, WebSocket @MessageMapping, etc.) are **different delivery architectures** (or interaction styles) that solve the same core problem in fundamentally different ways.

Here’s how to classify them properly in the context of Spring Boot systems:

| Delivery Mechanism                   | Architectural Style                      | Client Type                   | Rendering Responsibility                              | Real-time Push?                          | Key Spring/Vaadin Tech                      |
| ------------------------------------ | ---------------------------------------- | ----------------------------- | ----------------------------------------------------- | ---------------------------------------- | ------------------------------------------- |
| Classic MVC with Thymeleaf           | Server-Side Rendering (SSR)              | Traditional HTML browser      | Server (Thymeleaf templates)                          | No                                       | @Controller + Thymeleaf                     |
| @RestController + React/Angular      | Backend-for-Frontend (BFF) / SPA         | Rich JavaScript frontend      | Client (React/Vue/etc.)                               | Via polling/Long-polling                 | @RestController + Jackson                   |
| Thymeleaf + htmx                     | Hypermedia-Driven SSR                    | HTML browser with htmx        | Server (Thymeleaf fragments) + client-side HTML swaps | Partial (via polling, WS/SSE extensions) | @Controller + Thymeleaf + htmx              |
| Vaadin Flow (pure Java views)        | Server-Side UI with push                 | Vaadin-managed DOM            | Server (Java components → DOM)                        | Yes (WebSocket/SSE)                      | @Route, Push, UI.init()                     |
| Hilla (@Endpoint + TypeScript views) | Type-safe Full-Stack Reactive            | Lite frontend (React + TS)    | Client + Server collaboration                         | Yes (automatic via SSE/WebSocket)        | @Endpoint, @BrowserCallable, Hilla          |
| SSE with SseEmitter                  | Server-Sent Events (unidirectional)      | Any (Vaadin, React, plain JS) | Client updates UI on event                            | Yes (server → client only)               | SseEmitter, @GetMapping → text/event-stream |
| WebSocket (Spring or Atmosphere)     | Bidirectional real-time                  | Any                           | Client                                                | Yes (both ways)                          | @MessageMapping, STOMP                      |
| @BrowserCallable (Hilla)             | Secure server method call from client TS | TypeScript client             | Server executes logic                                 | Sync call                                | @BrowserCallable in @Endpoint               |

### So what are we really choosing between?

We are choosing the **system-design interaction architecture** that best matches:

1. **Who owns the UI state?**  
   
   - Server (Vaadin Flow, Thymeleaf) → simpler, less JS  
   - Client (pure React + REST, Hilla) → richer animations, offline possible

2. **How real-time does the app need to be?**  
   
   - Page reload acceptable → Thymeleaf  
   - Instant updates → Push / SSE / WebSocket (Vaadin or Hilla)

3. **Team skills & code sharing**  
   
   - Java-only team → Vaadin Flow  
   - Full-stack TypeScript team → Hilla or pure React + REST

4. **Mobile strategy**  
   
   - Same codebase for desktop + mobile → Hilla (type-safe endpoints + React views)  
   - Pure Java desktop + native-like mobile → Vaadin Flow desktop + Capacitor/React mobile with Hilla endpoints

### Summary – What are we talking about?

We are not just picking “variants” or random annotations.

You are making **high-level system-design and architecture decisions** about:

- Server-side vs client-side rendering
- Monolithic full-stack Java vs type-safe full-stack TypeScript
- Push model vs pull model
- Real-time capabilities
- Development velocity and team skills
- Future mobile/web strategy

In short: **these are different application architectures inside the same Spring Boot umbrella**, and systems often mix the best ones:

- Vaadin Flow for heavy-lifting Java desktop experiences
- Hilla for modern, type-safe, mobile-first TypeScript worlds

That’s why we see @RestController in some places — but Hilla @Endpoint + @BrowserCallable can replace it where we need type safety and React, while Vaadin Flow replaces traditional MVC where we want pure Java UI with push.

It’s a deliberate **multi-architecture design** that gives us the best of all worlds for web applications.
