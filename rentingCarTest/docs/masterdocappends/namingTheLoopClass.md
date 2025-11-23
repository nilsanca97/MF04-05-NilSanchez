# Naming alternatives for `org.example.MainLoop`

If the class owns the app’s main interactive loop (e.g., CLI/menu) with a `start()` method, consider names that reflect role and scope.

Summary: Proposed concise, role-focused alternatives and selection guidance based on whether the class runs startup, drives a CLI/menu loop, or orchestrates services.

- __High-level app runner__
  
  - `ApplicationRunner`
  - `AppRunner`
  - `Bootstrap`
  - `Runner`

- __Console/CLI interaction__
  
  - `ConsoleApp`
  - `CliApp`
  - `CliRunner`
  - `ConsoleLoop`
  - `InteractiveLoop`
  - `MainMenu`
  - `MenuController`
  - `CommandProcessor`
  - `Repl` (if it reads–evals–prints repeatedly)
  - `Shell`

- __Flow orchestration__
  
  - `Orchestrator`
  - `Coordinator`
  - `Dispatcher`
  - `Controller` (if it routes to services/managers)

- __Domain-specific (fits renting cars)__
  
  - `RentalCli`
  - `RentalConsoleApp`
  - `RentalAppRunner`
  - `RentalMenu`
  - `RentalController`

# How to choose

- __Owns the program lifecycle/startup__: prefer `ApplicationRunner`/`AppRunner`/`Bootstrap`.
- __Primarily a CLI/menu loop__: prefer `ConsoleApp`, `CliRunner`, `MenuController`, or `CommandProcessor`.
- __Primarily routing calls to `CarManager`/`DataStore`__: prefer `Controller`, `Orchestrator`, or domain-specific `RentalController`.
- __If `App.java` already boots__: avoid “App” duplication; use `CliRunner`/`MenuController`.
