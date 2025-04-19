# Web Development Project 7 - _Crewmate Creator_

Submitted by: **Quynh Giang Ho**

This web app: **A platform that allows you to create your own crewmate in the settings of the famous Amongus game! Choose your crewmate's name, role, specialty, color, power level, and personality, then see their profile saved in our gallery. What are you waiting for? Try it now!**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app contains a page that features a create form to add a new crewmate**
  - Users can name the crewmate
  - Users can set the crewmate’s attributes by clicking on one of several values
- [x] **The web app includes a summary page of all the user’s added crewmatese**
  - The web app contains a summary page dedicated to displaying all the crewmates the user has made so far
  - The summary page is sorted by creation date such that the most recently created crewmates appear at the top
- [x] **A previously created crewmate can be updated from the list of crewmates in the summary page**
  - Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - Users can see the current attributes of their crewmate on the update form
  - After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page
- [x] **A previously created crewmate can be deleted from the crewmate list**
  - Using the edit form detailed in the previous _crewmates can be updated_ feature, there is a button that allows users to delete that crewmate
  - After deleting a crewmate, the crewmate should no longer be visible in the summary page
  - [x] **Each crewmate has a direct, unique URL link to an info page about them**
    - Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
    - The detail page contains extra information about the crewmate not included in the summary page
    - Users can navigate to to the edit form from the detail page

The following **optional** features are implemented:

- [x] A crewmate can be given a category upon creation which restricts their attribute value options
  - e.g., a Dungeons and Dragons class or a development team role (project manager, product owner, etc.)
  - User can choose a `category` option to describe their crewmate before any attributes are specified
  - Based on the category value, users are allowed to access only a subset of the possible attributes
- [x] A section of the summary page, displays summary statistics about a user’s crew on their crew page
  - e.g., the percent of members with a certain attribute
- [x] The summary page displays a custom “success” metric about a user’s crew which changes the look of the crewmate list
  - e.g., a pirate crew’s predicted success at commandeering a new galley

The following **additional** features are implemented:

- [x] Color picker functionality
- [x] Responsive design

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='./src/assets/demo.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with [Screen Recorder](https://chromewebstore.google.com/detail/screen-recorder/hniebljpgcogalllopnjokppmgbhaden?hl=en) and [CloudConvert](https://cloudconvert.com/webm-to-gif)

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Challenges while creating the app:

- Getting used to using Supabase
- Learning to structure a website well with the help of multiple sources including ChatGPT and AI agents, with Header, Footer, etc.
- Learning to implement color picker functionality
- Learning to write cleaner code
- Implementing dynamic attribute options (Which took a long while)
- Creating the success metric calculation (More details enclosed below)
- Building the responsive design

## Success Metric Calculation

The Crewmate Creator app includes a dynamic success rating system that evaluates your crew's effectiveness based on its composition:

### Point System

- **Base Points**: Each crewmate contributes 1 point just for being present
- **Attribute Completeness**:
  - Having a defined role: +1 point
  - Having a defined specialty: +1 point
- **Power Level**:
  - High power: +2 points
  - Medium power: +1 point
- **Category-Specific Bonuses**:
  - Pirate Crew captains: +2 points
  - Plundering specialty (Pirate Crews): +1 point
  - Developers (Development Teams): +1 point
  - Product Owners (Development Teams): +1 point

### Rating Calculation

The final score is converted to a percentage of the maximum possible score (5 points per crewmate). This determines the crew's rating:

- **90-100%**: "Legendary" (green progress bar)
- **75-89%**: "Exceptional" (light green bar)
- **60-74%**: "Promising" (yellow bar)
- **40-59%**: "Average" (orange bar)
- **Below 40%**: "Struggling" (red bar)

This visual feedback helps users understand how effective their crew composition is and encourages creation of balanced teams with complementary attributes.

## License

    Copyright 2025 Quynh Giang Ho (Shepe1304)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
