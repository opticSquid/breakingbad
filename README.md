# Breaking Bad App

## Works on consuming Breaking Bad API created by: [@timbiles](Tim Biles)

Features:

- Caching API responses to speed up the app
- Ability to search for a character by name
- Ability to search for **Breaking Bad** or **Better Call Saul** Series Characters Catagorically
- Ability to see the quotes of all the characters seperately.
- Good User Accessbile UI follows Material Design Guidelines
- Optimized Code Design for performance. Priority has been given to keep bundle size minimum by reusuing existing components whereever possible
- Uses Redis Cache to store API responses which gives a snappy experience.

## Design Goals

### 1. First Page

[x] Listing of all the breaking bad characters on home page - List of all characters.

[x] Each item in the list has

- Name
- Occupation
- DOB
- Status of character

[x] Each item in this list is a clickable link that directs to the second page. (See point 2) - List have pagination, a page has a maximum of 10 characters.

[x] One is able to apply filter on the list based on to Category of character. (Breaking Bad or/and Better Call Saul)

[x] One is able to search the name of any character in the list.

### 2. Second Page

A second page which shows more details about the character that user clicked on home page. Details that includes:

- Name and Image of the character
- Date of Birth
- Occupation.
- Status (Dead or Alive)
- Nickname (if any)
- Actor who portrays the character.
- Season in which the character has appeared.
- All quotes by the character

### Points to be noted

1. If website URL is like *www.example.com* then by going to *www.example.com/`character_id`* takes directly to that characters page.

2. Website is responsive
