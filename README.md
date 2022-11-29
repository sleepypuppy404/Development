# Development

### Link to Deployed Website
If you used the stencil code, this is `https://<your GitHub username>.github.io/<name of your repository>`

### Goal and Value of the Application
The goal is to make planning puppy adoption easier on users. When I first adopted my dog, I had plenty of questions about the exact information on the dog. Would they be a good
family dog, or a good guard dog, and how much work would they take. As my family began discussing more dog adoption, it made me think of how the informational dynamic would change,
and led me to create this "Puppy Family" site that would allow for planning.

### Usability Principles Considered
I wanted to go with an extremely minimalistic site for this. Since the site itself is fairly simple, I stuck to a minimalistic, efficient design. The filter/sort categories are
explained next to the filter/sort, and the sliding scale in my opinion allows for more effective selection of a bound. The immediate "family" window on the right hand side is further meant to 
bring the user in easily, and to provide immediate feedback so that a user can easily learn how to use the site and recognize what exactly is going on. In short, I considered ease of learnability,
efficency in usage, and of course, design simplicity when constructing this site.

### Organization of Components

There unfortunately isn't much to say about this site since most of it is handled through high-level filters and sorting. However, I did create a "PuppyItem" component that represents a single "square"
of dog information. Here, a JSON object is passed into this component, and HTML is returned that contains the dog's information and image. That component is then used to create a standardized
"block" of information that is displayed on the left hand side.

### How Data is Passed Down Through Components

Essentially, a single JSON "prop" is passed into the components, which is derived from a .json I created of dog based information accumulated from the internet.

### How the User Triggers State Changes

The user triggers a state change whenever they modify the filter/sort selected (Which changes the filtering methodology).
In addition, adding/removing a pet from the "Family" causes a state change in a list that tracks the quantity of pets, from which all other information is derived.


