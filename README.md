# Gary Discord Chatbot

Gary is a Discord chatbot created by Sean Balayan that integrates ChatGPT. It provides dynamic command handling, event listeners for command interactions, and execution of various commands based on user interactions.

## Slash Commands

Gary supports the following slash commands:

### /askgpt (query)

Replies with a response from ChatGPT based on the provided query.

### /ping

Replies with "pong!" to check if the bot is responsive.

### /server

Provides information about the Discord server.

### /user

Provides information about the user.

## Current Development Focus

**FIXED** We are currently working on resolving an issue where responses from ChatGPT are shortened unexpectedly. We aim to fix this issue to ensure accurate and complete responses.

**FIXED** Currently working to fix an issue with response times. Currently receiving the following response:
<ul>
    DiscordAPIError[10062]: Unknown interaction
    <li>May 16 02:14:47 PM    rawError: { message: 'Unknown interaction', code: 10062 },</li>
    <li>May 16 02:14:47 PM    code: 10062,</li>
    <li>May 16 02:14:47 PM    status: 404,</li>
    <li>May 16 02:14:47 PM    method: 'POST',</li>
</ul>

**SOLUTION** Discord has a 3 second window to acknowledge a successful interaction. If no response within the 3 seconds, Discord fails the interaction and invalidates the token. used a deferred response to solve. Key here is running the deferred reply method right when the execute fires. this way you don't potentially hit the 3 second mark if the deferred reply gets bogged down by other code.

## To-Do List

- Improve response handling from ChatGPT to avoid unexpected truncation.
- Implement a usage management system to restrict askgpt command usage.

## Potential/Future Features

<!-- - **/askGPT (searchTerm):** Takes a question, instruction, or input as an argument and returns a response from ChatGPT. -->
- **/askgpt (chat/completion/image):** Allows users to select the type of ChatGPT model they want to interact with, such as text completion or image embedding.
- **/gif (searchTerm):** Takes a search term as an argument and returns a random GIF.
- **/clear:** Clears the Discord chat messages.
- **/kick (member):** Kicks a member from the Discord chat.

## Other Issues

During development, an interesting problem was encountered. If an interaction was initiated while the guide bot was offline and then the bot was turned back on, the queued command from the previous interaction caused the server to crash. We are actively working to address this issue and ensure smooth operation even in such scenarios.
