## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Projects Decisions

The app has Bootstrap and Angular Material in it but the style is pretty basic, the focus is on its functionality.
Also, prettier and eslint are not configured.

## Questions

# 1.

The use of tokens can be safe but there are a couple of things we need to be aware of. For example, it's extremely necessary to define an expiration because if you don't, anyone with the token can gain access to the API.
Also, when it comes to how to store the token in the client app, we can't keep it in localStorage or sessionStorage because it's not safe.
Overall it can be safe to use JWT if all the precautions are in place.

# 2.

+ Cross-Site Scripting (XSS): Attackers could inject malicious JavaScript into messages. If executed, this can steal user data or perform unauthorized actions as if it were the user.
Mitigation: Use a library to sanitize HTML input to strip out any malicious scripts or tags, allowing only safe elements and attributes.

+ Phishing Links: Attackers might embed deceptive links (fake login pages) disguised as legitimate ones. If clicked, these can steal user credentials or sensitive information.
Mitigation: Check and sanitize URLs within messages.

# 3.

Mutable objects can be changed after they’re created (arrays or objects in JavaScript) and Immutable objects cannot be modified once created, any "change" results in a new object. For example, the type string is immutable. If you modify a string, JavaScript creates a new one instead of changing the original.

Pros of Immutability:

+ Predictability: No unexpected changes, which helps prevent (a lot of) bugs.
+ Easier Debugging: State remains consistent, so you can trace data changes more easily.

Cons of Immutability:

+ Memory Usage: New objects are created for each change, which can use more memory.
+ Performance: Constantly creating new objects might be slower in performance-critical applications.

In libraries like Redux, avoid mutating state directly; instead, use functions like map, filter or spread operators ({...obj}) to create copies.

# 4.

To speed up a web application, I'd focus on these key steps:

+ Compress images (use formats like WebP) and minify CSS/JS files.
+ Use lazy loading for images and videos to load only when visible.
+ Remove unused code, split large bundles, and use tree-shaking.
+ Defer non-critical scripts or load them asynchronously.
+ Limit and batch API requests to reduce the number of calls.
