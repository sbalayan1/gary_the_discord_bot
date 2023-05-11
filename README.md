## About
Gary is a discord chatbot by Sean Balayan that integrates ChatGPT. It dynamically reads command files from a specified directory, sets up event listeners for command interactions, and executes the corresponding commands based on user interactions.

## Slash Commands
    /askgpt (query) => 'replies with a response from Chat GPT!'
    /ping => 'replies with pong!'
    /server => 'provides information about the server.'
    /user => 'provides information about the user'

## What am I currently working on?
- Responses from chatGPT are shortened for some odd reason. Working to fix

## To Do
- How to manage usage of the bot?
- Should not be able to send commands unless the bot is online
- Command List
    - /askGPT (searchTerm) -> takes a question/direction/input as an argument and returns a response from ChatGPT
    - /askgpt (chat/completion/image) -> user can select which type of chat gpt model they want to interact with whether it's with text completion/embedding/etc
    - /gif (searchTerm) -> takes a search value as an argument and returns a random gif
    - /clear -> clears discord chat
    - /kick (member) -> kicks a member from the discord chat


## Other Issues
- interesting problem I experienced. 
    -> created an interaction while guide bot was off. 
    -> once i turned bot back on, I was able to make an interaction but the server crashed because the previous command was still queued?